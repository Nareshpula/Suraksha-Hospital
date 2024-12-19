import React, { useState, useEffect } from 'react';

const categories = [
  "General Medical Care",
  "Chronic Disease Management",
  "Infectious Disease Care",
  "Joint & Musculoskeletal Issues",
  "Preventive Care",
  "Diabetology Care"
];

const StickyNavigation = () => {
  const [activeSection, setActiveSection] = useState(categories[0]);

  const scrollToSection = (category: string) => {
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(category => ({
        id: category,
        element: document.getElementById(category.toLowerCase().replace(/\s+/g, '-'))
      }));

      const current = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => scrollToSection(category)}
                className={`text-sm px-4 py-2 rounded-md transition-colors w-full text-left ${
                  activeSection === category
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default StickyNavigation;