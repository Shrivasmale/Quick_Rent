-- 20261026000005_payments_ledger.sql
-- Immutable append-only payment ledger & gateway intents

CREATE TABLE IF NOT EXISTS payments.intents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rental_id UUID NOT NULL REFERENCES rentals.contracts(id) ON DELETE CASCADE,
    payer_id UUID NOT NULL REFERENCES auth.users(id),
    gateway TEXT NOT NULL DEFAULT 'razorpay',
    gateway_order_id TEXT NOT NULL UNIQUE,
    amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'CREATED' CHECK (status IN ('CREATED', 'PROCESSING', 'SUCCEEDED', 'FAILED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments.ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rental_id UUID NOT NULL REFERENCES rentals.contracts(id),
    payer_id UUID NOT NULL REFERENCES auth.users(id),
    gateway_order_id TEXT NOT NULL,
    gateway_payment_id TEXT UNIQUE,
    gateway_signature TEXT,
    amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
    status TEXT NOT NULL CHECK (status IN ('CREATED', 'CAPTURED', 'REFUNDED', 'FAILED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ledger_rental_idx ON payments.ledger(rental_id);
CREATE INDEX IF NOT EXISTS ledger_payer_idx ON payments.ledger(payer_id);

ALTER TABLE payments.intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments.ledger ENABLE ROW LEVEL SECURITY;

-- Users have strictly READ-ONLY access to their own records
CREATE POLICY "Users can view their own payment intents"
    ON payments.intents FOR SELECT TO authenticated
    USING (auth.uid() = payer_id);

CREATE POLICY "Users can view their own payment ledger"
    ON payments.ledger FOR SELECT TO authenticated
    USING (auth.uid() = payer_id);

-- Prevent accidental or malicious mutations on completed ledger records
REVOKE DELETE, UPDATE ON payments.ledger FROM authenticated, anon;
REVOKE INSERT ON payments.ledger FROM authenticated, anon;
