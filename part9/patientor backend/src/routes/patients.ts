import express from 'express';

import service from '../services/patients';
import { toEntry, toPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(service.getEntries());
});

router.get('/:id', (req, res) => {
  const data = service.findById(req.params.id);
  if (data) {
    res.json(data);
  }

  res.status(404).end();
});

router.post('/', (req, res) => {
  const data = toPatient(req.body);
  const newObject = service.addPatient(data);

  res.json(newObject);
});

router.post('/:id/entries', (req, res) => {
  const data = toEntry(req.body);
  const newObject = service.addEntry(data);

  res.json(newObject);
});

export default router;
