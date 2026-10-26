-- 20261026000007_audit_and_webhooks.sql
-- Audit logs, Idempotency lock table, and security tracking

CREATE TABLE IF NOT EXISTS audit.security_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id TEXT NOT NULL DEFAULT 'anonymous',
    event_type TEXT NOT NULL,
    correlation_id TEXT,
    client_ip TEXT,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit.idempotency_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    idempotency_key TEXT NOT NULL,
    payload_hash TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'IN_FLIGHT' CHECK (status IN ('IN_FLIGHT', 'COMPLETED', 'FAILED')),
    response_code INT,
    response_body JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '24 hours'),
    CONSTRAINT uq_user_idempotency UNIQUE(user_id, idempotency_key)
);

CREATE INDEX IF NOT EXISTS idx_idempotency_expiry ON audit.idempotency_keys(expires_at);

-- Periodic cleanup of expired idempotency keys
CREATE OR REPLACE FUNCTION audit.cleanup_expired_idempotency_keys()
RETURNS void AS $$
BEGIN
    DELETE FROM audit.idempotency_keys WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
