import React from 'react';

interface NavbarLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative text-white hover:text-emerald-200 transition-colors duration-200 group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
    </button>
  );
};

export default NavbarLink;