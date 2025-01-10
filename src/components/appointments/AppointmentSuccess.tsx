import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Phone, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import OptimizedImage from '../common/OptimizedImage';

const AppointmentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointmentData = location.state?.appointmentData;

  // Redirect to home if no appointment data
  if (!appointmentData) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Animation */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 text-white text-center relative">
            <div className="absolute inset-0">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80"
                alt="Success"
                className="w-full h-full object-cover opacity-20"
                priority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/80 to-emerald-600/80" />
            </div>
            
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Appointment Confirmed!</h1>
              <p className="text-emerald-100 text-lg">
                Your appointment has been successfully scheduled
              </p>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Details</h2>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium text-gray-900">
                      {format(new Date(appointmentData.date), 'MMMM d, yyyy')} at {appointmentData.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium text-gray-900">{appointmentData.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">
                      Bysani Suraksha Speciality Hospital<br />
                      #2/259, Society Colony<br />
                      Near NTR Circle, Madanapalle-517325
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Doctor Information</h2>
                <p className="font-medium text-gray-900">{appointmentData.doctorName}</p>
                <p className="text-gray-600">
                  A confirmation SMS has been sent to your registered mobile number.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => navigate('/')}
                    className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2 group"
                  >
                    <span>Return to Home</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;