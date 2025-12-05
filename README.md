# Seth Freeman Music

Official website for Seth Freeman - Singer/Songwriter. Built with Go backend and React frontend.

## Tech Stack

- **Backend**: Go (Golang) - serves the static React build
- **Frontend**: React with React Router
- **Deployment**: Can be deployed to any platform supporting Go

## Project Structure

```
/backend    - Go server (serves React build in production)
/frontend   - React application
```

## Development

### Prerequisites

- Node.js and npm
- Go 1.21 or higher

### Frontend Development

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000`

### Production Build

1. Build the React app:
```bash
cd frontend
npm run build
```

2. Run the Go server (serves the built React app):
```bash
cd backend
go mod tidy
go run main.go
```

The server will run on `http://localhost:8080`

## Deployment

1. Build the frontend: `cd frontend && npm run build`
2. Deploy the backend with the frontend build directory
3. Set the `PORT` environment variable if needed

## Content

The site includes:
- Home page with bio and music links
- Music page with streaming platform links
- Photos page (Instagram integration)
- Video page with YouTube embeds
- Bio/EPK page
- Tour dates (Songkick widget)

## Migration from WordPress

This site was migrated from WordPress. The original export is in `sethfreeman.WordPress.2025-12-05.xml`.
