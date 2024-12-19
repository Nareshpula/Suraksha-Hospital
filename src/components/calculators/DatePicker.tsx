import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string;
  onChange: (date: string) => void;
  label: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange, label }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
          required
        />
        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default DatePicker;