import React from 'react';
import { User, Star, Award, Clock } from 'lucide-react';
import { WeeklyAvailability } from '../../types/availability';

interface DoctorCardProps {
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

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSelect, isSelected }) => {
  const formatAvailability = () => {
    const days = Object.entries(doctor.availability.weekly)
      .filter(([_, value]) => value.isAvailable)
      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
      .join(', ');
    return `Available: ${days}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover transform scale-110 object-center" // Scale-110 zooms out the image slightly
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>

      {/* Details Section */}
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
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-3 text-rose-500" />
            <span>{formatAvailability()}</span>
          </div>
        </div>

        {/* Select Button */}
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
    </div>
  );
};

export default DoctorCard;
