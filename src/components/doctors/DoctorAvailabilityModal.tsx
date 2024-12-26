import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WeeklyAvailability, AvailabilityException } from '../../types/availability';
import WeeklySchedule from './availability/WeeklySchedule';
import ExceptionSchedule from './availability/ExceptionSchedule';
import { toIST, formatISTDate, parseISTDateTime } from '../../utils/dateTime';
import { supabase } from '../../lib/supabase';
import { normalizeUUID } from '../../utils/doctorValidation';

interface DoctorAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string;
  doctorName: string;
  initialAvailability: {
    weekly: WeeklyAvailability;
    exceptions: AvailabilityException[];
  };
}

const DoctorAvailabilityModal: React.FC<DoctorAvailabilityModalProps> = ({
  isOpen,
  onClose,
  doctorId,
  doctorName,
  initialAvailability
}) => {
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklyAvailability>(initialAvailability.weekly);
  const [exceptions, setExceptions] = useState<AvailabilityException[]>(initialAvailability.exceptions);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const today = new Date();
      const todayIST = toIST(today);

      // Filter exceptions for today and future dates
      const futureExceptions = exceptions.filter(e => {
        const exceptionDate = parseISTDateTime(e.date, '00:00');
        return exceptionDate >= todayIST;
      });

      // Create announcements for exceptions
      if (futureExceptions.length > 0) {
        // Delete existing announcements
        const { error: deleteError } = await supabase
          .from('announcements')
          .delete()
          .eq('doctor_id', normalizeUUID(doctorId))
          .gte('start_date', formatISTDate(todayIST));

        if (deleteError) throw deleteError;

        // Then insert new announcements
        const { error: announcementError } = await supabase
          .from('announcements')
          .insert(
            futureExceptions.map(exception => ({
              doctor_id: normalizeUUID(doctorId),
              message: exception.reason,
              start_date: parseISTDateTime(exception.date, '00:00'),
              end_date: parseISTDateTime(exception.date, '23:59')
            }))
          );

        if (announcementError) throw announcementError;
      }

      // Update doctor's availability
      const { error } = await supabase
        .from('doctors')
        .update({ availability: { weekly: weeklySchedule, exceptions } })
        .eq('id', doctorId);

      if (error) throw error;

      // Success - close modal
      onClose();
    } catch (error) {
      console.error('Error saving availability:', JSON.stringify(error, null, 2));
      alert('Failed to save availability. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg w-full max-w-4xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Manage Availability - {doctorName}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            <WeeklySchedule
              schedule={weeklySchedule}
              onChange={setWeeklySchedule}
            />
            
            <ExceptionSchedule
              exceptions={exceptions}
              onChange={setExceptions}
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilityModal;