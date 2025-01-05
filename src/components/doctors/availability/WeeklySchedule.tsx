import React from 'react';
import { WeeklyAvailability, TimeSlot } from '../../../types/availability';

interface WeeklyScheduleProps {
  schedule: WeeklyAvailability | null;
  onChange: (schedule: WeeklyAvailability) => void;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ schedule, onChange }) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleDayToggle = (day: keyof WeeklyAvailability) => {
    if (!schedule) return;

    const updatedSchedule = {
      ...schedule,
      [day]: {
        ...schedule[day],
        isAvailable: !schedule[day].isAvailable
      }
    };
    onChange(updatedSchedule);
  };

  const handleSlotChange = (
    day: keyof WeeklyAvailability,
    slotIndex: number,
    field: keyof TimeSlot,
    value: string
  ) => {
    if (!schedule) return;

    const updatedSlots = [...schedule[day].slots];
    updatedSlots[slotIndex] = {
      ...updatedSlots[slotIndex],
      [field]: value
    };

    const updatedSchedule = {
      ...schedule,
      [day]: {
        ...schedule[day],
        slots: updatedSlots
      }
    };
    onChange(updatedSchedule);
  };

  if (!schedule) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Weekly Schedule</h2>
      
      <div className="space-y-6">
        {days.map((day) => (
          <div key={day} className="border-b pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={schedule[day as keyof WeeklyAvailability].isAvailable}
                  onChange={() => handleDayToggle(day as keyof WeeklyAvailability)}
                  className="mr-3"
                />
                <span className="capitalize font-medium">{day}</span>
              </div>
            </div>

            {schedule[day as keyof WeeklyAvailability].isAvailable && (
              <div className="ml-8 space-y-3">
                {schedule[day as keyof WeeklyAvailability].slots.map((slot, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => handleSlotChange(
                        day as keyof WeeklyAvailability,
                        index,
                        'startTime',
                        e.target.value
                      )}
                      className="border rounded px-3 py-2"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => handleSlotChange(
                        day as keyof WeeklyAvailability,
                        index,
                        'endTime',
                        e.target.value
                      )}
                      className="border rounded px-3 py-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;