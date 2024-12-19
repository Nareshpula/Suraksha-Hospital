import React from 'react';
import { useTranslation } from './LanguageContext';

interface TranslatedButtonProps {
  textPath: string;
  defaultText?: string;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const TranslatedButton: React.FC<TranslatedButtonProps> = ({
  textPath,
  defaultText = '',
  className = '',
  onClick,
  icon
}) => {
  const { translations } = useTranslation();
  const text = textPath.split('.').reduce((obj, key) => obj?.[key], translations) || defaultText;

  return (
    <button onClick={onClick} className={className}>
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default TranslatedButton;