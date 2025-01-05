import React, { useState } from 'react';
import DoctorCard from './DoctorCard';
import { useNavigate } from 'react-router-dom';

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

const DoctorSelection = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };

  const handleProceed = () => {
    if (selectedDoctor) {
      navigate(`/appointments/book/${selectedDoctor}`);
    }
  };

  return (
    <div>
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
  );
};

export default DoctorSelection;