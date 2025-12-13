import express from 'express';
import { hero, brands } from '../data/brands.js';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ hero, brands });
});

router.get('/:slug', (req, res) => {
  const brand = brands.find((b) => b.slug === req.params.slug);
  if (!brand) {
    return res.status(404).json({ error: 'Brand not found' });
  }
  return res.json(brand);
});

export default router;

