import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHeading from '../components/FooterHeading';
import FooterLink from '../components/FooterLink';

const PatientCare = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'Pregnancy Classes', path: '/classes' },
    { label: 'Educational Sessions', path: '/education' },
    { label: 'Book Vaccination', path: '/vaccination' },
    { label: 'Flu Vaccination', path: '/flu-vaccination' },
    { label: 'Patients Speak', path: '/testimonials' },
    { label: 'Delights', path: '/delights' },
    { label: 'NICU Live', path: '/nicu-live' }
  ];

  return (
    <div>
      <FooterHeading>Patient Care</FooterHeading>
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

export default PatientCare;