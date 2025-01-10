import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Phone, MessageSquare, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format, parse, addMinutes } from 'date-fns';
import { supabase } from '../../lib/supabase';
import { sendBookingConfirmation } from '../../services/smsService';
import { formatAppointmentDateTime } from '../../utils/smsValidation';
import { DAYS_MAP, DEFAULT_WEEKLY_AVAILABILITY } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import { WeeklyAvailability } from '../../types/availability';
import { verifyDoctorExists, normalizeUUID, isValidUUID } from '../../utils/doctorValidation';
import { generateTimeSlots } from '../../utils/timeSlots';
import { isTimeSlotAvailable } from '../../utils/availability';
import OTPVerification from './OTPVerification';
import { Alert } from '../common/Alert'; 
import { createOTPVerification } from '../../services/otpService';
import { toIST, formatISTDate, formatISTTime, parseISTDateTime } from '../../utils/dateTime';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DEBUG = import.meta.env.VITE_DEV_MODE === 'true';

// Configure DatePicker popper props
const popperConfig = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8]
      }
    },
    {
      name: "preventOverflow",
      options: {
        boundary: "viewport"
      }
    }
  ],
  strategy: "fixed"
};

interface TimeOption {
  value: string;
  label: string;
}

interface BookingFormProps {
  doctorId: string;
  doctor: any;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  patientName: string;
  phoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ doctorId, doctor, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, setValue, trigger } = useForm<FormData>({
    defaultValues: {
      patientName: '',
      phoneNumber: '',
      appointmentDate: '',
      appointmentTime: '',
      notes: ''
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<TimeOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const appointmentDate = watch('appointmentDate');
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // Initialize with today's date
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    setValue('appointmentDate', today.toISOString().split('T')[0]);
  }, [setValue]);
  
  // Generate time slots when date changes
  useEffect(() => {
    const generateSlots = async () => {
      if (!selectedDate || !doctor?.availability) {
        setAvailableSlots([]);
        return;
      }

      try {
        setIsLoadingSlots(true);
        setSlotsError(null);

        const istDate = toIST(selectedDate);

        // Get day's schedule
        const dayName = DAYS_MAP[istDate.getDay() as keyof typeof DAYS_MAP] as keyof WeeklyAvailability;
        const schedule = doctor?.availability?.weekly?.[dayName] || DEFAULT_WEEKLY_AVAILABILITY[dayName];

        if (DEBUG) {
          console.log('Checking schedule for:', dayName);
          console.log('Schedule:', schedule);
        }

        // Get current availability
        const currentAvailability = doctor?.availability || {
          weekly: DEFAULT_WEEKLY_AVAILABILITY,
          exceptions: []
        };

        if (!schedule.isAvailable) {
          if (DEBUG) console.log('Day not available');
          setAvailableSlots([]);
          setSlotsError('No appointments available on this day');
          return;
        }

        // Generate slots based on schedule
        const timeSlots = generateTimeSlots(5, istDate, schedule);

        if (!timeSlots?.length) {
          if (DEBUG) console.log('No time slots generated');
          setAvailableSlots([]);
          setSlotsError('No available slots for this date');
          return;
        }

        // Filter available slots
        const availableTimeSlots = await Promise.all(
          timeSlots.map(async slot => {
            const isAvailable = await isTimeSlotAvailable(
              istDate,
              slot.value,
              doctorId,
              currentAvailability.weekly || DEFAULT_WEEKLY_AVAILABILITY,
              currentAvailability.exceptions || []
            );
            return { slot, isAvailable };
          })
        );

        const validSlots = availableTimeSlots
          .filter(({ isAvailable }) => isAvailable)
          .map(({ slot }) => ({
            value: slot.value,
            label: format(parse(slot.value, 'HH:mm', new Date()), 'hh:mm a')
          }));

        if (DEBUG) console.log('Generated slots:', validSlots);

        setAvailableSlots(validSlots);
      } catch (err) {
        console.error('Error generating time slots:', err);
        setAvailableSlots([]);
        setSlotsError('Failed to load time slots. Please try again.');
      } finally {
        setIsLoadingSlots(false);
      }
    };
    
    generateSlots();
  }, [selectedDate, doctor, doctorId]);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      setIsSubmitting(true);
      
      // Validate date and time
      if (!selectedDate) {
        throw new Error('Please select an appointment date');
      }

      // Convert selected date to IST
      const istDate = toIST(selectedDate);
      
      if (!data.appointmentTime) {
        throw new Error('Please select an appointment time');
      }

      // Format date in YYYY-MM-DD format
      const formattedDate = format(istDate, 'yyyy-MM-dd');
      
      // Keep time as is since it's already in HH:mm format
      const formattedTime = data.appointmentTime;
      
      if (!doctorId) {
        throw new Error('Doctor ID is required');
      }

      // Validate doctor exists
      const exists = await verifyDoctorExists(doctorId);
      if (!exists) {
        throw new Error('Selected doctor is not available');
      }
      
      const normalizedDoctorId = normalizeUUID(doctorId);

      // Get doctor's current availability
      const { data: doctorData, error: doctorError } = await supabase
        .from('doctors')
        .select('availability')
        .eq('id', normalizedDoctorId)
        .maybeSingle();
      
      if (doctorError) {
        console.error('Error fetching doctor availability:', doctorError);
        throw new Error('Failed to check doctor availability');
      }
      
      // Use local data if database fetch fails
      const availability = doctorData?.availability || doctor?.availability || {
        weekly: DEFAULT_WEEKLY_AVAILABILITY,
        exceptions: []
      }
      console.log('Doctor availability:', availability);

      const isAvailable = await isTimeSlotAvailable(
        istDate,
        data.appointmentTime,
        normalizedDoctorId,
        availability.weekly,
        availability.exceptions
      );
      console.log('Time slot availability check result:', isAvailable);

      if (!isAvailable) {
        throw new Error('Selected time slot is not available. Please choose another time.');
      }
      
      // Validate phone number format
      if (!/^[6-9]\d{9}$/.test(data.phoneNumber)) {
        throw new Error('Please enter a valid 10-digit Indian phone number');
      }

      // Create OTP verification
      const otpCreated = await createOTPVerification(data.phoneNumber.trim());
      if (!otpCreated) {
        throw new Error('Failed to send OTP. Please try again.');
      }

      // Store form data and trigger OTP verification
      setFormData({
        doctor_id: normalizedDoctorId,
        patient_name: data.patientName,
        phone_number: data.phoneNumber,
        appointment_date: formattedDate,
        appointment_time: formattedTime,
        notes: data.notes?.trim() || null,
        status: 'confirmed'
      });
      setPhoneNumber(data.phoneNumber);
      setShowOTP(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPVerified = async () => {
    if (!formData) return;

    try {
      setIsSubmitting(true);
      setError(null);
      
      // Validate date and time formats
      if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.appointment_date)) {
        throw new Error('Invalid appointment date format');
      }
      
      if (!/^\d{2}:\d{2}$/.test(formData.appointment_time)) {
        throw new Error('Invalid appointment time format');
      }

      // Insert appointment
      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert([{
          ...formData,
          status: 'confirmed'
        }]);

      if (appointmentError) {
        // Check for duplicate appointment
        if (appointmentError.code === '23505') {
          throw new Error('This time slot has already been booked. Please select another time.');
        }
        console.error('Appointment booking error:', appointmentError);
        throw new Error('Failed to book appointment. Please try again.');
      }

      // Update doctor's availability cache
      const { error: availabilityError } = await supabase
        .from('doctors')
        .update({
          last_appointment: new Date().toISOString()
        })
        .eq('id', formData.doctor_id);

      if (availabilityError) {
        console.error('Failed to update doctor availability:', availabilityError);
      }
      // Send booking confirmation SMS
      const confirmationResult = await sendBookingConfirmation(
        formData.phone_number,
        formData.patient_name,  // Use patient name instead of doctor name
        formData.appointment_date,
        formData.appointment_time
      );
      
      if (!confirmationResult.success) {
        throw new Error(confirmationResult.message);
      }
      
      // Navigate to success page with appointment details
      navigate('/appointment-success', { 
        state: { 
          appointmentData: {
            doctorName: doctor.name,
            patientName: formData.patient_name,
            date: formData.appointment_date,
            time: formData.appointment_time,
            phoneNumber: formData.phone_number
          }
        },
        replace: true
      });
    } catch (error) {
      console.error('Appointment booking failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showOTP) {
    return (
      <OTPVerification
        phoneNumber={phoneNumber}
        onVerified={handleOTPVerified}
        onBack={() => setShowOTP(false)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            {...register('patientName', { required: 'Name is required' })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Enter your full name"
          />
        </div>
        {errors.patientName && (
          <p className="mt-1 text-sm text-red-600">{errors.patientName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Please enter a valid 10-digit Indian phone number'
              }
            })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Enter your phone number"
          />
        </div>
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (!date) return;
                date.setHours(0, 0, 0, 0);
                setSelectedDate(date);
                setValue('appointmentDate', date.toISOString().split('T')[0]);
              }}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white"
              calendarClassName="date-picker-calendar"
              popperProps={popperConfig}
              placeholderText="Select appointment date"
              required
              showPopperArrow={false}
              popperClassName="date-picker-popper"
              popperPlacement="bottom-start"
              shouldCloseOnSelect={true}
              onFocus={(e) => e.target.readOnly = true}
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          {errors.appointmentDate && (
            <p className="mt-1 text-sm text-red-600">{errors.appointmentDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              {...register('appointmentTime', { required: 'Time is required' })}
              className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                isLoadingSlots ? 'bg-gray-100' : ''
              }`}
              disabled={isLoadingSlots}
            >
              <option value="">{isLoadingSlots ? 'Loading slots...' : 'Select time'}</option>
              {availableSlots.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {slotsError && (
            <p className="text-sm text-red-600 mt-1">{slotsError}</p>
          )}
          {errors.appointmentTime && (
            <p className="text-sm text-red-600 mt-1">{errors.appointmentTime.message}</p>
          )}
          {availableSlots.length === 0 && !isLoadingSlots && !slotsError && (
            <p className="text-sm text-gray-500 mt-1">No available slots for this date</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes (Optional)
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          <textarea
            {...register('notes')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 min-h-[100px]"
            placeholder="Any specific concerns or requirements..."
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book Appointment
        </button>
      </div>
    </form>
  );
}

export default BookingForm;