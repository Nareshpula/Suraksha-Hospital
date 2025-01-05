import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Appointment {
  id: string;
  doctor_id: string;
  patient_name: string;
  phone_number: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export const useAppointments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAppointments = async (phoneNumber: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('phone_number', phoneNumber)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      return data as Appointment[];
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at' | 'status'>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .insert([{ ...appointmentData, status: 'pending' }])
        .select()
        .single();

      if (error) throw error;
      return data as Appointment;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Appointment;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointmentStatus
  };
};