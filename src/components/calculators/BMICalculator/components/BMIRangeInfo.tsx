import React from 'react';
import { Activity } from 'lucide-react';

const BMIRangeInfo = () => {
  const ranges = [
    { category: 'Underweight', range: '< 18.5', color: 'bg-blue-100 text-blue-800' },
    { category: 'Normal', range: '18.5 - 22.9', color: 'bg-emerald-100 text-emerald-800' },
    { category: 'Overweight', range: '23 - 24.9', color: 'bg-yellow-100 text-yellow-800' },
    { category: 'Obese', range: '≥ 25', color: 'bg-red-100 text-red-800' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-900">BMI Categories (Indian Standards)</h2>
      </div>
      
      <div className="space-y-4">
        {ranges.map((item, index) => (
          <div key={index} className={`p-4 rounded-lg ${item.color}`}>
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.category}</span>
              <span className="font-semibold">{item.range}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-600">
        *Based on the revised guidelines for Indian population by the Indian Council of Medical Research (ICMR)
      </p>
    </div>
  );
};

export default BMIRangeInfo;