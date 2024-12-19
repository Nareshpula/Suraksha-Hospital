import React from 'react';

interface FooterHeadingProps {
  children: React.ReactNode;
}

const FooterHeading: React.FC<FooterHeadingProps> = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold text-white mb-4">
      {children}
    </h3>
  );
};

export default FooterHeading;