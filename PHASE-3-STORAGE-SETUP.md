# Phase 3: Supabase Storage Setup

## Step 1: Set Your Admin User ID

Before uploading content, you MUST update the `is_admin()` function:

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click on your user (you should have logged in already)
3. Copy your **User UID** (UUID like `a1b2c3d4-...`)
4. Go to **SQL Editor** in Supabase
5. Open `database/fix-admin-policy.sql` from this project
6. Replace `YOUR_USER_ID` with your actual UUID
7. Run the SQL script
8. Test by running: `SELECT is_admin();` - should return `true`

## Step 2: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Click **Storage** in the left sidebar
3. Click **New Bucket**
4. Fill in:
   - **Name**: `exclusive-content`
   - **Public bucket**: ✅ Check this (files need to be accessible to authenticated users)
5. Click **Create Bucket**

## Step 3: Run Storage Migration

After creating the bucket, run the migration to set up access policies:

1. Go to Supabase Dashboard → **SQL Editor**
2. Open `database/migrations/004_setup_storage_policies.sql`
3. Copy and paste the entire contents
4. Click **Run**

This creates policies that:
- Allow authenticated users to view files
- Allow admins to upload, update, and delete files

## Step 4: Folder Structure

The app will automatically organize files:
- `/content/` - Main content files (videos, audio, photos, downloads)
- `/thumbnails/` - Thumbnail images for content

## Step 5: File Size Limits

Default Supabase limits:
- Free tier: 50MB per file
- Pro tier: 5GB per file

To change limits, go to **Settings** → **Storage** in Supabase Dashboard.

## Testing

1. Go to `/admin/content` on your site
2. Try uploading a small test file
3. Check that it appears in Supabase Storage bucket
4. Verify members can view it on `/members` page

## Troubleshooting

**"new row violates row-level security policy"**
- Make sure your admin user ID is set correctly in the `is_admin()` function
- Check that storage policies are created

**"Failed to upload"**
- Check file size limits
- Verify bucket name is `exclusive-content`
- Check browser console for detailed errors

**Files not showing on members page**
- Verify `is_published` is true in database
- Check that storage policies allow authenticated users to view files
