import React from 'react';
import { Calendar, User, Phone, MessageSquare, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
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
import { format, parse, isValid } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

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
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<TimeOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const appointmentDate = watch('appointmentDate');
  
  // Generate available time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      selectedDate.setHours(0, 0, 0, 0); // Reset time part for proper comparison
      
      // Check for exceptions first
      const dateStr = selectedDate.toISOString().split('T')[0];
      const exception = doctor?.availability?.exceptions?.find(e => e.date === dateStr);
      
      if (exception) {
        if (exception.type === 'unavailable') {
          setAvailableSlots([]);
          setValue('appointmentTime', '');
          return;
        }
        if (exception.type === 'custom' && exception.slots) {
          const customSlots = exception.slots.flatMap(slot =>
            generateTimeSlots(slot.startTime, slot.endTime, 5, selectedDate)
          );
          setAvailableSlots(customSlots.map(slot => ({
            value: slot,
            label: format(parse(slot, 'HH:mm', new Date()), 'hh:mm a')
          })));
          return;
        }
      }
      
      // Get doctor's schedule for this day
      const dayOfWeek = DAYS_MAP[selectedDate.getDay() as keyof typeof DAYS_MAP] as keyof WeeklyAvailability;
      const daySchedule = doctor?.availability?.weekly?.[dayOfWeek] || DEFAULT_WEEKLY_AVAILABILITY[dayOfWeek];
      
      if (daySchedule?.isAvailable && daySchedule.slots?.length > 0) {
        // Generate slots based on doctor's schedule
        const allSlots = daySchedule.slots.flatMap(slot => 
          generateTimeSlots(slot.startTime, slot.endTime, 5, selectedDate)
        );
        
        // Filter out unavailable slots
        const filteredSlots = allSlots.filter(slot => 
          isTimeSlotAvailable(
            selectedDate,
            slot,
            doctor?.availability?.weekly || DEFAULT_WEEKLY_AVAILABILITY,
            doctor?.availability?.exceptions || []
          )
        );
        
        setAvailableSlots(filteredSlots.map(slot => ({
          value: slot,
          label: format(parse(slot, 'HH:mm', new Date()), 'hh:mm a')
        })));
      } else {
        setAvailableSlots([]);
        setValue('appointmentTime', '');
      }
    }
  }, [selectedDate, doctor]);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      setIsSubmitting(true);

      // Validate doctor exists
      const exists = await verifyDoctorExists(doctorId);
      if (!exists) {
        throw new Error('Selected doctor is not available');
      }
      
      const normalizedDoctorId = normalizeUUID(doctorId);

      // Validate appointment date and time
      
      // Convert appointment date/time to IST
      const appointmentDateTime = parseISTDateTime(
        data.appointmentDate,
        data.appointmentTime
      );
      
      const appointmentDateIST = toIST(appointmentDateTime);

      // Get doctor's current availability
      const { data: doctorData, error: doctorError } = await supabase
        .from('doctors')
        .select('availability')
        .eq('id', normalizedDoctorId)
        .maybeSingle();
      
      // Use local data if database fetch fails
      const availability = doctorData?.availability || doctor?.availability || {
        weekly: DEFAULT_WEEKLY_AVAILABILITY,
        exceptions: []
      }

      const isAvailable = isTimeSlotAvailable(
        appointmentDateIST,
        formatISTTime(appointmentDateIST),
        availability.weekly,
        availability.exceptions
      );

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
      setFormData(data);
      setPhoneNumber(data.phoneNumber);
      setShowOTP(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPVerified = async () => {
    if (!formData) return;

    try {
      const normalizedDoctorId = normalizeUUID(doctorId);
      const appointmentData = {
        doctor_id: normalizedDoctorId,
        patient_name: formData.patientName,
        phone_number: formData.phoneNumber,
        appointment_date: formData.appointmentDate,
        appointment_time: formData.appointmentTime,
        notes: formData.notes?.trim() || null,
        status: 'pending'
      };

      const MAX_RETRIES = 3;
      let retries = MAX_RETRIES;

      while (retries > 0) {
        const { error } = await supabase
          .from('appointments')
          .insert([appointmentData]);

        if (!error) {
          onSuccess();
          return;
        }

        if (error.code === '23503') { // Foreign key violation
          throw new Error('Selected doctor is not available. Please try again.');
        }

        console.warn(`Appointment booking attempt ${MAX_RETRIES - retries + 1} failed:`, error);
        retries--;

        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw new Error('Failed to book appointment. Please try again.');
        }
      }
    } catch (error) {
      console.error('Appointment booking failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to book appointment. Please try again later.');
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
              className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                availableSlots.length === 0 ? 'bg-gray-100' : ''
              }`}
              disabled={availableSlots.length === 0}
            >
              <option value="">Select time</option>
              {availableSlots.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {errors.appointmentTime && (
            <p className="mt-1 text-sm text-red-600">{errors.appointmentTime.message}</p>
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