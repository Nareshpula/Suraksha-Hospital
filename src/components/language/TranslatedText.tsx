import React from 'react';
import { useTranslation } from './LanguageContext';

interface TranslatedTextProps {
  path: string;
  defaultText?: string;
  className?: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ path, defaultText = '', className = '' }) => {
  const { translations } = useTranslation();
  const text = path.split('.').reduce((obj, key) => obj?.[key], translations) || defaultText;

  return <span className={className}>{text}</span>;
};

export default TranslatedText;