import React from 'react';
import { Info, Check } from 'lucide-react';

const VaccinationInfo = () => {
  const tips = [
    "Keep a record of all vaccinations received",
    "Don't skip or delay scheduled vaccines",
    "Follow the recommended immunization schedule",
    "Consult your pediatrician for any concerns",
    "Be aware of possible mild side effects",
    "Bring your vaccination card to each visit"
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Info className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Important Information</h2>
      </div>

      <ul className="space-y-4">
        {tips.map((tip, index) => (
          <li 
            key={index} 
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <div className="p-1 bg-blue-100 rounded-full">
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <p className="text-sm text-gray-600">
          *Based on the Indian Academy of Pediatrics (IAP) recommended immunization schedule
        </p>
      </div>
    </div>
  );
};

export default VaccinationInfo;