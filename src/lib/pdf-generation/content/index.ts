/**
 * Localized content management for PDF generation
 * Based on requirements 1.5, 7.1, 7.2
 */

import { Language, LocalizedContent } from '../../value-calculator/types';
import { EN_CONTENT } from './en';
import { DE_CONTENT } from './de';

/**
 * Get localized content based on language
 */
export function getLocalizedContent(language: Language): LocalizedContent {
  switch (language) {
    case 'de':
      return DE_CONTENT;
    case 'en':
    default:
      return EN_CONTENT;
  }
}

/**
 * Detect language from various sources
 */
export function detectLanguage(
  acceptLanguageHeader?: string,
  formLanguage?: string
): Language {
  // Priority order:
  // 1. Explicit language from form data
  if (formLanguage === 'de' || formLanguage === 'en') {
    return formLanguage;
  }
  
  // 2. Accept-Language header from browser
  if (acceptLanguageHeader) {
    const languages = acceptLanguageHeader
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase());
    
    for (const lang of languages) {
      if (lang.startsWith('de')) {
        return 'de';
      }
      if (lang.startsWith('en')) {
        return 'en';
      }
    }
  }
  
  // 3. Default to English
  return 'en';
}

export { EN_CONTENT, DE_CONTENT };