import React from 'react';
import { getBMICategory, BMICategory } from '../utils/bmiCalculator';

interface BMIResultProps {
  bmi: number;
}

const categoryColors: Record<BMICategory, string> = {
  'Underweight': 'text-blue-600',
  'Normal': 'text-emerald-600',
  'Overweight': 'text-yellow-600',
  'Obese': 'text-red-600'
};

const BMIResult: React.FC<BMIResultProps> = ({ bmi }) => {
  const category = getBMICategory(bmi);
  const colorClass = categoryColors[category];

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Results</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Your BMI is:</p>
          <p className="text-3xl font-bold text-gray-900">
            {bmi.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Category:</p>
          <p className={`text-xl font-semibold ${colorClass}`}>
            {category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMIResult;