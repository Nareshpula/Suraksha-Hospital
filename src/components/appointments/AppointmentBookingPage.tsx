import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorCard from './DoctorCard';
import AppointmentForm from './AppointmentForm';

const doctors = [
  {
    id: 'dr-swapna',
    name: 'Dr. N.SWAPNA',
    specialty: 'Paediatrics Specialist',
    qualification: 'M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)',
    experience: 'Senior Consultant',
    image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg',
    availability: 'Mon-Sat, 9:00 AM - 8:00 PM'
  },
  {
    id: 'dr-naveen',
    name: 'Dr.Bysani NAVEEN KUMAR',
    specialty: 'General Medicine, Physician & Diabetologist',
    qualification: 'M.B.B.S., M.D General Medicine',
    experience: 'Senior Consultant',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    availability: 'Mon-Sat, 9:00 AM - 8:00 PM'
  }
];

const AppointmentBookingPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };

  const handleProceed = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your preferred doctor and schedule an appointment at your convenience
          </p>
        </div>

        {!showForm ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onSelect={handleDoctorSelect}
                  isSelected={selectedDoctor === doctor.id}
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
          </>
        ) : (
          <AppointmentForm
            doctorId={selectedDoctor!}
            onBack={() => setShowForm(false)}
            onClose={() => navigate('/')}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentBookingPage;