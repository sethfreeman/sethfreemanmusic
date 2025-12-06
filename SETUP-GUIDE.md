# Fan Portal Setup Guide

## Phase 1: Foundation Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - **Name**: Seth Freeman Music
   - **Database Password**: (generate a strong password - save it!)
   - **Region**: Choose closest to your audience
   - **Pricing Plan**: Free
5. Wait for project to be created (~2 minutes)

### Step 2: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql`
4. Paste into the SQL editor
5. **IMPORTANT**: Replace `sethfreemanmusic@gmail.com` with your actual admin email
6. Click "Run" to execute the schema

### Step 3: Configure OAuth Providers

#### Google OAuth:
1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find "Google" and click to expand
3. Enable it
4. Follow the instructions to create Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://[your-project-ref].supabase.co/auth/v1/callback`
5. Copy Client ID and Client Secret to Supabase

#### Facebook OAuth:
1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find "Facebook" and enable it
3. Go to [Facebook Developers](https://developers.facebook.com)
4. Create an app
5. Add Facebook Login product
6. Configure OAuth redirect URI
7. Copy App ID and App Secret to Supabase

#### Apple OAuth:
1. Similar process through [Apple Developer](https://developer.apple.com)
2. More complex setup - can be added later if needed

### Step 4: Get Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long string)

### Step 5: Configure Environment Variables

1. In your project, copy `.env.local.example` to `.env.local`:
   ```bash
   cd frontend
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate-random-secret-here
   ```

3. Generate NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

### Step 6: Install Dependencies

```bash
cd frontend
npm install
```

### Step 7: Test Locally

```bash
npm run dev
```

Visit:
- Main site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin

### Step 8: Import ReverbNation Contacts

1. Export your contacts from ReverbNation as CSV
2. Go to http://localhost:3000/admin
3. Click "Choose CSV File"
4. Select your ReverbNation CSV
5. Wait for import to complete

**CSV Format Expected:**
- Must have an "email" column
- Optional "name" or "first name" column
- Other columns will be ignored

### Step 9: Deploy to Vercel

1. Push your code to GitHub
2. In Vercel dashboard, add environment variables:
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`
   - Make sure to add them for Production, Preview, and Development

3. Deploy!

### Step 10: Update Supabase Redirect URLs

After deploying to Vercel:

1. Go to Supabase dashboard → **Authentication** → **URL Configuration**
2. Add your production URL to **Site URL**: `https://sethfreemanmusic.com`
3. Add to **Redirect URLs**:
   - `https://sethfreemanmusic.com/auth/callback`
   - `http://localhost:3000/auth/callback` (for local dev)

## Troubleshooting

### "No email column found"
- Check your CSV has a column with "email" in the header
- Make sure it's a proper CSV (comma-separated)

### "Supabase client not initialized"
- Check your `.env.local` file exists
- Verify the environment variables are correct
- Restart the dev server

### OAuth not working
- Verify redirect URLs are configured correctly
- Check OAuth credentials in Supabase dashboard
- Make sure OAuth providers are enabled

## Next Steps

Once Phase 1 is complete:
- ✅ Database is set up
- ✅ Fans are imported
- ✅ Admin dashboard works

Ready for **Phase 2**: Authentication & Login pages!

## Support

If you run into issues:
1. Check Supabase logs: Dashboard → Logs
2. Check browser console for errors
3. Verify environment variables are set correctly
