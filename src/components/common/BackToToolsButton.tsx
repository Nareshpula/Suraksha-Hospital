import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackToToolsButtonProps {
  className?: string;
}

const BackToToolsButton: React.FC<BackToToolsButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { state: { scrollToHealthTools: true } });
  };

  return (
    <button 
      onClick={handleClick}
      className={`group flex items-center text-white/90 hover:text-white transition-colors ${className}`}
    >
      <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
      Back to Health Tools
    </button>
  );
};

export default BackToToolsButton;