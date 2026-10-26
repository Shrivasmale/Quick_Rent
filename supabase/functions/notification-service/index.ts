// supabase/functions/notification-service/index.ts
import { withProductionMiddleware, RequestContext } from "../_shared/middlewarePipeline.ts";
import { createServiceClient } from "../_shared/supabaseClients.ts";

async function handler(req: Request, ctx: RequestContext): Promise<Response> {
  const url = new URL(req.url);
  const adminClient = createServiceClient();

  // Generate or retrieve PDF receipt signed URL
  if (req.method === "POST" && url.pathname.endsWith("/generate-receipt")) {
    const { rental_id } = await req.json();

    if (!rental_id) {
      return new Response(JSON.stringify({ error: "Missing rental_id" }), { status: 400 });
    }

    const { data: contract, error } = await adminClient
      .schema("rentals")
      .from("contracts")
      .select("*, item:items(title, daily_rate_paise)")
      .eq("id", rental_id)
      .single();

    if (error || !contract) {
      return new Response(JSON.stringify({ error: "Rental contract not found" }), { status: 404 });
    }

    const filePath = `${contract.renter_id}/receipt_${contract.id}.pdf`;

    // Ensure mock PDF exists in storage or create placeholder
    const mockPdfBytes = new TextEncoder().encode(`%PDF-1.4 QuickRent Receipt: ${contract.id}`);
    await adminClient.storage
      .from("rental-receipts")
      .upload(filePath, mockPdfBytes, { contentType: "application/pdf", upsert: true });

    // Generate 60-second temporary signed URL
    const { data: signedData, error: signError } = await adminClient.storage
      .from("rental-receipts")
      .createSignedUrl(filePath, 60, {
        download: `QuickRent-Receipt-${contract.id.slice(0, 8)}.pdf`,
      });

    if (signError) {
      return new Response(JSON.stringify({ error: signError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, signedUrl: signedData.signedUrl }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
}

Deno.serve(withProductionMiddleware({ requireAuth: true, rateLimitPerMinute: 30 }, handler));
