/**
 * Value calculator system exports
 * Main entry point for the data bridge and calculation system
 */

// Core transformation functions
export {
  transformToLeadData,
  transformToCalculatedValues,
  transformCalculatorDataForPDF,
  validateTransformedData,
  type ExistingCalculatorInputs,
  type ExistingCalculatedValues,
  type LeadContactInfo
} from './bridge';

// Pricing intelligence
export {
  calculatePricingTiers,
  determineRecommendedPhase,
  generatePhaseJustification,
  analyzeSignatureAuthority,
  generatePricingRecommendations,
  calculatePilotPricing
} from './pricing';

// Lead scoring and sales intelligence
export {
  calculateLeadQualityScore,
  isDecisionMaker,
  generateSalesTalkingPoints,
  generateSignatureAuthorityAlert,
  generateLeadQualityAssessment
} from './lead-scoring';

// Enhanced i18n and formatting
export {
  detectLanguageFromContext,
  formatCurrencyLikeCalculator,
  formatNumberLikeCalculator,
  formatDateEnhanced,
  formatDateForPDF,
  formatTime,
  formatPercentageEnhanced,
  formatLargeNumber,
  formatDuration,
  getDecimalSeparator,
  getThousandsSeparator,
  numberToLocaleString
} from './i18n-bridge';

// Type exports
export type {
  LeadData,
  CalculatedValues,
  PricingOption,
  Language,
  LeadQualityScore,
  LocalizedContent,
  PDFStyles,
  EmailTemplate,
  EmailAttachment
} from './types';