// supabase/functions/_shared/auditLogger.ts
import { createServiceClient } from "./supabaseClients.ts";

export interface AuditLogEntry {
  actorId: string;
  eventType: string;
  correlationId: string;
  clientIp: string;
  details?: Record<string, unknown>;
}

/**
 * Redacts sensitive fields (PII, tokens, passwords) and emits structured JSON logs.
 * Asynchronously persists audit events to audit.security_logs table.
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
  const sanitizedDetails = entry.details ? sanitizeDetails(entry.details) : {};

  // Console structured stdout
  console.log(
    JSON.stringify({
      level: "INFO",
      timestamp: new Date().toISOString(),
      ...entry,
      details: sanitizedDetails,
    })
  );

  // Write to PostgreSQL audit schema asynchronously
  try {
    const admin = createServiceClient();
    await admin.schema("audit").from("security_logs").insert({
      actor_id: entry.actorId,
      event_type: entry.eventType,
      correlation_id: entry.correlationId,
      client_ip: entry.clientIp,
      details: sanitizedDetails,
    });
  } catch (err) {
    console.error("Failed to write to audit.security_logs:", err);
  }
}

function sanitizeDetails(details: Record<string, unknown>): Record<string, unknown> {
  const sanitized = { ...details };
  const sensitiveKeys = ["password", "token", "secret", "cvv", "card_number", "access_token"];

  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
      sanitized[key] = "[REDACTED]";
    }
  }
  return sanitized;
}
