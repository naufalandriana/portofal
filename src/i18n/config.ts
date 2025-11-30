import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../locales/en/translation.json';
import idTranslation from '../locales/id/translation.json';

i18n
  .use(LanguageDetector) // Detect bahasa dari browser
  .use(initReactI18next) // Pass i18n instance ke react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      id: {
        translation: idTranslation
      }
    },
    fallbackLng: 'en', // Bahasa default kalau ga detect
    debug: false, // Set true kalau mau liat log di console (buat debugging)
    
    interpolation: {
      escapeValue: false // React udah aman dari XSS
    }
  });

export default i18n;
