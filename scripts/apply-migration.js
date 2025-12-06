#!/usr/bin/env node

/**
 * Simple migration script for database
 * Usage: node scripts/apply-migration.js <migration-number>
 * Example: node scripts/apply-migration.js 002
 * 
 * Note: Currently supports Supabase. Can be adapted for other databases.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../frontend/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase credentials not found in .env.local');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration(migrationNumber) {
  const migrationFiles = fs.readdirSync(path.join(__dirname, '../database/migrations'))
    .filter(f => f.endsWith('.sql'))
    .sort();

  const migrationFile = migrationFiles.find(f => f.startsWith(migrationNumber.padStart(3, '0')));

  if (!migrationFile) {
    console.error(`❌ Migration ${migrationNumber} not found`);
    console.log('\nAvailable migrations:');
    migrationFiles.forEach(f => console.log(`  - ${f}`));
    process.exit(1);
  }

  const migrationPath = path.join(__dirname, '../database/migrations', migrationFile);
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log(`📦 Applying migration: ${migrationFile}`);
  console.log('─'.repeat(50));

  try {
    // Note: This is a simplified version. For complex migrations,
    // you should use the Supabase CLI or run SQL directly in the dashboard
    console.log('⚠️  Note: This script cannot execute raw SQL via the database client.');
    console.log('Please run this migration manually in your database SQL Editor:');
    console.log('');
    if (supabaseUrl.includes('supabase.co')) {
      console.log('1. Go to: ' + supabaseUrl.replace('.supabase.co', '.supabase.co/project/_/sql'));
    } else {
      console.log('1. Go to your database admin panel');
    }
    console.log('2. Copy the contents of: ' + migrationPath);
    console.log('3. Paste and click "Run"');
    console.log('');
    console.log('Migration SQL:');
    console.log('─'.repeat(50));
    console.log(sql);
    console.log('─'.repeat(50));
  } catch (error) {
    console.error('❌ Error applying migration:', error.message);
    process.exit(1);
  }
}

// Get migration number from command line
const migrationNumber = process.argv[2];

if (!migrationNumber) {
  console.error('Usage: node scripts/apply-migration.js <migration-number>');
  console.error('Example: node scripts/apply-migration.js 002');
  process.exit(1);
}

applyMigration(migrationNumber);
