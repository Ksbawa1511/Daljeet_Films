import express from 'express';
import ContactRequest from '../models/ContactRequest.js';
import { brands } from '../data/brands.js';

const router = express.Router();
const fallbackStore = [];

router.post('/', async (req, res) => {
  const { name, email, phone, service, message } = req.body || {};

  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const validService = brands.some((b) => b.name === service || b.slug === service);
  if (!validService) {
    return res.status(400).json({ error: 'Unknown service selection.' });
  }

  try {
    if (process.env.MONGO_URI) {
      const doc = await ContactRequest.create({ name, email, phone, service, message });
      return res.status(201).json({ status: 'saved', id: doc.id });
    }

    const entry = {
      id: `local-${fallbackStore.length + 1}`,
      name,
      email,
      phone,
      service,
      message,
      createdAt: new Date().toISOString(),
    };
    fallbackStore.push(entry);
    return res.status(201).json({ status: 'queued', id: entry.id });
  } catch (error) {
    console.error('Failed to save contact request', error);
    return res.status(500).json({ error: 'Failed to save request' });
  }
});

export default router;


