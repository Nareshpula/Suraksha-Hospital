import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const FooterSocial = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/bysanisuraksha', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/bysanisuraksha', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/bysanisuraksha', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/bysanisuraksha', label: 'Youtube' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Connect With Us</h3>
      <div className="flex space-x-4">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label={link.label}
            >
              <Icon className="w-6 h-6" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FooterSocial;