import React from 'react';
import { Award, BookOpen, Clock } from 'lucide-react';

const DoctorProfile = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1920"
              alt="Dr. Bysani Naveen Kumar"
              className="rounded-lg shadow-2xl"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Meet Our Expert
            </h2>
            <h3 className="text-2xl font-semibold text-emerald-600 mb-4">
              Dr. Bysani Naveen Kumar
            </h3>
            <p className="text-gray-600 mb-8">
              M.B.B.S., M.D., Physician & Diabetologist
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Award className="w-6 h-6 text-emerald-600" />
                <span className="text-gray-700">Senior Consultant</span>
              </div>
              <div className="flex items-center space-x-4">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                <span className="text-gray-700">20+ Years of Experience</span>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-emerald-600" />
                <span className="text-gray-700">Available Mon-Sat, 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;