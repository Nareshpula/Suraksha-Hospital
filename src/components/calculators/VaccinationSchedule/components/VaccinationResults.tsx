import React from 'react';
import { format } from 'date-fns';
import { Shield, Clock, AlertCircle } from 'lucide-react';
import { VaccinationScheduleType } from '../types';

interface VaccinationResultsProps {
  schedule: VaccinationScheduleType[];
}

const VaccinationResults: React.FC<VaccinationResultsProps> = ({ schedule }) => {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vaccination Schedule</h3>
      
      {schedule.map((item, index) => {
        const isPast = new Date(item.dueDate) < new Date();
        const isDue = Math.abs(new Date(item.dueDate).getTime() - new Date().getTime()) < 7 * 24 * 60 * 60 * 1000;

        return (
          <div 
            key={index}
            className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${
              isPast ? 'bg-gray-50/80 border-gray-200 hover:bg-gray-50' :
              isDue ? 'bg-amber-50/80 border-amber-200 hover:bg-amber-50' :
              'bg-rose-50/80 border-rose-200 hover:bg-rose-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                {isPast ? (
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-1" />
                ) : isDue ? (
                  <Clock className="w-5 h-5 text-amber-500 mt-1" />
                ) : (
                  <Shield className="w-5 h-5 text-rose-500 mt-1" />
                )}
                <div>
                  <h4 className="font-medium text-gray-900">{item.vaccine}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className={`text-sm font-medium ${
                  isPast ? 'text-gray-600' :
                  isDue ? 'text-amber-600' :
                  'text-rose-600'
                }`}>
                  {format(new Date(item.dueDate), 'MMM dd, yyyy')}
                </p>
                <p className={`text-xs ${
                  isPast ? 'text-gray-500' :
                  isDue ? 'text-amber-500' :
                  'text-rose-500'
                }`}>
                  {isPast ? 'Past due' : isDue ? 'Due now' : 'Upcoming'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VaccinationResults;