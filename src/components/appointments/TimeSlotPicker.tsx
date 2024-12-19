import React from 'react';
import { Clock } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';
import { AppointmentFormData } from '../../types/appointment';

interface TimeSlotPickerProps {
  register: UseFormRegister<AppointmentFormData>;
  error?: string;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ register, error }) => {
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 20; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      slots.push(time);
    }
    return slots;
  };

  return (
    <div className="relative">
      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      <select
        {...register('time', { required: 'Please select a time slot' })}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
      >
        <option value="">Select a time slot</option>
        {generateTimeSlots().map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSlotPicker;