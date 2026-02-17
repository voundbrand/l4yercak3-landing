'use client';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
// Initialize i18next instance
const i18nInstance = i18n.createInstance();

// Always init with 'en' to match server render and avoid hydration mismatch.
// LanguageProvider switches to the detected language after hydration.
i18nInstance
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: "en",
    resources: {
      en: {
        common: en,
      },
      de: {
        common: de,
      },
    },
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    // Enable language detection
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Add language change listener
i18nInstance.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("language", lng);
    document.documentElement.lang = lng;
  }
});

export default i18nInstance;