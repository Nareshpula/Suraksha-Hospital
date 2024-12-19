import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const SocialLinks = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/saiprashanthi' },
    { icon: Twitter, href: 'https://twitter.com/saiprashanthi' },
    { icon: Instagram, href: 'https://instagram.com/saiprashanthi' },
    { icon: Youtube, href: 'https://youtube.com/saiprashanthi' }
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Icon className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;