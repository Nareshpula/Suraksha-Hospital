export type BMICategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export const calculateBMI = (heightCm: number, weightKg: number): number => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

export const getBMICategory = (bmi: number): BMICategory => {
  // Using Indian BMI standards
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 23) return 'Normal';
  if (bmi < 25) return 'Overweight';
  return 'Obese';
};