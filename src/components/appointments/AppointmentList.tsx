import React from 'react';
import { Calendar, Clock, User, Phone } from 'lucide-react';
import { format, parse, isValid } from 'date-fns';

interface Appointment {
  id: string;
  patient_name: string;
  phone_number: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  doctor?: {
    name: string;
  };
}

interface AppointmentListProps {
  appointments: Appointment[];
}

const formatTime = (timeStr: string): string => {
  try {
    const parsedTime = parse(timeStr, 'HH:mm', new Date());
    return isValid(parsedTime) ? format(parsedTime, 'hh:mm a') : timeStr;
  } catch (err) {
    console.warn('Error formatting time:', err);
    return timeStr;
  }
};

const formatDate = (dateStr: string): string => {
  try {
    const parsedDate = new Date(dateStr);
    return isValid(parsedDate) ? format(parsedDate, 'MMMM d, yyyy') : dateStr;
  } catch (err) {
    console.warn('Error formatting date:', err);
    return dateStr;
  }
};

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div 
          key={appointment.id}
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fade-in border border-orange-100 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-gray-900">
                {formatDate(appointment.appointment_date)}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700">{formatTime(appointment.appointment_time)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-orange-500" />
              <div>
                <span className="text-sm text-gray-500">Patient Name</span>
                <p className="font-medium text-gray-900">{appointment.patient_name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-orange-500" />
              <div>
                <span className="text-sm text-gray-500">Phone Number</span>
                <p className="font-medium text-gray-900">{appointment.phone_number}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Doctor:</span>
              <span className="font-medium text-gray-900">
                {appointment.doctor?.name || 'Unknown Doctor'}
              </span>
            </div>

            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}
            >
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;