-- Migration 003: Create Contacts Table
-- Created: 2025-12-06
-- Description: Create a separate table for imported contacts (before they sign up)

-- Contacts table for imported fans (not yet signed up)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  tag TEXT,
  reverbnation_created_at TIMESTAMP WITH TIME ZONE,
  imported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  signed_up BOOLEAN DEFAULT FALSE,
  signed_up_at TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Admin can do everything with contacts
DROP POLICY IF EXISTS "Admins can do everything on contacts" ON contacts;
CREATE POLICY "Admins can do everything on contacts" ON contacts
  FOR ALL USING (is_admin());

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_signed_up ON contacts(signed_up);
CREATE INDEX IF NOT EXISTS idx_contacts_city ON contacts(city);
CREATE INDEX IF NOT EXISTS idx_contacts_state ON contacts(state);
CREATE INDEX IF NOT EXISTS idx_contacts_country ON contacts(country);

-- Add comment for documentation
COMMENT ON TABLE contacts IS 'Imported fan contacts before they sign up with OAuth';
COMMENT ON COLUMN contacts.signed_up IS 'True when contact has signed up and linked to user_id';
COMMENT ON COLUMN contacts.user_id IS 'Links to auth.users after signup';

-- Function to link contact to user after signup
CREATE OR REPLACE FUNCTION link_contact_to_user()
RETURNS TRIGGER AS $$
BEGIN
  -- When a new profile is created, check if there's a matching contact
  UPDATE contacts
  SET signed_up = TRUE,
      signed_up_at = NOW(),
      user_id = NEW.id
  WHERE email = NEW.email AND signed_up = FALSE;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to link contacts when user signs up
DROP TRIGGER IF EXISTS on_profile_created_link_contact ON profiles;
CREATE TRIGGER on_profile_created_link_contact
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION link_contact_to_user();
