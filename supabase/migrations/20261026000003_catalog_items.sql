-- 20261026000003_catalog_items.sql
-- Catalog items table, full-text search, and Row Level Security

CREATE TABLE IF NOT EXISTS public.items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL CHECK (char_length(title) BETWEEN 3 AND 140),
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    daily_rate_paise BIGINT NOT NULL CHECK (daily_rate_paise > 0),
    security_deposit_paise BIGINT NOT NULL DEFAULT 0 CHECK (security_deposit_paise >= 0),
    city TEXT NOT NULL DEFAULT 'Pune',
    condition TEXT NOT NULL DEFAULT 'Good',
    image_url TEXT,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN NOT NULL DEFAULT true,
    rent_count INT NOT NULL DEFAULT 0,
    rating NUMERIC(2,1) DEFAULT 5.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Full-Text Search Vector & Index
ALTER TABLE public.items ADD COLUMN IF NOT EXISTS fts TSVECTOR
    GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || description || ' ' || category || ' ' || city)) STORED;

CREATE INDEX IF NOT EXISTS items_fts_idx ON public.items USING GIN(fts);
CREATE INDEX IF NOT EXISTS items_owner_idx ON public.items(owner_id);
CREATE INDEX IF NOT EXISTS items_category_idx ON public.items(category);

ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- RLS: Public can view active items or owner's own items
CREATE POLICY "Public can view active items"
    ON public.items FOR SELECT
    USING (is_active = true OR auth.uid() = owner_id);

-- RLS: Authenticated owners can create their own items
CREATE POLICY "Owners can create their own items"
    ON public.items FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = owner_id);

-- RLS: Owners can update their own items
CREATE POLICY "Owners can update their own items"
    ON public.items FOR UPDATE TO authenticated
    USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

-- RLS: Owners can delete their own items
CREATE POLICY "Owners can delete their own items"
    ON public.items FOR DELETE TO authenticated
    USING (auth.uid() = owner_id);
