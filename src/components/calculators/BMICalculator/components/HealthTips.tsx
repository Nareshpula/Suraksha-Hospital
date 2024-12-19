import React from 'react';
import { Heart } from 'lucide-react';

const HealthTips = () => {
  const tips = [
    "Maintain a balanced diet rich in fruits, vegetables, and whole grains",
    "Exercise regularly - aim for at least 150 minutes of moderate activity per week",
    "Stay hydrated by drinking adequate water throughout the day",
    "Get sufficient sleep (7-9 hours) for optimal health",
    "Practice stress management through meditation or yoga",
    "Regular health check-ups and BMI monitoring"
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Heart className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-900">Tips for Maintaining Healthy BMI</h2>
      </div>

      <ul className="space-y-4">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start space-x-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthTips;