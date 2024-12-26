import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import WeeklySchedule from './WeeklySchedule';
import ExceptionSchedule from './ExceptionSchedule';
import { WeeklyAvailability, AvailabilityException } from '../../../types/availability';

interface AvailabilityManagerProps {
  doctorId: string;
}

const AvailabilityManager: React.FC<AvailabilityManagerProps> = ({ doctorId }) => {
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklyAvailability | null>(null);
  const [exceptions, setExceptions] = useState<AvailabilityException[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAvailability();
  }, [doctorId]);

  const loadAvailability = async () => {
    try {
      const { data: doctor, error } = await supabase
        .from('doctors')
        .select('availability')
        .eq('id', doctorId)
        .single();

      if (error) throw error;

      if (doctor?.availability) {
        setWeeklySchedule(doctor.availability.weekly);
        setExceptions(doctor.availability.exceptions || []);
      }
    } catch (error) {
      console.error('Error loading availability:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAvailability = async (weekly: WeeklyAvailability, exceptions: AvailabilityException[]) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .update({
          availability: {
            weekly,
            exceptions
          }
        })
        .eq('id', doctorId);

      if (error) throw error;

      setWeeklySchedule(weekly);
      setExceptions(exceptions);
    } catch (error) {
      console.error('Error saving availability:', error);
      throw error;
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading availability...</div>;
  }

  return (
    <div className="space-y-8">
      <WeeklySchedule
        schedule={weeklySchedule}
        onChange={async (weekly) => {
          await saveAvailability(weekly, exceptions);
        }}
      />
      
      <ExceptionSchedule
        exceptions={exceptions}
        onChange={async (newExceptions) => {
          await saveAvailability(weeklySchedule!, newExceptions);
        }}
      />
    </div>
  );
};

export default AvailabilityManager;