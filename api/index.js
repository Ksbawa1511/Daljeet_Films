import mongoose from 'mongoose';
import app from '../server/src/app.js';

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB || 'daljeet';

let mongoConnection;

async function ensureDbConnection() {
  if (!MONGO_URI) {
    return null;
  }

  if (!mongoConnection) {
    mongoConnection = mongoose
      .connect(MONGO_URI, { dbName: MONGO_DB })
      .catch((err) => {
        // Reset on failure so future invocations can retry
        mongoConnection = undefined;
        throw err;
      });
  }

  return mongoConnection;
}

export default async function handler(req, res) {
  try {
    await ensureDbConnection();
  } catch (error) {
    console.error('Mongo connection failed', error);
    // If DB is required for the route, Express handlers will return 500; let health/static still run
  }

  return app(req, res);
}

