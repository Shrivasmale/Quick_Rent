// supabase/functions/_shared/supabaseClients.ts
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

/**
 * Creates an RLS-scoped user client by forwarding the caller's Authorization Bearer token.
 * Enforces PostgreSQL Row-Level Security for that specific auth.uid().
 */
export function createUserClient(req: Request): SupabaseClient {
  const authHeader = req.headers.get("Authorization") ?? "";
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}

/**
 * Creates a privileged service_role client.
 * Strictly reserved for verified webhooks, system workers, or audit table writing.
 */
export function createServiceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}
