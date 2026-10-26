-- Seed Data for QuickRent Local Development
-- Creates deterministic UUIDs and seed catalog items

DO $$
DECLARE
    v_admin_id UUID := '00000000-0000-0000-0000-000000000001';
    v_renter_id UUID := '00000000-0000-0000-0000-000000000002';
BEGIN
    -- 1. Create Mock Auth Users in auth.users if not present
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES 
    (v_admin_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin@quickrent.com', crypt('AdminPass123!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"],"role":"admin"}', '{"full_name":"Aarav Sharma","phone":"9876543210","city":"Pune"}', now(), now()),
    (v_renter_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'renter@quickrent.com', crypt('RenterPass123!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"],"role":"renter"}', '{"full_name":"Priya Nair","phone":"9876543211","city":"Mumbai"}', now(), now())
    ON CONFLICT (id) DO NOTHING;

    -- 2. Seed Public Profiles
    INSERT INTO public.profiles (id, full_name, email, phone, city, role, kyc_verified)
    VALUES 
    (v_admin_id, 'Aarav Sharma', 'admin@quickrent.com', '9876543210', 'Pune', 'lister', true),
    (v_renter_id, 'Priya Nair', 'renter@quickrent.com', '9876543211', 'Mumbai', 'renter', true)
    ON CONFLICT (id) DO UPDATE SET 
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role;

    -- 3. Seed Catalog Items
    INSERT INTO public.items (id, owner_id, title, category, description, daily_rate_paise, security_deposit_paise, city, condition, image_url, is_active)
    VALUES
    ('11111111-1111-1111-1111-111111111111', v_admin_id, 'Black Relax ST Chair & Table', 'Furniture & Living', 'Modern black metal framed relaxed dining chairs with stylish bistro table. Weather resistant and ergonomic.', 15000, 60000, 'Pune', 'Pristine', '/images/chair_black_relax.jpg', true),
    ('22222222-2222-2222-2222-222222222222', v_admin_id, 'Cozy Duo with Table', 'Furniture & Living', 'Set of two boucle cream lounge armchairs paired with a solid oak round coffee table. Unmatched comfort.', 17000, 75000, 'Mumbai', 'Brand New', '/images/chair_cozy_duo.jpg', true),
    ('33333333-3333-3333-3333-333333333333', v_admin_id, 'Elegant Brown Table', 'Furniture & Living', 'Minimalist solid dark walnut timber accent table with tripod legs. Ideal for living spaces and corners.', 7500, 30000, 'Bangalore', 'Excellent', '/images/table_elegant_brown.jpg', true),
    ('44444444-4444-4444-4444-444444444444', v_admin_id, 'White Cushion Back Chair', 'Furniture & Living', 'Contemporary natural oak chair with plush rounded white cushion back. Includes cozy accent throw.', 9500, 40000, 'Pune', 'Excellent', '/images/chair_white_cushion.jpg', true),
    ('55555555-5555-5555-5555-555555555555', v_admin_id, 'Cushion Comfort Velvet Chair', 'Furniture & Living', 'Sculpted royal blue velvet accent chair with tapered natural wood legs. Soft touch luxury finish.', 9000, 35000, 'Delhi', 'Pristine', '/images/chair_blue_velvet.jpg', true),
    ('66666666-6666-6666-6666-666666666666', v_admin_id, 'Softwood Dining Chair', 'Furniture & Living', 'Architectural solid light oak dining chair designed for posture support and seamless minimalism.', 8500, 32000, 'Pune', 'Brand New', '/images/chair_softwood.jpg', true),
    ('77777777-7777-7777-7777-777777777777', v_admin_id, 'Home Lounge Dining Set', 'Furniture & Living', 'Round dining table with two supportive upholstered armchairs. Perfect for intimate spaces.', 22000, 90000, 'Mumbai', 'Excellent', '/images/table_lounge_dining.jpg', true)
    ON CONFLICT (id) DO NOTHING;

END $$;
