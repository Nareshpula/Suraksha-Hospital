import { useState, useCallback } from 'react';
import { AvailabilityException, TimeSlot } from '../../../types/availability';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay, format } from 'date-fns';
import { toIST, formatISTDate, getCurrentISTDate } from '../../../utils/dateTime';

interface ExceptionScheduleProps {
  exceptions: AvailabilityException[];
  onChange: (exceptions: AvailabilityException[]) => void;
}

const ExceptionSchedule: React.FC<ExceptionScheduleProps> = ({ exceptions, onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [exceptionType, setExceptionType] = useState<'unavailable' | 'custom'>('unavailable');
  const [reason, setReason] = useState('');
  const [slots, setSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '' }]);
  const [error, setError] = useState<string | null>(null);

  const handleAddException = useCallback(() => {
    try {
      setError(null);

      if (!selectedDate) {
        throw new Error('Please select a date');
      }

      if (!reason) {
        throw new Error('Please enter a reason');
      }

      const today = getCurrentISTDate();
      const exceptionDate = startOfDay(selectedDate);
      
      if (exceptionDate < today) {
        throw new Error('Cannot add exceptions for past dates');
      }

      // Format date in IST
      const formattedDate = formatISTDate(exceptionDate);

      // Check for duplicate dates
      if (exceptions.some(e => e.date === formattedDate)) {
        throw new Error('An exception already exists for this date');
      }

      // Validate time slots if custom type
      if (exceptionType === 'custom') {
        if (!slots.every(slot => slot.startTime && slot.endTime)) {
          throw new Error('Please fill in all time slots');
        }
        
        slots.forEach(slot => {
          if (slot.startTime >= slot.endTime) {
            throw new Error('End time must be after start time');
          }
        });
      }

      const newException: AvailabilityException = {
        date: formattedDate,
        reason: reason.trim(),
        type: exceptionType,
        slots: exceptionType === 'custom' ? slots : undefined
      };

      onChange([...exceptions, newException]);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add exception');
    }
  }, [selectedDate, reason, exceptionType, slots, exceptions, onChange]);

  const handleRemoveException = (index: number) => {
    const updatedExceptions = exceptions.filter((_, i) => i !== index);
    onChange(updatedExceptions);
  };

  const resetForm = () => {
    setSelectedDate(null);
    setExceptionType('unavailable');
    setReason('');
    setSlots([{ startTime: '', endTime: '' }]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Schedule Exceptions</h2>

      <div className="space-y-6">
        {/* Add Exception Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {error && (
            <div className="md:col-span-2 text-red-600 bg-red-50 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => {
                if (date) {
                  setSelectedDate(startOfDay(date));
                } else {
                  setSelectedDate(null);
                }
                setError(null);
              }}
              className="w-full border rounded px-3 py-2"
              minDate={new Date()}
              placeholderText="Select date"
              dateFormat="MMMM d, yyyy"
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              timeZone="Asia/Kolkata"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={exceptionType}
              onChange={(e) => setExceptionType(e.target.value as 'unavailable' | 'custom')}
              className="w-full border rounded px-3 py-2"
            >
              <option value="unavailable">Unavailable</option>
              <option value="custom">Custom Hours</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Reason</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter reason for exception"
            />
          </div>

          {exceptionType === 'custom' && (
            <div className="md:col-span-2 space-y-4">
              {slots.map((slot, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => {
                      const newSlots = [...slots];
                      newSlots[index].startTime = e.target.value;
                      setSlots(newSlots);
                    }}
                    className="border rounded px-3 py-2"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => {
                      const newSlots = [...slots];
                      newSlots[index].endTime = e.target.value;
                      setSlots(newSlots);
                    }}
                    className="border rounded px-3 py-2"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              onClick={handleAddException}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Exception
            </button>
          </div>
        </div>

        {/* Exceptions List */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Current Exceptions</h3>
          <div className="space-y-4">
            {exceptions.map((exception, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">{new Date(exception.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">{exception.reason}</p>
                  {exception.type === 'custom' && exception.slots && (
                    <p className="text-sm text-gray-500">
                      Custom hours: {exception.slots.map(slot => 
                        `${slot.startTime} - ${slot.endTime}`
                      ).join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveException(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExceptionSchedule;