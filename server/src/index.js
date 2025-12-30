import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'daljeet';

// Expose resolved URI so downstream checks work even if .env missing
process.env.MONGO_URI = MONGO_URI;

async function start() {
  try {
    if (MONGO_URI) {
      await mongoose.connect(MONGO_URI, { dbName: MONGO_DB });
      console.log('Connected to MongoDB');
    } else {
      console.log('MONGO_URI not provided; starting server without database connection.');
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();

