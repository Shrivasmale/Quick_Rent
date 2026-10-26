-- 20261026000006_storage_buckets_rls.sql
-- Storage buckets for item-images and rental-receipts

-- 1. Create Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('item-images', 'item-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('rental-receipts', 'rental-receipts', false, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET 
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Objects RLS Policies
-- item-images: Anyone can view; authenticated users can upload to their own user directory
CREATE POLICY "Public Read Access for Item Images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'item-images');

CREATE POLICY "Authenticated Users can upload Item Images"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'item-images' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Owners can update or delete their Item Images"
    ON storage.objects FOR DELETE TO authenticated
    USING (
        bucket_id = 'item-images' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- rental-receipts: Private. Users can only download receipts where folder name matches their UID
CREATE POLICY "Users can download their own rental receipts"
    ON storage.objects FOR SELECT TO authenticated
    USING (
        bucket_id = 'rental-receipts' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );
