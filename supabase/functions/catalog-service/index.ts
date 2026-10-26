// supabase/functions/catalog-service/index.ts
import { withProductionMiddleware, RequestContext } from "../_shared/middlewarePipeline.ts";
import { createUserClient } from "../_shared/supabaseClients.ts";

async function handler(req: Request, ctx: RequestContext): Promise<Response> {
  const userClient = createUserClient(req);

  // Moderate and insert new catalog item
  if (req.method === "POST") {
    const body = await req.json();
    const { title, description, category, daily_rate_paise, security_deposit_paise, city, condition, image_url, images } = body;

    if (!title || !category || !daily_rate_paise || daily_rate_paise <= 0) {
      return new Response(JSON.stringify({ error: "Missing required fields or invalid daily rate" }), { status: 400 });
    }

    const { data, error } = await userClient
      .from("items")
      .insert({
        owner_id: ctx.user!.id,
        title: title.trim(),
        description: description || "",
        category,
        daily_rate_paise: Math.round(Number(daily_rate_paise)),
        security_deposit_paise: Math.round(Number(security_deposit_paise || 0)),
        city: city || "Pune",
        condition: condition || "Good",
        image_url: image_url || null,
        images: images || [],
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, item: data }), { status: 201 });
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
}

Deno.serve(withProductionMiddleware({ requireAuth: true, requireIdempotency: true, rateLimitPerMinute: 30 }, handler));
