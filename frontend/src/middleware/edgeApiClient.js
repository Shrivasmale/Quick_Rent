// frontend/src/middleware/edgeApiClient.js
import { supabase } from "../lib/supabaseClient";

/**
 * Calls a Supabase Edge Function microservice with automatic JWT forwarding,
 * distributed tracing X-Correlation-ID, and Idempotency-Key protection.
 */
export async function invokeMicroservice(serviceName, payload = {}, options = {}) {
  const correlationId = crypto.randomUUID();
  const idempotencyKey = options.idempotencyKey || crypto.randomUUID();

  const { data, error } = await supabase.functions.invoke(serviceName, {
    method: options.method || "POST",
    body: payload,
    headers: {
      "X-Correlation-ID": correlationId,
      "Idempotency-Key": idempotencyKey,
      ...(options.headers || {}),
    },
  });

  if (error) {
    const customError = new Error(error.message || `Error calling ${serviceName}`);
    customError.correlationId = correlationId;
    customError.context = error.context;
    throw customError;
  }

  return data;
}
