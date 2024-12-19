import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHeading from '../components/FooterHeading';
import FooterLink from '../components/FooterLink';

const PregnancyCalculators = () => {
  const navigate = useNavigate();

  const calculators = [
    { label: 'Pregnancy Calculator', path: '/calculators/pregnancy' },
    { label: 'Due Date Calculator', path: '/calculators/due-date' },
    { label: 'Ovulation Calculator', path: '/calculators/ovulation' },
    { label: 'Period Calculator', path: '/calculators/period' },
    { label: 'BMI Calculator For Women', path: '/calculators/bmi' }
  ];

  return (
    <div>
      <FooterHeading>Pregnancy Calculators</FooterHeading>
      <ul className="space-y-2">
        {calculators.map((calc) => (
          <li key={calc.path}>
            <FooterLink onClick={() => navigate(calc.path)}>{calc.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PregnancyCalculators;