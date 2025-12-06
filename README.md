# Seth Freeman Music

Official website for Seth Freeman - Singer/Songwriter. Built with Next.js.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: CSS Modules with dark theme
- **Deployment**: Vercel (optimized for Next.js)

## Project Structure

```
/frontend
  /app          - Next.js pages and layouts
  /public       - Static assets (images)
  next.config.js - Next.js configuration
/backend        - Go server (optional, not currently used)
```

## Development

### Prerequisites

- Node.js 18+ and npm

### Local Development

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

### Production Build

```bash
cd frontend
npm run build
```

This creates a static export in the `out/` directory.

## Deployment

The site is deployed on Vercel with automatic deployments from the main branch.

### Vercel Configuration

- **Root Directory**: `frontend` (set in Vercel project settings)
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `out`

## Site Content

- **Home** - Full-screen hero image with bio and music links
- **Music** - Streaming platform links and social media
- **Photos** - Instagram integration
- **Video** - YouTube video embeds
- **Bio** - Full biography and press kit
- **Tour** - Tour dates via Songkick widget

## Features

- 🎨 Dark theme with custom background images
- 📱 Fully responsive design
- ⚡ Static site generation for optimal performance
- 🎵 Integration with music streaming platforms
- 📸 Social media integration
- 🎬 Embedded video content

## History

Originally built with WordPress, migrated to Next.js for better performance and maintainability.
