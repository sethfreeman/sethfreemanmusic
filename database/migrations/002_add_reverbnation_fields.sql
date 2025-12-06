-- Migration 002: Add ReverbNation Fields
-- Created: 2025-12-06
-- Description: Add location and ReverbNation metadata fields to profiles table

-- Add ReverbNation fields to profiles table
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS state TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS postal_code TEXT,
  ADD COLUMN IF NOT EXISTS tag TEXT,
  ADD COLUMN IF NOT EXISTS reverbnation_created_at TIMESTAMP WITH TIME ZONE;

-- Add indexes for location fields (useful for segmenting newsletters by region)
CREATE INDEX IF NOT EXISTS idx_profiles_city ON profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_state ON profiles(state);
CREATE INDEX IF NOT EXISTS idx_profiles_country ON profiles(country);

-- Add comment for documentation
COMMENT ON COLUMN profiles.city IS 'Fan city from ReverbNation import';
COMMENT ON COLUMN profiles.state IS 'Fan state/province from ReverbNation import';
COMMENT ON COLUMN profiles.country IS 'Fan country from ReverbNation import';
COMMENT ON COLUMN profiles.postal_code IS 'Fan postal/zip code from ReverbNation import';
COMMENT ON COLUMN profiles.tag IS 'Fan tag/category from ReverbNation import';
COMMENT ON COLUMN profiles.reverbnation_created_at IS 'Original fan club join date from ReverbNation';
