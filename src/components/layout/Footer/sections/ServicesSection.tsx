import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHeading from '../components/FooterHeading';
import FooterLink from '../components/FooterLink';

const ServicesSection = () => {
  const navigate = useNavigate();

  const services = [
    { label: 'Maternity Care', path: '/services/maternity' },
    { label: 'Orthopedic Surgery', path: '/services/orthopedic' },
    { label: 'Physiotherapy', path: '/services/physiotherapy' },
    { label: 'Emergency Services', path: '/services/emergency' },
    { label: 'Laboratory Services', path: '/services/laboratory' }
  ];

  return (
    <div>
      <FooterHeading>Our Services</FooterHeading>
      <ul className="mt-4 space-y-2">
        {services.map((service) => (
          <li key={service.path}>
            <FooterLink onClick={() => navigate(service.path)}>{service.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesSection;