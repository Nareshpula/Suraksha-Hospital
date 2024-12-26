import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { doctors } from '../../data/doctors';
import { Alert } from '../common/Alert';
import DoctorCard from './DoctorCard';

const AppointmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = React.useState<string | null>(
    location.state?.selectedDoctor || null
  );
  const [error, setError] = React.useState<string | null>(
    location.state?.error || null
  );

  const handleDoctorSelect = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      // Store selected doctor in state
      setSelectedDoctor(doctorId);
      setError(null);
    } else {
      setError('Invalid doctor selection. Please try again.');
    }
  };

  const handleProceed = () => {
    if (selectedDoctor) {
      const doctor = doctors.find(d => d.id === selectedDoctor);
      navigate(`/appointments/book/${selectedDoctor}`);
    }
  };

  const clearError = () => {
    setError(null);
    // Also clear from location state
    navigate(location.pathname, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-16">
      {/* Error Alert */}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Alert 
            type="error"
            message={error}
            onClose={clearError}
          />
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-500 to-pink-600 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80"
            alt="Book Appointment"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/50 to-pink-900/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-rose-400/20 rounded-full">
              <Calendar className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Book an Appointment
          </h1>
          
          <p className="text-xl text-rose-100 max-w-3xl mx-auto text-center">
            Schedule your visit with our expert doctors
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Select a Doctor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              isSelected={selectedDoctor === doctor.id}
              onSelect={handleDoctorSelect}
            />
          ))}
        </div>

        {selectedDoctor && (
          <div className="text-center">
            <button
              onClick={handleProceed}
              className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Proceed to Book Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;