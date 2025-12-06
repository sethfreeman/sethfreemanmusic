# Next.js Migration

This branch migrates the site from Create React App to Next.js 14.

## Changes Made

### Structure
- Moved from `src/` to `app/` directory (Next.js App Router)
- Converted React Router to file-based routing
- Removed `react-router-dom` dependency
- Removed `react-scripts` dependency

### Files
- `src/App.js` → `app/layout.js` (root layout)
- `src/pages/Home.js` → `app/page.js` (home page)
- `src/pages/Bio.js` → `app/bio/page.js`
- `src/pages/Music.js` → `app/music/page.js`
- `src/pages/Photos.js` → `app/photos/page.js`
- `src/pages/Video.js` → `app/video/page.js`
- `src/pages/Shows.js` → `app/shows/page.js`

### Dependencies
**Removed:**
- react-scripts
- react-router-dom

**Added:**
- next (^14.2.18)
- eslint-config-next

### Configuration
- Added `next.config.js` with static export configuration
- Updated `package.json` scripts for Next.js
- Images moved to `public/` directory
- Updated CSS imports to use public paths

### Benefits
✅ No more deprecation warnings
✅ Better performance with automatic code splitting
✅ Server-side rendering capabilities
✅ Built-in image optimization
✅ Simpler deployment on Vercel
✅ File-based routing (no router config needed)

## Testing Locally

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000

## Building for Production

```bash
cd frontend
npm run build
```

This creates a static export in the `out/` directory.

## Deployment

Vercel will automatically detect Next.js and deploy correctly. No special configuration needed!

## Notes

- The Shows page uses `'use client'` directive because it has client-side effects (Songkick widget)
- All other pages are server components by default
- Static export mode is enabled for compatibility with static hosting
