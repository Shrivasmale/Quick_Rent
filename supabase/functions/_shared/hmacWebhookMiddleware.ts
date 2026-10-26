// supabase/functions/_shared/hmacWebhookMiddleware.ts

/**
 * Constant-time HMAC-SHA256 verification using Web Crypto API.
 * Protects against timing attacks on payment gateway webhook verification.
 */
export async function verifyWebhookHmac(
  rawBody: string,
  signatureHeader: string | null,
  secret: string
): Promise<boolean> {
  if (!signatureHeader || !secret) return false;

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = new Uint8Array(
      signatureHeader.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
    );

    return await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(rawBody));
  } catch {
    return false;
  }
}
