import { isTimeSlotAvailable } from '../../utils/availability';
import { generateTimeSlots } from '../../utils/timeSlots';

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  doctor: any;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange, doctor }) => {
  const isDateAvailable = (date: Date) => {
    // Check if any time slot is available for this date
    const slots = generateTimeSlots('10:00', '15:30', 5);
    return slots.some(slot => 
      isTimeSlotAvailable(date, slot, doctor.availability.weekly, doctor.availability.exceptions || [])
    );
  };

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      minDate={new Date()}
      className="w-full px-4 py-2 border rounded-lg"
      dayClassName={date =>
        !isDateAvailable(date) ? "text-gray-300 cursor-not-allowed" : undefined
      }
      filterDate={isDateAvailable}
    />
  );
};