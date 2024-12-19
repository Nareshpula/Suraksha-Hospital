import React from 'react';
import { User, Star, Phone, Mail, Award, BookOpen } from 'lucide-react';

interface DoctorProps {
  name: string;
  specialty: string;
  experience: string;
  education: string;
  registrationNo: string;
  image: string;
  rating: number;
  contact: {
    email: string;
    phone: string;
  };
}

const DoctorCard: React.FC<DoctorProps> = ({
  name,
  specialty,
  experience,
  education,
  registrationNo,
  image,
  rating,
  contact
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center space-x-1">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-pink-600 font-semibold mb-4">{specialty}</p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Award className="w-5 h-5 mr-3 text-purple-500" />
            <span>{experience}</span>
          </div>
          <div className="flex items-start text-gray-600">
            <BookOpen className="w-5 h-5 mr-3 text-purple-500 mt-1 flex-shrink-0" />
            <span>{education}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <User className="w-5 h-5 mr-3 text-purple-500" />
            <span>Reg. No: {registrationNo}</span>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-200">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
          >
            <Mail className="w-5 h-5 mr-3" />
            {contact.email}
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
          >
            <Phone className="w-5 h-5 mr-3" />
            {contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;