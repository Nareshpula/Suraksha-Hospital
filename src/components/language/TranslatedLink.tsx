import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from './LanguageContext';

interface TranslatedLinkProps {
  to: string;
  textPath: string;
  defaultText?: string;
  className?: string;
}

const TranslatedLink: React.FC<TranslatedLinkProps> = ({
  to,
  textPath,
  defaultText = '',
  className = ''
}) => {
  const { translations } = useTranslation();
  const text = textPath.split('.').reduce((obj, key) => obj?.[key], translations) || defaultText;

  return (
    <Link to={to} className={className}>
      {text}
    </Link>
  );
};

export default TranslatedLink;