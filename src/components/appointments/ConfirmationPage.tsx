import React from 'react';
import { Calendar, User, Phone, Mail, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Doctor } from '../../types/doctor';
import { AppointmentFormData } from '../../types/appointment';

interface ConfirmationPageProps {
  doctor: Doctor;
  appointment: AppointmentFormData;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ doctor, appointment }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Appointment Confirmed!
        </h2>
        <p className="text-gray-600">
          Your appointment has been successfully scheduled
        </p>
      </div>

      <div className="border-t border-b border-gray-200 py-8 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Doctor Details
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <p className="font-semibold text-gray-900">{doctor.name}</p>
              <p className="text-gray-600">{doctor.specialty}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Appointment Details
        </h3>
        
        <div className="flex items-center text-gray-600">
          <User className="w-5 h-5 mr-3" />
          <span>{appointment.name}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Phone className="w-5 h-5 mr-3" />
          <span>{appointment.phone}</span>
        </div>
        
        {appointment.email && (
          <div className="flex items-center text-gray-600">
            <Mail className="w-5 h-5 mr-3" />
            <span>{appointment.email}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-3" />
          <span>{format(new Date(appointment.date), 'MMMM d, yyyy')}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-3" />
          <span>{appointment.time}</span>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm">
          A confirmation SMS has been sent to your phone number. Please save this
          information for your records.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;