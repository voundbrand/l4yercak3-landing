/**
 * PDF generation system exports
 * Based on requirements 6.1, 6.2, 6.4
 */

export { BasePDFTemplate } from './templates/base';
export { ValueReportGenerator } from './templates/value-report-generator';
export { ExecutiveSummaryTemplate } from './templates/page1-executive-summary';
export { TaskBreakdownTemplate } from './templates/page2-task-breakdown';
export { GrowthScenariosTemplate } from './templates/page3-growth-scenarios';
export { PilotMetricsTemplate } from './templates/page4-pilot-metrics';
export { PDF_STYLES, PDF_CONFIG, BRAND_COLORS } from './utils/styles';
export { 
  formatCurrency, 
  formatNumber, 
  formatDate, 
  formatPercentage,
  wrapText,
  hexToRgb,
  calculateROI,
  generatePDFFilename
} from './utils/helpers';
export { 
  getLocalizedContent, 
  detectLanguage, 
  EN_CONTENT, 
  DE_CONTENT 
} from './content';
export {
  generateContentReplacements,
  replaceContentPlaceholders,
  replaceContentArrayPlaceholders,
  generateTaskBreakdownData,
  generateGrowthScenarioData
} from './content/replacements';

// Re-export types
export type { 
  LeadData, 
  CalculatedValues, 
  LocalizedContent, 
  PDFStyles, 
  Language,
  LeadQualityScore,
  PricingOption,
  EmailTemplate,
  EmailAttachment
} from '../value-calculator/types';