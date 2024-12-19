import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface CalculatorMenuProps {
  onSelect: (type: 'due-date' | 'ovulation') => void;
}

const CalculatorMenu: React.FC<CalculatorMenuProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <button
        onClick={() => onSelect('due-date')}
        className="flex items-center space-x-2 px-6 py-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
      >
        <Calendar className="w-5 h-5 text-pink-600" />
        <span className="text-gray-800">Due Date Calculator</span>
      </button>
      
      <button
        onClick={() => onSelect('ovulation')}
        className="flex items-center space-x-2 px-6 py-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
      >
        <Clock className="w-5 h-5 text-pink-600" />
        <span className="text-gray-800">Ovulation Calculator</span>
      </button>
    </div>
  );
};

export default CalculatorMenu;