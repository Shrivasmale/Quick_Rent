-- 20261026000002_users_and_profiles.sql
-- Profiles table, Auth sync trigger, and rate limiting RPC

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    city TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'renter' CHECK (role IN ('renter', 'lister', 'admin')),
    kyc_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS: Anyone authenticated can read profiles; owners can update their own profile
CREATE POLICY "Public profiles are viewable by authenticated users"
    ON public.profiles FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Automatic Auth Sync Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, phone, city, role)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        new.email,
        new.raw_user_meta_data->>'phone',
        new.raw_user_meta_data->>'city',
        COALESCE(new.raw_user_meta_data->>'role', 'renter')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sliding-Window Rate Limiting RPC used by Edge Middleware
CREATE TABLE IF NOT EXISTS audit.rate_limits (
    rate_key TEXT PRIMARY KEY,
    request_count INT NOT NULL DEFAULT 1,
    window_start TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.check_rate_limit(
    p_rate_key TEXT,
    p_max_requests INT,
    p_window_seconds INT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_record audit.rate_limits%ROWTYPE;
    v_now TIMESTAMPTZ := now();
BEGIN
    SELECT * INTO v_record FROM audit.rate_limits WHERE rate_key = p_rate_key FOR UPDATE;

    IF NOT FOUND THEN
        INSERT INTO audit.rate_limits (rate_key, request_count, window_start)
        VALUES (p_rate_key, 1, v_now);
        RETURN true;
    END IF;

    IF v_now > v_record.window_start + (p_window_seconds || ' seconds')::INTERVAL THEN
        UPDATE audit.rate_limits
        SET request_count = 1, window_start = v_now
        WHERE rate_key = p_rate_key;
        RETURN true;
    ELSIF v_record.request_count < p_max_requests THEN
        UPDATE audit.rate_limits
        SET request_count = request_count + 1
        WHERE rate_key = p_rate_key;
        RETURN true;
    ELSE
        RETURN false;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
