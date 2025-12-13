# Daljeet Films Production – MERN Site

## Quick start
1) Server
```bash
cd /Users/kaushalsingh/Project/Daljeet/server
npm install
npm run dev
```
Environment (optional): set in `server/.env` (not committed):
```
MONGO_URI="mongodb+srv://ksbawa1511_db_user:Uh6YulDXn7MJJ7Nd@<cluster-host>/daljeet?retryWrites=true&w=majority&appName=<appName>"
MONGO_DB="daljeet"
CLIENT_ORIGIN="http://localhost:5173"
```
Replace `<cluster-host>` and `<appName>` with your Atlas values.

2) Client
```bash
cd /Users/kaushalsingh/Project/Daljeet/client
npm install
npm run dev
```
Set `VITE_API_BASE` (defaults to `http://localhost:4000`).

## Overview
- **Backend:** Express API (`/api/brands`, `/api/contact`, `/api/health`). MongoDB is used if `MONGO_URI` is provided; otherwise contact requests are stored in-memory.
- **Frontend:** React (Vite) single-page layout with hero, brand grid (Films, Weddings, Food Lens, Turbo Shots), and a contact form posting to the API.

## Deployment notes
- Add production URLs to `CLIENT_ORIGIN` on the server for CORS.
- Provide `MONGO_URI` for persistent contact submissions; otherwise they remain in-memory.
- **Vercel (frontend):** root `vercel.json` is set to build `client` with `npm run build` and serve `client/dist`. Set `VITE_API_BASE` in Vercel project settings to your Render API URL (e.g., `https://daljeet-api.onrender.com`).
- **Render (backend):** `render.yaml` targets `server` with `npm run start`. Set env vars `MONGO_URI`, `MONGO_DB` (optional), and `CLIENT_ORIGIN` to your Vercel URL (e.g., `https://daljeet-client.vercel.app`).
- **React Router v7 prep:** BrowserRouter opts into `v7_startTransition` and `v7_relativeSplatPath` future flags to silence warnings and be ready for RR v7.

