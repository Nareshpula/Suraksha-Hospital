import React from 'react';
import { Clock } from 'lucide-react';
import FooterHeading from '../components/FooterHeading';

const WorkingHours = () => {
  return (
    <div>
      <FooterHeading>Working Hours</FooterHeading>
      <div className="space-y-4 text-gray-400">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-emerald-500 mt-1" />
          <div>
            <h4 className="text-white font-medium">NICU Emergency Services</h4>
            <p>24/7 Available</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-emerald-500 mt-1" />
          <div>
            <h4 className="text-white font-medium">OPD Timings</h4>
            <p>Mon-Sat: 10:00 AM - 03:30 PM<br />
               Evening: 06:00 PM - 09:00 PM<br />
               Sun: 10:00 AM - 02:00 PM</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-emerald-500 mt-1" />
          <div>
            <h4 className="text-white font-medium">Laboratory</h4>
            <p>10:00 AM - 09:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingHours;