import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHeading from '../components/FooterHeading';
import FooterLink from '../components/FooterLink';

const CompanySection = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'About Us', path: '/about' },
    { label: 'Our Services', path: '/services' },
    { label: 'Our Doctors', path: '/doctors' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Book Appointment', path: '/appointment' }
  ];

  return (
    <div>
      <FooterHeading>Quick Links</FooterHeading>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <FooterLink onClick={() => navigate(link.path)}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanySection;