import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { vaccineSchedule } from '../data/vaccineSchedule';

const VaccinationSchedule = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Standard Schedule</h2>
      </div>
      
      <div className="space-y-4">
        {vaccineSchedule.map((item, index) => (
          <div 
            key={index} 
            className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-2 mb-2">
              <ChevronRight className="w-4 h-4 text-blue-500" />
              <h3 className="font-medium text-blue-900">{item.age}</h3>
            </div>
            <div className="space-y-2 pl-6">
              {item.vaccines.map((vaccine, vIndex) => (
                <div key={vIndex} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{vaccine}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaccinationSchedule;