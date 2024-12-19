import React from 'react';
import LocationMap from './LocationMap';

export const MapContainer = () => {
  return (
    <div className="lg:col-span-2 relative min-h-[400px] lg:min-h-full rounded-lg overflow-hidden">
      <LocationMap />
    </div>
  );
};