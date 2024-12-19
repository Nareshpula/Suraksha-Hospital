import React from 'react';
import { Clock } from 'lucide-react';
import FooterHeading from '../components/FooterHeading';

const WorkingHoursSection = () => {
  return (
    <div>
      <FooterHeading>Working Hours</FooterHeading>
      <div className="mt-4 space-y-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-emerald-500 mt-1" />
          <div>
            <h4 className="text-white font-medium">Emergency Services</h4>
            <p className="text-gray-400">24/7 Available</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-emerald-500 mt-1" />
          <div>
            <h4 className="text-white font-medium">OPD Timings</h4>
            <p className="text-gray-400">Mon-Sat: 9:00 AM - 8:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursSection;