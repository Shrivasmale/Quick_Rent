// supabase/functions/user-service/index.ts
import { withProductionMiddleware, RequestContext } from "../_shared/middlewarePipeline.ts";
import { createUserClient } from "../_shared/supabaseClients.ts";

async function handler(req: Request, ctx: RequestContext): Promise<Response> {
  const userClient = createUserClient(req);
  const url = new URL(req.url);

  // Switch role: renter <-> lister
  if (req.method === "POST" && url.pathname.endsWith("/switch-role")) {
    const { role } = await req.json();
    if (!["renter", "lister"].includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid role. Must be 'renter' or 'lister'" }), { status: 400 });
    }

    const { data, error } = await userClient
      .from("profiles")
      .update({ role, updated_at: new Date().toISOString() })
      .eq("id", ctx.user!.id)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, profile: data }), { status: 200 });
  }

  // Get current user profile
  if (req.method === "GET") {
    const { data, error } = await userClient
      .from("profiles")
      .select("*")
      .eq("id", ctx.user!.id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 404 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
}

Deno.serve(withProductionMiddleware({ requireAuth: true, rateLimitPerMinute: 60 }, handler));
