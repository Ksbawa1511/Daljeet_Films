import express from 'express';
import cors from 'cors';
import brandsRouter from './routes/brands.js';
import contactRouter from './routes/contact.js';
import healthRouter from './routes/health.js';

const app = express();

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'https://daljeet-films-v8th.vercel.app',
];

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim())
  : defaultOrigins;

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/contact', contactRouter);

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Daljeet Films Production API',
    endpoints: ['/api/brands', '/api/contact', '/api/health'],
  });
});

export default app;

