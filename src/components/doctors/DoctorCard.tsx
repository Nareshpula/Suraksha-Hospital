import React, { useState } from 'react';
import { User, Star, Award, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { WeeklyAvailability } from '../../types/availability';
import DoctorAvailabilityModal from './DoctorAvailabilityModal';

const ALLOWED_ROLES = ['admin', 'doctor', 'receptionist'];

interface DoctorProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    qualification: string;
    experience: string;
    image: string;
    availability: {
      weekly: WeeklyAvailability;
      exceptions: any[];
    };
  };
  onSelect: (doctorId: string) => void;
  isSelected: boolean;
}

const DoctorCard: React.FC<DoctorProps> = ({ doctor, onSelect, isSelected }) => {
  const [showAvailability, setShowAvailability] = useState(false);
  const { user } = useAuth();

  const canManageAvailability = user && ALLOWED_ROLES.includes(user.role);
  // For doctors, only allow managing their own availability
  const isOwnProfile = user?.role === 'doctor' && user?.username === `dr.${doctor.name.split(' ')[1].toLowerCase()}`;
  const showManageButton = canManageAvailability && (user?.role !== 'doctor' || isOwnProfile);

  const formatAvailability = () => {
    const days = Object.entries(doctor.availability.weekly)
      .filter(([_, value]) => value.isAvailable)
      .map(([day, value]) => {
        const dayName = day.charAt(0).toUpperCase() + day.slice(1);
        const slots = value.slots;
        if (slots.length > 0) {
          const firstSlot = slots[0];
          const timeRange = `${firstSlot.startTime}-${firstSlot.endTime}`;
          return `${dayName} ${timeRange}`;
        }
        return dayName;
      })
      .join(' | ');
    return days;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-96">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-contain bg-gray-50"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
        <p className="text-rose-600 font-semibold mb-4">{doctor.specialty}</p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Award className="w-5 h-5 mr-3 text-rose-500" />
            <span>{doctor.qualification}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <User className="w-5 h-5 mr-3 text-rose-500" />
            <span>{doctor.experience}</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3 text-rose-500" />
              <span>{formatAvailability()}</span>
            </div>
            {showManageButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAvailability(true);
                }}
                className="text-sm text-rose-600 hover:text-rose-700 transition-colors"
              >
                Manage
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => onSelect(doctor.id)}
          className={`w-full py-3 rounded-lg transition-colors duration-300 ${
            isSelected
              ? 'bg-rose-600 text-white hover:bg-rose-700'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'Doctor Selected' : 'Select Doctor'}
        </button>
      </div>
      
      <DoctorAvailabilityModal
        isOpen={showAvailability}
        onClose={() => setShowAvailability(false)}
        doctorId={doctor.id}
        doctorName={doctor.name}
        initialAvailability={doctor.availability}
      />
    </div>
  );
};

export default DoctorCard;