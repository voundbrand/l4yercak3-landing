/**
 * Bridge between existing i18n system and PDF generation system
 * Based on requirements 7.3, 7.4
 */

import { Language } from './types';

/**
 * Detect language from various sources, prioritizing existing i18n context
 */
export function detectLanguageFromContext(
  i18nLanguage?: string,
  acceptLanguageHeader?: string,
  formLanguage?: string
): Language {
  // Priority order:
  // 1. Explicit language from form data
  if (formLanguage === 'de' || formLanguage === 'en') {
    return formLanguage;
  }
  
  // 2. Current i18n language (from existing calculator context)
  if (i18nLanguage === 'de' || i18nLanguage === 'en') {
    return i18nLanguage;
  }
  
  // 3. Accept-Language header from browser
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
  
  // 4. Default to English
  return 'en';
}

/**
 * Format currency using existing calculator logic for consistency
 * This matches the formatCurrency function in value-calculator.tsx
 */
export function formatCurrencyLikeCalculator(amount: number): string {
  // The existing calculator uses German formatting by default
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format number using existing calculator logic for consistency
 * This matches the formatNumber function in value-calculator.tsx
 */
export function formatNumberLikeCalculator(num: number): string {
  // The existing calculator uses German formatting by default
  return new Intl.NumberFormat('de-DE').format(num);
}

/**
 * Enhanced date formatting with proper German support
 */
export function formatDateEnhanced(date: Date, language: Language = 'en'): string {
  if (language === 'de') {
    // German formatting: DD.MM.YYYY
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  } else {
    // English formatting: MM/DD/YYYY
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(date);
  }
}

/**
 * Format date for PDF headers (more readable format)
 */
export function formatDateForPDF(date: Date, language: Language = 'en'): string {
  if (language === 'de') {
    // German: 28. Oktober 2025
    return new Intl.DateTimeFormat('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } else {
    // English: October 28, 2025
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }
}

/**
 * Format time for timestamps
 */
export function formatTime(date: Date, language: Language = 'en'): string {
  if (language === 'de') {
    // German: 14:30
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  } else {
    // English: 2:30 PM
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }
}

/**
 * Format percentage values with proper locale
 */
export function formatPercentageEnhanced(value: number, decimals: number = 1, language: Language = 'en'): string {
  if (language === 'de') {
    // German: 75,5 %
    return new Intl.NumberFormat('de-DE', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  } else {
    // English: 75.5%
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  }
}

/**
 * Get locale-specific decimal separator
 */
export function getDecimalSeparator(language: Language = 'en'): string {
  return language === 'de' ? ',' : '.';
}

/**
 * Get locale-specific thousands separator
 */
export function getThousandsSeparator(language: Language = 'en'): string {
  return language === 'de' ? '.' : ',';
}

/**
 * Convert number to locale-specific string representation
 */
export function numberToLocaleString(
  number: number, 
  language: Language = 'en',
  options?: Intl.NumberFormatOptions
): string {
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * Format large numbers with appropriate units (K, M, etc.)
 */
export function formatLargeNumber(number: number, language: Language = 'en'): string {
  if (number >= 1000000) {
    const millions = number / 1000000;
    return `${numberToLocaleString(millions, language, { maximumFractionDigits: 1 })}${language === 'de' ? ' Mio.' : 'M'}`;
  } else if (number >= 1000) {
    const thousands = number / 1000;
    return `${numberToLocaleString(thousands, language, { maximumFractionDigits: 1 })}${language === 'de' ? ' Tsd.' : 'K'}`;
  } else {
    return numberToLocaleString(number, language);
  }
}

/**
 * Format duration in hours to human-readable format
 */
export function formatDuration(hours: number, language: Language = 'en'): string {
  if (hours >= 8760) { // More than a year
    const years = Math.floor(hours / 8760);
    return language === 'de' 
      ? `${years} Jahr${years !== 1 ? 'e' : ''}`
      : `${years} year${years !== 1 ? 's' : ''}`;
  } else if (hours >= 168) { // More than a week
    const weeks = Math.floor(hours / 168);
    return language === 'de'
      ? `${weeks} Woche${weeks !== 1 ? 'n' : ''}`
      : `${weeks} week${weeks !== 1 ? 's' : ''}`;
  } else if (hours >= 24) { // More than a day
    const days = Math.floor(hours / 24);
    return language === 'de'
      ? `${days} Tag${days !== 1 ? 'e' : ''}`
      : `${days} day${days !== 1 ? 's' : ''}`;
  } else {
    return language === 'de'
      ? `${Math.round(hours)} Stunde${hours !== 1 ? 'n' : ''}`
      : `${Math.round(hours)} hour${hours !== 1 ? 's' : ''}`;
  }
}