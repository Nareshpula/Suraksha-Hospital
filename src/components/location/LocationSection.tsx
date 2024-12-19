import React from 'react';
import LocationMap from './LocationMap';
import AddressCard from './AddressCard';
import { MapContainer } from './MapContainer';

const LocationSection = () => {
  return (
    <section id="location" className="py-20 bg-gradient-to-b from-white to-pink-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the heart of Madanapalle, our hospital is easily accessible and equipped with modern facilities
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
            <AddressCard />
            <MapContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;