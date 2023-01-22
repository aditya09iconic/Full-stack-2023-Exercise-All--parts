import express from 'express';
import morgan from 'morgan';

import calculateBMI from './calculator/bmiCalculator';
import calculateExercise from './calculator/exerciseCalculator';


const app = express();
app.use(express.json());
app.use(morgan('tiny'));


app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height) {
    res.json({ 'error': 'malformatted parameters' });
  }

  try {
    const bmi = calculateBMI(weight, height);
    res.json({ weight, height, bmi });
  } catch (_) {
    res.json({ 'error': 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  const body = req.body;
  const daily_exercises = body.daily_exercises;
  const target = body.target;

  if (!target || !daily_exercises) {
    res.json({ 'error': 'malformatted parameters' });
  }

  try {
    res.json(calculateExercise(daily_exercises, target));
  } catch (_) {
    res.json({ 'error': 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
