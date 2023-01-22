import express from 'express';

import service from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(service.getEntries());
});

router.get('/:code', (req, res) => {
  const data = service.findByCode(req.params.code);
  if (data) {
    res.json(data);
  }

  res.status(404).end();
});

export default router;
