/**
 * Browser language detection utilities
 */

export type SupportedLanguage = 'en' | 'de';

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'de'];
const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

/**
 * Detect user's preferred language from browser
 */
export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  // Check localStorage first (user preference)
  const storedLanguage = localStorage.getItem('language');
  if (storedLanguage && isSupportedLanguage(storedLanguage)) {
    return storedLanguage as SupportedLanguage;
  }

  // Check browser language
  const browserLanguage = navigator.language || (navigator as any).userLanguage;
  const languageCode = browserLanguage.split('-')[0].toLowerCase();

  if (isSupportedLanguage(languageCode)) {
    return languageCode as SupportedLanguage;
  }

  // Check browser languages array (if available)
  if (navigator.languages) {
    for (const lang of navigator.languages) {
      const code = lang.split('-')[0].toLowerCase();
      if (isSupportedLanguage(code)) {
        return code as SupportedLanguage;
      }
    }
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Check if language is supported
 */
export function isSupportedLanguage(lang: string): boolean {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * Get language display name
 */
export function getLanguageDisplayName(lang: SupportedLanguage): string {
  const names: Record<SupportedLanguage, string> = {
    en: 'English',
    de: 'Deutsch',
  };
  return names[lang] || names[DEFAULT_LANGUAGE];
}

/**
 * Get language flag emoji
 */
export function getLanguageFlag(lang: SupportedLanguage): string {
  const flags: Record<SupportedLanguage, string> = {
    en: '🇺🇸',
    de: '🇩🇪',
  };
  return flags[lang] || flags[DEFAULT_LANGUAGE];
}
