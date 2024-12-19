import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHeading from '../components/FooterHeading';
import FooterLink from '../components/FooterLink';

const QuickLinks = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'Find A Doctor', path: '/doctors' },
    { label: 'Book Appointment', path: '/appointment' },
    { label: 'Book Video Consultation', path: '/consultation' },
    { label: 'Book Vaccination', path: '/vaccination' },
    { label: 'Brand Collaborations', path: '/collaborations' },
    { label: '24/7 Pharmacy', path: '/pharmacy' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Sitemap', path: '/sitemap' }
  ];

  return (
    <div>
      <FooterHeading>Quick Links</FooterHeading>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <FooterLink onClick={() => navigate(link.path)}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;