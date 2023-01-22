interface bmiInputType {
  value1: number
  value2: number
}

const bmiParseArguments = (args: Array<string>): bmiInputType => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


const calculateBMI = (weight: number, height: number): string => {
  if (weight <= 0 || height <= 0) {
    throw new Error(`Provided values must be greater than 0!`);
  }

  const bmi = weight / height ** 2;

  let messgae;
  if (bmi < 25) {
    messgae = "Normal (healthy weight)";
  } else if (25 <= bmi && bmi <= 29) {
    messgae = "Overweight (not healthy weight)";
  } else {
    messgae = "Obese (not healthy weight)";
  }

  return messgae;
};

if (require.main === module) {
  try {
    const { value1, value2 } = bmiParseArguments(process.argv);
    const result = calculateBMI(value1, value2);
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
}

export default calculateBMI;
