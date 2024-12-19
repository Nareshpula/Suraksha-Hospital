import React from 'react';
import { Heart } from 'lucide-react';
import CompanySection from './sections/CompanySection';
import ServicesSection from './sections/ServicesSection';
import HealthToolsSection from './sections/HealthToolsSection';
import ContactSection from './sections/ContactSection';
import SocialLinks from './sections/SocialLinks';
import WorkingHours from './sections/WorkingHours';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <CompanySection />
          <ServicesSection />
          <HealthToolsSection />
          <WorkingHours />
        </div>

        <ContactSection />

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <SocialLinks />
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} Bysani Suraksha Speciality Hospital.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-500" />
              <span>All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;