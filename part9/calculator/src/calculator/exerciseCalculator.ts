interface exerciseInputType {
  value: number
  array: number[]
}

const exerciseParseArguments = (args: Array<string>): exerciseInputType => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args.slice(2).every(e => !isNaN(Number(e)))) {
    const value = Number(args[2]);
    const array = args.slice(3).map(a => Number(a));
    return { value, array };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


interface ExerciseArray {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const ratingDescriptionList = [
  'just the worst',
  'not too bad but could be better',
  'perfect'
];

const calculateExercise = (exerciseTimes: Array<number>, target: number): ExerciseArray => {
  const periodLength = exerciseTimes.length;
  const trainingDays = exerciseTimes.filter(e => e > 0).length;
  const success = exerciseTimes.every(e => e >= target);
  const successDays = exerciseTimes.filter(e => e >= target).length;
  const average = exerciseTimes.reduce((a, b) => a + b) / periodLength;

  let rating;
  if (successDays === periodLength)
    rating = 3;
  else if (successDays >= periodLength / 2)
    rating = 2;
  else
    rating = 1;

  const ratingDescription = ratingDescriptionList[rating - 1];

  return {
    periodLength,
    trainingDays,
    success,
    target,
    rating,
    ratingDescription,
    average
  };
};


if (require.main === module) {
  try {
    const { value, array } = exerciseParseArguments(process.argv);
    console.log(calculateExercise(array, value));
  } catch (e) {
    console.log(e.message);
  }
}

export default calculateExercise;
