import React from 'react';
import ServiceCard from './ServiceCard';
import { laboratoryServices } from '../data/services';

const ServiceList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced diagnostic testing services with quick and accurate results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {laboratoryServices.map((service, index) => (
          <div
            key={service.id}
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;