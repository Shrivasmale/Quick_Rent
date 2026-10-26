// supabase/functions/rental-service/index.ts
import { withProductionMiddleware, RequestContext } from "../_shared/middlewarePipeline.ts";
import { createUserClient } from "../_shared/supabaseClients.ts";

async function handler(req: Request, ctx: RequestContext): Promise<Response> {
  const userClient = createUserClient(req);

  // POST: Create a rental booking hold with exclusion lock
  if (req.method === "POST") {
    const body = await req.json();
    const { item_id, start_date, end_date, renter_name, renter_phone, renter_email, message } = body;

    if (!item_id || !start_date || !end_date) {
      return new Response(JSON.stringify({ error: "Missing item_id, start_date, or end_date" }), { status: 400 });
    }

    // Call atomic PostgreSQL RPC
    const { data, error } = await userClient.rpc("create_rental_hold", {
      p_item_id: item_id,
      p_start_date: start_date,
      p_end_date: end_date,
      p_renter_name: renter_name || ctx.user?.email || "Renter",
      p_renter_phone: renter_phone || "",
      p_renter_email: renter_email || ctx.user?.email || "",
      p_message: message || "",
    });

    if (error) {
      // Catch btree_gist exclusion violation (overlapping rental dates)
      if (error.code === "23P01" || error.message.includes("exclusion")) {
        return new Response(
          JSON.stringify({
            error: "Conflict",
            message: "Item is already booked for these selected dates. Please select other dates.",
          }),
          { status: 409 }
        );
      }
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, hold: data }), { status: 201 });
  }

  // GET: Fetch user's active contracts
  if (req.method === "GET") {
    const { data, error } = await userClient
      .schema("rentals")
      .from("contracts")
      .select("*, item:items(*)")
      .order("created_at", { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
}

Deno.serve(withProductionMiddleware({ requireAuth: true, requireIdempotency: true, rateLimitPerMinute: 20 }, handler));
