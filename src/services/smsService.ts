import { supabase } from '../lib/supabase';
import { formatAppointmentDateTime } from '../utils/smsValidation'; 

export const sendBookingConfirmation = async (
  phoneNumber: string,
  patientName: string,  // Changed parameter name
  appointmentDate: string,
  appointmentTime: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const formattedDateTime = formatAppointmentDateTime(appointmentDate, appointmentTime);
    if (formattedDateTime.full === 'Invalid date/time') {
      console.error('Invalid date/time format:', { appointmentDate, appointmentTime });
      return {
        success: false,
        message: 'Invalid appointment date/time format'
      };
    }

    // Send confirmation via Supabase RPC
    const { data: rpcData, error: rpcError } = await supabase
      .rpc('send_appointment_confirmation', {
        p_phone_number: phoneNumber,
        p_patient_name: patientName,  // Changed parameter name
        p_date: formattedDateTime.date,
        p_time: formattedDateTime.time
      });

    if (rpcError) {
      console.error('Error sending confirmation:', rpcError);
      return {
        success: false,
        message: 'Failed to send confirmation. Please try again.'
      };
    }
    // Handle empty response
    if (!rpcData) {
      return {
        success: true,
        message: 'Appointment confirmed successfully'
      };
    }

    return {
      success: true,
      message: 'Appointment confirmed'
    };
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send booking confirmation'
    };
  }
};