import React from 'react';

interface FooterLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const FooterLink: React.FC<FooterLinkProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      {children}
    </button>
  );
};

export default FooterLink;