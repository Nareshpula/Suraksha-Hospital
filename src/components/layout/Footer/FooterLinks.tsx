import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FooterLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollToSection: path.substring(1) } });
      } else {
        const element = document.getElementById(path.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
    }
  };

  const links = [
    {
      title: 'Quick Links',
      items: [
        { label: 'Book Appointment', path: '/appointments' },
        { label: 'Our Services', path: '#services' },
        { label: 'Our Doctors', path: '/doctors' },
        { label: 'Emergency Services', path: '/services/emergency' }
      ]
    },
    {
      title: 'Health Tools',
      items: [
        { label: 'Due Date Calculator', path: '/calculators/due-date' },
        { label: 'BMI Calculator', path: '/calculators/bmi' },
        { label: 'Vaccination Schedule', path: '/calculators/vaccination' }
      ]
    }
  ];

  return (
    <>
      {links.map((section) => (
        <div key={section.title} className="space-y-4">
          <h3 className="text-lg font-semibold">{section.title}</h3>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default FooterLinks;