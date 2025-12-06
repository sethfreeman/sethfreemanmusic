# Quick Start Guide - Fan Portal

## Test the Login Page Locally (Before Supabase Setup)

Want to see what the login page looks like before setting up Supabase? Here's how:

```bash
cd frontend
npm run dev
```

Visit: http://localhost:3000/login

You'll see the login page with GitHub and Google OAuth buttons. They won't work yet (you'll get errors), but you can see the design and layout.

## Full Setup (Required for Functionality)

Follow these steps in order:

### 1. Create Supabase Project (5 minutes)

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in project details (use free tier)
4. Wait for project creation (~2 minutes)

### 2. Run Database Schema (2 minutes)

1. In Supabase dashboard → SQL Editor
2. Copy entire contents of `database/schema.sql`
3. Paste and click "Run"
4. Leave `'your-user-id-here'` as is for now

### 3. Enable GitHub OAuth (3 minutes)

1. In Supabase dashboard → Authentication → Providers
2. Find "GitHub" and enable it
3. It will show you a callback URL like:
   `https://xxxxx.supabase.co/auth/v1/callback`
4. Go to GitHub → Settings → Developer settings → OAuth Apps
5. Create new OAuth App:
   - Application name: Seth Freeman Music (Dev)
   - Homepage URL: http://localhost:3000
   - Callback URL: (paste the Supabase callback URL)
6. Copy Client ID and Client Secret to Supabase

### 4. Set Environment Variables (2 minutes)

```bash
cd frontend
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
```

Get URL and key from: Supabase → Settings → API

Generate secret:
```bash
openssl rand -base64 32
```

### 5. Test Login (1 minute)

```bash
npm run dev
```

1. Visit http://localhost:3000/login
2. Click "Continue with GitHub"
3. Authorize the app
4. You should see your user info!

### 6. Get Your User UUID (1 minute)

After logging in:
1. The login page will show your User ID
2. Copy that UUID
3. OR go to Supabase → Authentication → Users and copy it there

### 7. Set Yourself as Admin (1 minute)

1. In Supabase → SQL Editor
2. Run this (replace with your UUID):

```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $
BEGIN
  RETURN auth.uid() = 'your-actual-uuid-here'::uuid;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 8. Test Admin Dashboard (1 minute)

Visit http://localhost:3000/admin

You should see:
- Stats (0 fans, 0 content, etc.)
- CSV import tool
- Quick links to future admin pages

### 9. Import ReverbNation Contacts (Optional)

1. Export contacts from ReverbNation as CSV
2. Go to http://localhost:3000/admin
3. Click "Choose CSV File"
4. Select your CSV
5. Wait for import to complete

## What Works Now

✅ Login with GitHub OAuth
✅ User info display
✅ Sign out
✅ Admin dashboard
✅ CSV import for fan contacts
✅ Database with all tables

## What's Next

After Phase 1 is working, you can:
- Add Google OAuth (similar to GitHub)
- Build user profile page
- Create exclusive content upload interface
- Set up email newsletter system

See `FAN-PORTAL-STATUS.md` for full roadmap.

## Troubleshooting

### "Supabase client not initialized"
- Check `.env.local` exists and has correct values
- Restart dev server: `npm run dev`

### OAuth redirect error
- Check callback URL in GitHub OAuth app settings
- Should match Supabase callback URL exactly

### "Not authorized" in admin dashboard
- Make sure you updated the `is_admin()` function with your UUID
- Check you're logged in with the same account

### CSV import fails
- Make sure CSV has an "email" column
- Check file is proper CSV format (comma-separated)

## Need Help?

1. Check Supabase logs: Dashboard → Logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Make sure you're using Node.js 18+

## Deploy to Production

Once everything works locally:

1. Push code to GitHub
2. In Vercel → Settings → Environment Variables
3. Add all variables from `.env.local`
4. Update Supabase redirect URLs:
   - Add production URL: `https://sethfreemanmusic.com/auth/callback`
5. Update GitHub OAuth app with production callback URL
6. Deploy!

See `SETUP-GUIDE.md` for more details.
