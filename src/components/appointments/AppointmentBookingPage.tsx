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
    image: 'https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Dr.N.SWAPNA.jpg?t=2024-03-20T10:00:00.000Z',
    availability: 'Mon-Sat, 9:00 AM - 8:00 PM'
  },
  {
    id: 'dr-naveen',
    name: 'Dr.Bysani NAVEEN KUMAR',
    specialty: 'General Medicine, Physician & Diabetologist',
    qualification: 'M.B.B.S., M.D General Medicine',
    experience: 'Senior Consultant',
    image: 'https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Dr.BysaniNAVEENKUMAR.jpg?t=2024-03-20T10:00:00.000Z',
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
                <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-96">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-contain bg-gray-50"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center space-x-1">
                        <DoctorCard
                          key={doctor.id}
                          doctor={doctor}
                          onSelect={handleDoctorSelect}
                          isSelected={selectedDoctor === doctor.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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