-- 20261026000004_rentals_and_locks.sql
-- Rentals contracts with mathematical double-booking exclusion constraint

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rental_status' AND typnamespace = 'rentals'::regnamespace) THEN
        CREATE TYPE rentals.rental_status AS ENUM (
            'PENDING_PAYMENT',
            'CONFIRMED',
            'ACTIVE',
            'COMPLETED',
            'CANCELLED',
            'EXPIRED'
        );
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS rentals.contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE RESTRICT,
    renter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    rental_period DATERANGE NOT NULL,
    total_amount_paise BIGINT NOT NULL CHECK (total_amount_paise > 0),
    security_deposit_paise BIGINT NOT NULL DEFAULT 0,
    platform_fee_paise BIGINT NOT NULL DEFAULT 0,
    status rentals.rental_status NOT NULL DEFAULT 'PENDING_PAYMENT',
    hold_expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '15 minutes'),
    renter_name TEXT,
    renter_phone TEXT,
    renter_email TEXT,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT renter_cannot_be_owner CHECK (renter_id <> owner_id),
    -- Guarantees two users can NEVER book the same item for overlapping dates
    CONSTRAINT no_overlapping_active_rentals EXCLUDE USING gist (
        item_id WITH =,
        rental_period WITH &&
    ) WHERE (status IN ('PENDING_PAYMENT', 'CONFIRMED', 'ACTIVE'))
);

CREATE INDEX IF NOT EXISTS contracts_renter_idx ON rentals.contracts(renter_id);
CREATE INDEX IF NOT EXISTS contracts_owner_idx ON rentals.contracts(owner_id);
CREATE INDEX IF NOT EXISTS contracts_item_idx ON rentals.contracts(item_id);

ALTER TABLE rentals.contracts ENABLE ROW LEVEL SECURITY;

-- Renters and Owners can view their contracts
CREATE POLICY "Users can view their own rental contracts"
    ON rentals.contracts FOR SELECT TO authenticated
    USING (auth.uid() = renter_id OR auth.uid() = owner_id);

-- Atomic RPC: Creates a rental hold with date-range locking inside a transaction
CREATE OR REPLACE FUNCTION rentals.create_rental_hold(
    p_item_id UUID,
    p_start_date DATE,
    p_end_date DATE,
    p_renter_name TEXT,
    p_renter_phone TEXT,
    p_renter_email TEXT,
    p_message TEXT DEFAULT ''
)
RETURNS JSONB AS $$
DECLARE
    v_item public.items%ROWTYPE;
    v_days INT;
    v_rent_paise BIGINT;
    v_platform_fee BIGINT;
    v_total_paise BIGINT;
    v_contract_id UUID;
    v_renter_id UUID := auth.uid();
BEGIN
    IF v_renter_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required to create rental hold';
    END IF;

    IF p_end_date <= p_start_date THEN
        RAISE EXCEPTION 'End date must be strictly after start date';
    END IF;

    -- Lock and verify item
    SELECT * INTO v_item FROM public.items WHERE id = p_item_id AND is_active = true FOR SHARE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Item not available or inactive';
    END IF;

    IF v_item.owner_id = v_renter_id THEN
        RAISE EXCEPTION 'You cannot rent your own listed item';
    END IF;

    v_days := (p_end_date - p_start_date);
    v_rent_paise := v_days * v_item.daily_rate_paise;
    v_platform_fee := ROUND(v_rent_paise * 0.02);
    v_total_paise := v_rent_paise + v_item.security_deposit_paise + v_platform_fee;

    -- Insert contract (will raise 23P01 exclusion_violation if overlapping dates exist)
    INSERT INTO rentals.contracts (
        item_id, renter_id, owner_id, rental_period,
        total_amount_paise, security_deposit_paise, platform_fee_paise,
        status, renter_name, renter_phone, renter_email, message
    ) VALUES (
        p_item_id, v_renter_id, v_item.owner_id, daterange(p_start_date, p_end_date, '[]'),
        v_total_paise, v_item.security_deposit_paise, v_platform_fee,
        'PENDING_PAYMENT', p_renter_name, p_renter_phone, p_renter_email, p_message
    ) RETURNING id INTO v_contract_id;

    RETURN jsonb_build_object(
        'contract_id', v_contract_id,
        'item_id', v_item.id,
        'item_title', v_item.title,
        'days', v_days,
        'daily_rate_paise', v_item.daily_rate_paise,
        'rent_total_paise', v_rent_paise,
        'security_deposit_paise', v_item.security_deposit_paise,
        'platform_fee_paise', v_platform_fee,
        'total_amount_paise', v_total_paise,
        'hold_expires_at', (now() + INTERVAL '15 minutes')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
