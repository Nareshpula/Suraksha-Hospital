import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHeading from '../components/FooterHeading';
import FooterLink from '../components/FooterLink';

const CalculatorsSection = () => {
  const navigate = useNavigate();

  const calculators = [
    { label: 'Due Date Calculator', path: '/calculators/due-date' },
    { label: 'BMI Calculator', path: '/calculators/bmi' },
    { label: 'Vaccination Schedule', path: '/calculators/vaccination' }
  ];

  return (
    <div>
      <FooterHeading>Health Tools</FooterHeading>
      <ul className="mt-4 space-y-2">
        {calculators.map((calc) => (
          <li key={calc.path}>
            <FooterLink onClick={() => navigate(calc.path)}>{calc.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalculatorsSection;