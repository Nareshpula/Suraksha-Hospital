import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
        <div>
          <h4 className="text-white font-medium mb-2">Location</h4>
          <p className="text-gray-400">
            Suraksha Hospital #2/259, Societry Colony<br />
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
          <h4 className="text-white font-medium mb-2">Contact Numbers</h4>
          <p className="text-gray-400">
            Reception: 08571-220345<br />
            Mobile: 96666426748<br />
            NICU Emergency: 24/7
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <Mail className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
        <div>
          <h4 className="text-white font-medium mb-2">Email</h4>
          <p className="text-gray-400">
            info@bysanisuraksha.com<br />
            support@bysanisuraksha.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;