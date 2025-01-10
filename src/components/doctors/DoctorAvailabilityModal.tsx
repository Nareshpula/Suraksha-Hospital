import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { WeeklyAvailability, AvailabilityException } from '../../types/availability';
import WeeklySchedule from './availability/WeeklySchedule';
import ExceptionSchedule from './availability/ExceptionSchedule';
import { toIST, formatISTDate, parseISTDateTime, getCurrentISTDate } from '../../utils/dateTime';
import { supabase } from '../../lib/supabase';
import { normalizeUUID } from '../../utils/doctorValidation';
import { clearAvailabilityCache } from '../../utils/availability';

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
  const { user } = useAuth();
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklyAvailability>(initialAvailability.weekly);
  const [exceptions, setExceptions] = useState<AvailabilityException[]>(initialAvailability.exceptions);
  const [isSaving, setIsSaving] = useState(false);
  
  // Verify user has permission to save changes
  const canSaveChanges = user && ['admin', 'doctor', 'receptionist'].includes(user.role);
  const isOwnProfile = user?.role === 'doctor' && user?.username === `dr.${doctorName.split(' ')[1].toLowerCase()}`;
  const hasPermission = canSaveChanges && (user?.role !== 'doctor' || isOwnProfile);

  const handleSave = async () => {
    console.log('Starting save operation...');
    try {
      if (!hasPermission) {
        throw new Error('You do not have permission to modify this schedule');
      }

      setIsSaving(true);
      console.log('Current exceptions:', exceptions);
      
      // Get current date in IST
      const todayIST = getCurrentISTDate();
      console.log('Current IST date:', formatISTDate(todayIST));

      // Filter exceptions for today and future dates
      const futureExceptions = exceptions.filter(e => {
        const exceptionDate = parseISTDateTime(e.date, '00:00');
        console.log('Exception date:', e.date, 'parsed:', formatISTDate(exceptionDate));
        return exceptionDate >= todayIST;
      });
      console.log('Future exceptions:', futureExceptions);

      // Create announcements for exceptions
      if (futureExceptions.length > 0) {
        console.log('Deleting existing announcements...');
        const todayISOString = new Date().toISOString();
        console.log('Deleting announcements after:', todayISOString);

        // Delete existing announcements
        const { error: deleteError } = await supabase
          .from('announcements')
          .delete()
          .eq('doctor_id', normalizeUUID(doctorId))
          .gte('end_date', todayISOString);

        if (deleteError) {
          console.error('Error deleting announcements:', deleteError);
          throw new Error(`Failed to delete existing announcements: ${deleteError.message}`);
        }

        console.log('Creating new announcements...');
        // Then insert new announcements
        const announcementData = futureExceptions.map(exception => {
          // Create Date objects in local timezone
          const startDate = new Date(`${exception.date}T00:00:00`);
          const endDate = new Date(`${exception.date}T23:59:59`);
          
          // Convert to UTC for storage
          const startUTC = startDate.toISOString();
          const endUTC = endDate.toISOString();

          console.log('Creating announcement:', {
            date: exception.date,
            startUTC,
            endUTC
          });

          return {
            doctor_id: normalizeUUID(doctorId),
            message: exception.reason,
            start_date: startUTC,
            end_date: endUTC
          };
        });

        const { error: announcementError } = await supabase
          .from('announcements')
          .insert(announcementData);

        if (announcementError) throw announcementError;
      }

      // Update doctor's availability
      const { error } = await supabase
        .from('doctors')
        .update({ availability: { weekly: weeklySchedule, exceptions } })
        .eq('id', doctorId);

      if (error) throw error;

      // Clear availability cache for this doctor
      clearAvailabilityCache(doctorId);

      // Success - close modal
      onClose();
    } catch (error) {
      console.error('Save operation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      alert(`Failed to save availability: ${errorMessage}`);
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