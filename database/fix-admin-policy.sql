-- Update Admin User ID
-- Run this in Supabase SQL Editor after replacing YOUR_USER_ID

-- IMPORTANT: This is NOT a migration - you must run this manually
-- because your admin user ID is unique to your deployment

-- Step 1: Get your user ID
-- Go to Supabase Dashboard → Authentication → Users
-- Click on your user and copy the UUID

-- Step 2: Update the is_admin() function with your UUID
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Replace 'YOUR_USER_ID' with your actual UUID from Authentication → Users
  -- Example: RETURN auth.uid() = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid;
  RETURN auth.uid() = 'YOUR_USER_ID'::uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Test it works
-- Run this query - it should return TRUE if you're logged in as admin:
-- SELECT is_admin();
