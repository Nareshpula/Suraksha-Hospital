import { useTranslation } from '../components/language/LanguageContext';

export const useTranslatedContent = () => {
  const { translations } = useTranslation();

  const getContent = (path: string, defaultValue: string = '') => {
    return path.split('.').reduce((obj, key) => obj?.[key], translations) || defaultValue;
  };

  const getArray = (path: string): string[] => {
    const content = getContent(path);
    return Array.isArray(content) ? content : [];
  };

  return {
    getContent,
    getArray
  };
};