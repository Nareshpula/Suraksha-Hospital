import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterHeading from '../components/FooterHeading';
import FooterLink from '../components/FooterLink';

const HealthToolsSection = () => {
  const navigate = useNavigate();

  const tools = [
    { label: 'Due Date Calculator', path: '/calculators/due-date' },
    { label: 'BMI Calculator', path: '/calculators/bmi' },
    { label: 'Vaccination Schedule', path: '/calculators/vaccination' }
  ];

  return (
    <div>
      <FooterHeading>Health Tools</FooterHeading>
      <ul className="space-y-2">
        {tools.map((tool) => (
          <li key={tool.path}>
            <FooterLink onClick={() => navigate(tool.path)}>
              {tool.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthToolsSection;