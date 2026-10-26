// supabase/functions/_shared/middlewarePipeline.ts
import { createServiceClient, createUserClient } from "./supabaseClients.ts";
import { getCorsHeaders } from "./corsMiddleware.ts";
import { logAuditEvent } from "./auditLogger.ts";

export interface RequestContext {
  correlationId: string;
  clientIp: string;
  user?: { id: string; email?: string; role?: string };
  rawBody?: string;
}

export type EdgeHandler = (req: Request, ctx: RequestContext) => Promise<Response>;

export function getSecurityHeaders(origin: string | null, correlationId: string): HeadersInit {
  return {
    ...getCorsHeaders(origin),
    "X-Correlation-ID": correlationId,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Content-Type": "application/json",
  };
}

export function withProductionMiddleware(
  options: {
    requireAuth: boolean;
    requireIdempotency?: boolean;
    rateLimitPerMinute?: number;
  },
  handler: EdgeHandler
) {
  return async (req: Request): Promise<Response> => {
    const startTime = performance.now();
    const origin = req.headers.get("Origin");
    const correlationId = req.headers.get("X-Correlation-ID") ?? crypto.randomUUID();
    const headers = getSecurityHeaders(origin, correlationId);

    // 1. Handle CORS Preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
    const ctx: RequestContext = { correlationId, clientIp };
    const adminClient = createServiceClient();

    try {
      // 2. Verify JWT Authentication via Supabase Auth
      if (options.requireAuth) {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return new Response(
            JSON.stringify({ error: "Unauthorized", message: "Missing Bearer token", correlationId }),
            { status: 401, headers }
          );
        }
        const userClient = createUserClient(req);
        const { data: { user }, error: authError } = await userClient.auth.getUser();
        if (authError || !user) {
          return new Response(
            JSON.stringify({ error: "Unauthorized", message: "Invalid or expired JWT", correlationId }),
            { status: 401, headers }
          );
        }
        ctx.user = {
          id: user.id,
          email: user.email,
          role: user.app_metadata?.role ?? "user",
        };
      }

      // 3. Sliding-Window Rate Limiting (via PostgreSQL RPC `check_rate_limit`)
      if (options.rateLimitPerMinute) {
        const rateKey = `${ctx.user?.id ?? clientIp}:${new URL(req.url).pathname}`;
        const { data: allowed, error: rlError } = await adminClient.rpc("check_rate_limit", {
          p_rate_key: rateKey,
          p_max_requests: options.rateLimitPerMinute,
          p_window_seconds: 60,
        });
        if (!rlError && allowed === false) {
          return new Response(
            JSON.stringify({ error: "TooManyRequests", message: "Rate limit exceeded. Try again shortly.", correlationId }),
            { status: 429, headers: { ...headers, "Retry-After": "60" } }
          );
        }
      }

      // 4. Idempotency-Key Enforcement for State-Mutating Requests (Rentals & Payments)
      if (options.requireIdempotency && ["POST", "PATCH"].includes(req.method)) {
        const idemKey = req.headers.get("Idempotency-Key");
        if (!idemKey || idemKey.length > 128) {
          return new Response(
            JSON.stringify({ error: "BadRequest", message: "Missing or invalid Idempotency-Key header", correlationId }),
            { status: 400, headers }
          );
        }
        ctx.rawBody = await req.text();
        const bodyHashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ctx.rawBody));
        const bodyHash = Array.from(new Uint8Array(bodyHashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");

        const { data: existingKey } = await adminClient
          .schema("audit")
          .from("idempotency_keys")
          .select("status, response_code, response_body, payload_hash")
          .eq("user_id", ctx.user?.id ?? "anon")
          .eq("idempotency_key", idemKey)
          .maybeSingle();

        if (existingKey) {
          if (existingKey.payload_hash !== bodyHash) {
            return new Response(
              JSON.stringify({ error: "UnprocessableEntity", message: "Idempotency-Key reused with different payload" }),
              { status: 422, headers }
            );
          }
          if (existingKey.status === "IN_FLIGHT") {
            return new Response(
              JSON.stringify({ error: "Conflict", message: "Request with this Idempotency-Key is already in progress" }),
              { status: 409, headers }
            );
          }
          return new Response(JSON.stringify(existingKey.response_body), {
            status: existingKey.response_code,
            headers: { ...headers, "X-Idempotency-Replayed": "true" },
          });
        }

        // Acquire atomic lock in `audit.idempotency_keys`
        const { error: lockErr } = await adminClient.schema("audit").from("idempotency_keys").insert({
          user_id: ctx.user?.id ?? "anon",
          idempotency_key: idemKey,
          payload_hash: bodyHash,
          status: "IN_FLIGHT",
        });

        if (lockErr) {
          return new Response(
            JSON.stringify({ error: "Conflict", message: "Concurrent duplicate request blocked" }),
            { status: 409, headers }
          );
        }

        const response = await handler(req, ctx);
        const clonedBody = await response.clone().json().catch(() => ({}));

        if (response.status >= 200 && response.status < 500) {
          await adminClient
            .schema("audit")
            .from("idempotency_keys")
            .update({
              status: "COMPLETED",
              response_code: response.status,
              response_body: clonedBody,
            })
            .eq("user_id", ctx.user?.id ?? "anon")
            .eq("idempotency_key", idemKey);
        } else {
          await adminClient
            .schema("audit")
            .from("idempotency_keys")
            .delete()
            .eq("user_id", ctx.user?.id ?? "anon")
            .eq("idempotency_key", idemKey);
        }

        return new Response(JSON.stringify(clonedBody), { status: response.status, headers });
      }

      // 5. Execute Microservice Handler
      const response = await handler(req, ctx);
      const durationMs = Math.round(performance.now() - startTime);

      // 6. Emit Structured Audit Log
      await logAuditEvent({
        actorId: ctx.user?.id ?? "anonymous",
        eventType: `${req.method}_${new URL(req.url).pathname}`,
        correlationId,
        clientIp,
        details: { status: response.status, durationMs },
      });

      const responseBody = await response.text();
      return new Response(responseBody, { status: response.status, headers });
    } catch (err) {
      console.error(JSON.stringify({ level: "ERROR", correlationId, error: String(err) }));
      return new Response(
        JSON.stringify({ error: "InternalServerError", message: "An unexpected error occurred.", correlationId }),
        { status: 500, headers }
      );
    }
  };
}
