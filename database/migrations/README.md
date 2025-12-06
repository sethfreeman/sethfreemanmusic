# Database Migrations

This folder contains SQL migration files for the Seth Freeman Music fan portal database.

## Migration Files

Migrations are numbered sequentially and should be run in order:

- `001_initial_schema.sql` - Initial database setup with all tables
- `002_add_reverbnation_fields.sql` - Add ReverbNation import fields to profiles

## How to Apply Migrations

### Option 1: Supabase Dashboard (Manual)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of the migration file
5. Paste and click **Run**
6. Repeat for each migration in order

### Option 2: Supabase CLI (Recommended for Production)

If you want to use the official Supabase CLI for migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

### Option 3: Custom Migration Script

You can also create a simple Node.js script to apply migrations programmatically using the Supabase client.

## Creating New Migrations

When you need to make database changes:

1. Create a new file: `database/migrations/00X_description.sql`
2. Use the next sequential number (003, 004, etc.)
3. Add a header comment with:
   - Migration number
   - Created date
   - Description of changes
4. Write your SQL (ALTER TABLE, CREATE INDEX, etc.)
5. Test locally first if possible
6. Apply to production
7. Commit to git

### Migration Template

Create new migrations in `database/migrations/`:

```sql
-- Migration 00X: Brief Description
-- Created: YYYY-MM-DD
-- Description: Detailed description of what this migration does

-- Your SQL here
ALTER TABLE table_name ADD COLUMN new_column TEXT;

-- Add indexes if needed
CREATE INDEX idx_table_column ON table_name(new_column);

-- Add comments for documentation
COMMENT ON COLUMN table_name.new_column IS 'Description of what this column stores';
```

## Best Practices

1. **Never modify existing migrations** - Always create a new migration to change things
2. **Make migrations reversible** - Consider creating a rollback migration if needed
3. **Test migrations** - Test on a development database first
4. **Keep migrations small** - One logical change per migration
5. **Document changes** - Add comments explaining why the change was made
6. **Backup before migrating** - Always backup production data before running migrations

## Migration History

| # | Date | Description | Status |
|---|------|-------------|--------|
| 000 | 2025-12-06 | Migration tracker table | ⏳ Optional |
| 001 | 2025-12-06 | Initial schema setup | ✅ Applied |
| 002 | 2025-12-06 | Add ReverbNation fields | ⏳ Pending |

## Tracking Applied Migrations

You can optionally run migration `000_migration_tracker.sql` to create a table that tracks which migrations have been applied. This is useful for production environments.

After running a migration, record it:

```sql
INSERT INTO schema_migrations (migration_number, migration_name) 
VALUES (2, 'add_reverbnation_fields');
```

Check which migrations have been applied:

```sql
SELECT * FROM schema_migrations ORDER BY migration_number;
```

## Rollback Migrations

If you need to rollback a migration, create a new migration that reverses the changes:

```sql
-- Migration 00X_rollback: Rollback Migration 00Y
-- Created: YYYY-MM-DD
-- Description: Rollback changes from migration 00Y

-- Example: Remove columns added in migration 002
ALTER TABLE profiles DROP COLUMN IF EXISTS city;
ALTER TABLE profiles DROP COLUMN IF EXISTS state;
-- etc.
```

## Notes

- Supabase automatically tracks migrations if you use the CLI
- Manual migrations via SQL Editor are not tracked automatically
- Consider using the Supabase CLI for production environments
- Keep this README updated with new migrations
