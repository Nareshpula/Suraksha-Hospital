export const loadTranslations = async (language: string) => {
  try {
    const module = await import(`./locales/${language}.json`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load translations for ${language}`, error);
    // Fallback to English
    const fallback = await import('./locales/en.json');
    return fallback.default;
  }
};