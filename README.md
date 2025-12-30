# Daljeet Films Production – Fresh Setup

## Run locally
1. Backend
```bash
cd server
npm install
npm run dev
```
Set environment in `server/.env` (not committed):
```
MONGO_URI="mongodb://localhost:27017"
MONGO_DB="daljeet"
CLIENT_ORIGIN="http://127.0.0.1:5173,http://localhost:5173,https://daljeet-films-v8th.vercel.app"
PORT=4000
```

2. Frontend
```bash
cd client
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

## Notes
- No Render or Vercel config files are included.
- Contact form posts to `/api/contact`; if `MONGO_URI` is unset it will store requests in-memory.

