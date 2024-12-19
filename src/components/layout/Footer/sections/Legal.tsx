import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHeading from '../components/FooterHeading';
import FooterLink from '../components/FooterLink';

const Legal = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'Terms and Conditions', path: '/terms' },
    { label: 'NCLT Order', path: '/nclt-order' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Online Payments Policy', path: '/payments-policy' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'Annual Returns', path: '/annual-returns' },
    { label: 'Digital Consent', path: '/digital-consent' },
    { label: 'Biomedical Waste', path: '/biomedical-waste' }
  ];

  return (
    <div>
      <FooterHeading>Legal</FooterHeading>
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

export default Legal;