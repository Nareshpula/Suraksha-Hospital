import { useState, useEffect, useCallback } from 'react';
import { loadTranslations } from '../i18n/translations';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'en';
  });

  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadLanguageData = useCallback(async (lang: string) => {
    try {
      setIsLoading(true);
      const newTranslations = await loadTranslations(lang);
      
      // Add a small delay for smoother transition
      await new Promise(resolve => setTimeout(resolve, 50));
      
      setTranslations(newTranslations);
      localStorage.setItem('preferredLanguage', lang);
    } catch (error) {
      console.error('Failed to load translations:', error);
      // Fallback to English if translation fails
      if (lang !== 'en') {
        const fallbackTranslations = await loadTranslations('en');
        setTranslations(fallbackTranslations);
        setCurrentLanguage('en');
        localStorage.setItem('preferredLanguage', 'en');
      }
    } finally {
      setTimeout(() => setIsLoading(false), 100);
    }
  }, []);

  // Initialize with English on first load if no preference is set
  useEffect(() => {
    if (!localStorage.getItem('preferredLanguage')) {
      localStorage.setItem('preferredLanguage', 'en');
    }
  }, []);

  useEffect(() => {
    loadLanguageData(currentLanguage);
  }, [currentLanguage, loadLanguageData]);

  const changeLanguage = useCallback((language: string) => {
    if (language === currentLanguage) return;
    setCurrentLanguage(language);
  }, [currentLanguage]);

  return {
    currentLanguage,
    translations,
    changeLanguage,
    isLoading
  };
};