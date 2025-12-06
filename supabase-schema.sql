-- Seth Freeman Music - Fan Portal Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_verified BOOLEAN DEFAULT FALSE,
  email_preferences JSONB DEFAULT '{"newsletter": true, "announcements": true}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Exclusive Content table
CREATE TABLE exclusive_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('video', 'audio', 'photo', 'download')),
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  file_size BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE
);

ALTER TABLE exclusive_content ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view published content
CREATE POLICY "Authenticated users can view published content" ON exclusive_content
  FOR SELECT USING (auth.role() = 'authenticated' AND is_published = TRUE);

-- Events table (for newsletter)
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  venue TEXT,
  location TEXT,
  ticket_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published events" ON events
  FOR SELECT USING (is_published = TRUE);

-- Releases table (for newsletter)
CREATE TABLE releases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  release_date DATE NOT NULL,
  description TEXT,
  cover_url TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  amazon_music_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE
);

ALTER TABLE releases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published releases" ON releases
  FOR SELECT USING (is_published = TRUE);

-- Newsletter history table
CREATE TABLE newsletters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  intro_blurb TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  recipient_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- Admin role check function
-- SETUP: After your first login, get your user ID from Supabase Dashboard → Authentication → Users
-- Then replace 'your-user-id-here' below with your actual UUID
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if current user is admin by user ID
  RETURN auth.uid() = 'your-user-id-here'::uuid; -- Replace with your user ID after first login
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies for content management
CREATE POLICY "Admins can do everything on exclusive_content" ON exclusive_content
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can do everything on events" ON events
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can do everything on releases" ON releases
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can do everything on newsletters" ON newsletters
  FOR ALL USING (is_admin());

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, email_verified)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email_confirmed_at IS NOT NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexes for performance
CREATE INDEX idx_exclusive_content_type ON exclusive_content(type);
CREATE INDEX idx_exclusive_content_created_at ON exclusive_content(created_at DESC);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_releases_date ON releases(release_date DESC);
CREATE INDEX idx_profiles_email ON profiles(email);

-- Content view tracking function
CREATE OR REPLACE FUNCTION increment_view_count(content_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE exclusive_content
  SET view_count = view_count + 1
  WHERE id = content_id;
END;
$$ LANGUAGE plpgsql;
