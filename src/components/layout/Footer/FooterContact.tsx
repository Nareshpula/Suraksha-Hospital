import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const FooterContact = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Contact Us</h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-gray-400">
              #2/259, Societry Colony<br />
              Near NTR Circle<br />
              Madanapalle-517325<br />
              Annamayya-Rayachoty, Dist<br />
              Andhra Pradesh
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Phone className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-gray-400">
              Reception: 08571-220345<br />
              Mobile: 9666426748<br />
              Emergency: 24/7
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-gray-400">
              OPD: 9:00 AM - 8:00 PM<br />
              Lab: 9:00 AM - 9:00 PM<br />
              Emergency: 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;