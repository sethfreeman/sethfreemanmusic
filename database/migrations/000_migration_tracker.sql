-- Migration 000: Migration Tracker Table
-- Created: 2025-12-06
-- Description: Create a table to track which migrations have been applied

-- Create migrations tracking table
CREATE TABLE IF NOT EXISTS schema_migrations (
  id SERIAL PRIMARY KEY,
  migration_number INTEGER UNIQUE NOT NULL,
  migration_name TEXT NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  applied_by TEXT DEFAULT current_user
);

-- Add comment
COMMENT ON TABLE schema_migrations IS 'Tracks which database migrations have been applied';

-- Insert this migration as the first entry
INSERT INTO schema_migrations (migration_number, migration_name) 
VALUES (0, 'migration_tracker')
ON CONFLICT (migration_number) DO NOTHING;
