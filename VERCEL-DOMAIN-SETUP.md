# Vercel Domain Setup

## Update Production Domain

Now that your domain `sethfreemanmusic.com` is working, update these settings:

### 1. Set Custom Domain as Primary

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Find `sethfreemanmusic.com`
3. Click the three dots menu → **Set as Primary**
4. This will redirect `*.vercel.app` URLs to your custom domain

### 2. Update Environment Variables

Go to **Settings** → **Environment Variables** and update:

**NEXTAUTH_URL:**
- Current value: `https://your-project.vercel.app`
- New value: `https://sethfreemanmusic.com`
- Environments: Production, Preview

After changing, **redeploy** your app for changes to take effect.

### 3. Update Supabase Redirect URLs

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Update **Site URL** to: `https://sethfreemanmusic.com`
3. Update **Redirect URLs** to include:
   ```
   https://sethfreemanmusic.com/auth/callback
   https://sethfreemanmusic.com/*
   http://localhost:3000/auth/callback
   http://localhost:3000/*
   ```

### 4. Update OAuth Provider Settings

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to your OAuth credentials
3. Add to **Authorized redirect URIs**:
   - `https://[your-supabase-project].supabase.co/auth/v1/callback`
   - `https://sethfreemanmusic.com/auth/callback`
4. Add to **Authorized JavaScript origins**:
   - `https://sethfreemanmusic.com`

#### GitHub OAuth:
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Update **Homepage URL**: `https://sethfreemanmusic.com`
3. Update **Authorization callback URL**: 
   - `https://[your-supabase-project].supabase.co/auth/v1/callback`

### 5. Test Everything

After making these changes:

1. Clear your browser cache
2. Try signing in with Google
3. Try signing in with GitHub
4. Verify you're redirected to `/members` after login
5. Check that the domain stays on `sethfreemanmusic.com` (not jumping to vercel.app)

## Troubleshooting

**Still redirecting to vercel.app:**
- Make sure you set the custom domain as primary in Vercel
- Clear browser cache and cookies
- Check that NEXTAUTH_URL is updated in Vercel environment variables

**Google OAuth still failing:**
- Verify redirect URIs in Google Cloud Console
- Make sure Supabase redirect URLs are updated
- Check that the Supabase callback URL is correct in Google settings

**"Redirect URI mismatch" error:**
- The OAuth provider needs the Supabase callback URL, not your site's URL
- Format: `https://[project-ref].supabase.co/auth/v1/callback`
