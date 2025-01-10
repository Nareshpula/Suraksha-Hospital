import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctors } from '../../data/doctors';
import DoctorCard from './DoctorCard';

const DoctorsPage = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    navigate(`/appointments/book/${doctorId}`);
  };

  return (
    <section id="doctors" className="py-24 bg-gradient-to-b from-pink-50 to-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Expert Doctors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our team of experienced specialists dedicated to providing exceptional healthcare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: '200ms' }}
            >
              <DoctorCard
                doctor={doctor}
                onSelect={handleDoctorSelect}
                isSelected={selectedDoctor === doctor.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsPage;