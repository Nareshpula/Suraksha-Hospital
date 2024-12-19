import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange, maxDate = new Date() }) => {
  return (
    <div className="relative">
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="MMMM d, yyyy"
        maxDate={maxDate}
        placeholderText="Select date of birth"
        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 
                   focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200
                   hover:border-gray-400"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        customInput={
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-rose-500 focus:border-rose-500 
                     transition-colors duration-200"
          />
        }
      />
      <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default DatePicker;