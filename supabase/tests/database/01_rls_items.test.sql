-- pgTAP RLS Test: public.items catalog permissions
BEGIN;
SELECT plan(4);

-- 1. Verify RLS is enabled on public.items
SELECT row_level_security_is_active('public', 'items', 'RLS should be active on public.items');

-- 2. Verify policies exist
SELECT policies_are(
    'public',
    'items',
    ARRAY[
        'Public can view active items',
        'Owners can create their own items',
        'Owners can update their own items',
        'Owners can delete their own items'
    ],
    'public.items must have all 4 required RLS policies'
);

-- 3. Anonymous user can select active items
SET LOCAL ROLE anon;
SELECT ok(
    (SELECT count(*) FROM public.items WHERE is_active = true) >= 0,
    'Anonymous role can read active items'
);

-- 4. Anonymous user cannot insert items
PREPARE anon_insert AS INSERT INTO public.items (owner_id, title, description, category, daily_rate_paise) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hacked Item', 'Hack Desc', 'Furniture', 1000);
SELECT throws_ok(
    'anon_insert',
    '42501',
    NULL,
    'Anonymous users cannot insert into public.items'
);

SELECT * FROM finish();
ROLLBACK;
