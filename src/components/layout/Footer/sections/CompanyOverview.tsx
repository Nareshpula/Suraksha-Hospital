import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHeading from '../components/FooterHeading';
import FooterLink from '../components/FooterLink';

const CompanyOverview = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Packages', path: '/packages' },
    { label: 'Corporate Partners', path: '/partners' },
    { label: 'Safety Shield', path: '/safety' },
    { label: 'Media Coverage', path: '/media' },
    { label: 'Academics', path: '/academics' },
    { label: 'Download Our App', path: '/app' }
  ];

  return (
    <div>
      <FooterHeading>Company Overview</FooterHeading>
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

export default CompanyOverview;