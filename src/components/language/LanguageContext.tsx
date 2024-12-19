import React, { createContext, useContext, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface LanguageContextType {
  currentLanguage: string;
  translations: any;
  changeLanguage: (lang: string) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  translations: {},
  changeLanguage: () => {},
  isLoading: true
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentLanguage, translations, changeLanguage, isLoading } = useLanguage();

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider 
      value={{ currentLanguage, translations, changeLanguage, isLoading }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};