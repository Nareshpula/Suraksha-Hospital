import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const AddressCard = () => {
  const handleGetDirections = () => {
    // Using exact coordinates and place ID for Bysani Suraksha Speciality Hospital
    const coordinates = '13.56001591285874,78.49727554764979';
    const query = encodeURIComponent('Suraksha Hospital, Door No.: 2, 259, Society Colony Main Rd, Kuravanka, Society Colony, Madanapalle, Andhra Pradesh 517325, India');
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}&destination_query=${query}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-8 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
      <div className="space-y-8">
        <div className="flex items-start space-x-4">
          <MapPin className="w-6 h-6 flex-shrink-0 mt-1 animate-bounce" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Address</h3>
            <p className="text-pink-100">
              Bysani Suraksha Speciality Hospital<br />
              #2/259, Society Colony<br />
              Near NTR Circle<br />
              Madanapalle-517325<br />
              Annamayya-Rayachoty, Dist<br />
              Andhra Pradesh
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-pink-100">
              Reception: 08571-220345<br />
              Mobile: 96666426748
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
            <p className="text-pink-100">
              24/7 Emergency Services<br />
              OPD: 9:00 AM - 8:00 PM
            </p>
          </div>
        </div>

        <button
          onClick={handleGetDirections}
          className="group w-full mt-6 px-6 py-3 bg-white text-pink-600 rounded-lg transition-all duration-300 hover:bg-pink-100 hover:shadow-lg hover:scale-[1.02] active:scale-100 flex items-center justify-center space-x-2"
        >
          <Navigation className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
          <span className="font-semibold">Get Directions</span>
        </button>
      </div>
    </div>
  );
};

export default AddressCard;