import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { useAppointments } from '../../hooks/useAppointments';
import { format } from 'date-fns';

interface AppointmentListProps {
  phoneNumber: string;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ phoneNumber }) => {
  const { loading, error, fetchAppointments } = useAppointments();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const data = await fetchAppointments(phoneNumber);
      setAppointments(data);
    };

    loadAppointments();
  }, [phoneNumber]);

  if (loading) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-4">Error loading appointments: {error.message}</div>;
  }

  if (!appointments.length) {
    return <div className="text-gray-600 py-4">No appointments found.</div>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div 
          key={appointment.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-rose-500" />
              <span className="font-medium">
                {format(new Date(appointment.appointment_date), 'MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-rose-500" />
              <span>{appointment.appointment_time}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <User className="w-5 h-5" />
            <span>{appointment.patient_name}</span>
          </div>

          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
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