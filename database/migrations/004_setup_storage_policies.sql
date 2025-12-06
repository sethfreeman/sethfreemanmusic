-- Migration 004: Setup Storage Policies for Exclusive Content
-- Run this migration in Supabase SQL Editor

-- PREREQUISITES:
-- 1. You must have updated is_admin() function with your user ID (see database/fix-admin-policy.sql)
-- 2. You must create the 'exclusive-content' storage bucket first via Supabase Dashboard
--    Go to Storage → New Bucket → Name: "exclusive-content" → Public: YES

-- Policy 1: Authenticated users can view files
DROP POLICY IF EXISTS "Authenticated users can view files" ON storage.objects;
CREATE POLICY "Authenticated users can view files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'exclusive-content');

-- Policy 2: Admins can upload files
DROP POLICY IF EXISTS "Admins can upload files" ON storage.objects;
CREATE POLICY "Admins can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'exclusive-content' 
  AND (SELECT is_admin())
);

-- Policy 3: Admins can update files
DROP POLICY IF EXISTS "Admins can update files" ON storage.objects;
CREATE POLICY "Admins can update files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'exclusive-content' 
  AND (SELECT is_admin())
);

-- Policy 4: Admins can delete files
DROP POLICY IF EXISTS "Admins can delete files" ON storage.objects;
CREATE POLICY "Admins can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'exclusive-content' 
  AND (SELECT is_admin())
);

-- Record migration (optional - only if you ran migration 000_migration_tracker.sql)
INSERT INTO schema_migrations (migration_number, migration_name)
VALUES (4, '004_setup_storage_policies')
ON CONFLICT (migration_number) DO NOTHING;
