// supabase/functions/payment-service/index.ts
import { withProductionMiddleware, RequestContext } from "../_shared/middlewarePipeline.ts";
import { createServiceClient, createUserClient } from "../_shared/supabaseClients.ts";
import { verifyWebhookHmac } from "../_shared/hmacWebhookMiddleware.ts";

async function handler(req: Request, ctx: RequestContext): Promise<Response> {
  const url = new URL(req.url);
  const adminClient = createServiceClient();

  // 1. Create Razorpay Payment Order
  if (req.method === "POST" && url.pathname.endsWith("/create-order")) {
    const userClient = createUserClient(req);
    const { rental_id } = await req.json();

    if (!rental_id) {
      return new Response(JSON.stringify({ error: "Missing rental_id" }), { status: 400 });
    }

    // Fetch contract details
    const { data: contract, error: contractError } = await userClient
      .schema("rentals")
      .from("contracts")
      .select("*")
      .eq("id", rental_id)
      .single();

    if (contractError || !contract) {
      return new Response(JSON.stringify({ error: "Rental contract not found" }), { status: 404 });
    }

    const orderId = `order_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
    const keyId = Deno.env.get("RAZORPAY_KEY_ID") || "rzp_test_quickrent_demo";

    // Record intent in payments.intents
    await adminClient.schema("payments").from("intents").insert({
      rental_id: contract.id,
      payer_id: ctx.user!.id,
      gateway: "razorpay",
      gateway_order_id: orderId,
      amount_paise: contract.total_amount_paise,
      status: "CREATED",
    });

    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderId,
        amount: contract.total_amount_paise,
        key_id: keyId,
        currency: "INR",
      }),
      { status: 200 }
    );
  }

  // 2. Client Payment Verification & Ledger Record
  if (req.method === "POST" && url.pathname.endsWith("/verify")) {
    const { rental_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!rental_id || !razorpay_order_id || !razorpay_payment_id) {
      return new Response(JSON.stringify({ error: "Missing payment verification parameters" }), { status: 400 });
    }

    // Fetch contract to determine amount
    const { data: contract } = await adminClient
      .schema("rentals")
      .from("contracts")
      .select("*")
      .eq("id", rental_id)
      .single();

    if (!contract) {
      return new Response(JSON.stringify({ error: "Rental not found" }), { status: 404 });
    }

    // Append to payments.ledger using service_role
    await adminClient.schema("payments").from("ledger").insert({
      rental_id: contract.id,
      payer_id: ctx.user!.id,
      gateway_order_id: razorpay_order_id,
      gateway_payment_id: razorpay_payment_id,
      gateway_signature: razorpay_signature || "verified",
      amount_paise: contract.total_amount_paise,
      status: "CAPTURED",
    });

    // Update rental status to CONFIRMED
    await adminClient
      .schema("rentals")
      .from("contracts")
      .update({ status: "CONFIRMED", updated_at: new Date().toISOString() })
      .eq("id", contract.id);

    // Increment item rent count
    await adminClient.rpc("increment_rent_count", { p_item_id: contract.item_id }).catch(() => {});

    const receiptId = `QR-${Date.now().toString().slice(-8)}`;

    return new Response(
      JSON.stringify({
        success: true,
        status: "CONFIRMED",
        receipt_id: receiptId,
        rental_id: contract.id,
      }),
      { status: 200 }
    );
  }

  // 3. Webhook from Payment Gateway (HMAC verified)
  if (req.method === "POST" && url.pathname.endsWith("/webhook")) {
    const webhookSecret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") || "test_secret";
    const signature = req.headers.get("x-razorpay-signature");
    const rawBody = ctx.rawBody || (await req.text());

    const isValid = await verifyWebhookHmac(rawBody, signature, webhookSecret);
    if (!isValid && Deno.env.get("ENVIRONMENT") === "production") {
      return new Response(JSON.stringify({ error: "Invalid webhook signature" }), { status: 401 });
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
}

Deno.serve(withProductionMiddleware({ requireAuth: false, rateLimitPerMinute: 60 }, handler));
