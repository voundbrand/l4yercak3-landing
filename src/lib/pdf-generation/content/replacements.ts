/**
 * Content replacement system for dynamic PDF values
 * Based on requirements 1.5, 7.1, 7.2
 */

import { LeadData, CalculatedValues, Language } from '../../value-calculator/types';
import { formatCurrencyLikeCalculator, formatNumberLikeCalculator, formatDateForPDF } from '../../value-calculator/i18n-bridge';

// Create language-aware wrapper functions
const formatCurrency = (amount: number, language?: string) => formatCurrencyLikeCalculator(amount);
const formatNumber = (num: number, language?: string) => formatNumberLikeCalculator(num);

/**
 * Replacement tokens that can be used in content templates
 */
export interface ContentReplacements {
  // Organization info
  organizationName: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  
  // Formatted values
  totalValueCreated: string;
  annualWaste: string;
  potentialFreedHours: string;
  laborCostAvoided: string;
  newRevenuePotential: string;
  
  // Formatted dates
  currentDate: string;
  
  // Pricing (redacted for customer PDF)
  pricingRedacted: string;
  
  // Task breakdown
  eventCoordinationHours: string;
  memberCommunicationHours: string;
  complianceReportingHours: string;
  financialAdminHours: string;
  dataManagementHours: string;
  
  // Automation percentages
  eventAutomationPercent: string;
  memberCommAutomationPercent: string;
  complianceAutomationPercent: string;
  financialAutomationPercent: string;
  dataAutomationPercent: string;
}

/**
 * Generate replacement values for content templates
 */
export function generateContentReplacements(
  leadData: LeadData,
  calculatedValues: CalculatedValues,
  language: Language
): ContentReplacements {
  const currentDate = new Date();
  
  return {
    // Organization info
    organizationName: leadData.organizationName,
    contactName: leadData.fullName.split(' ')[0], // First name only
    contactTitle: leadData.jobTitle,
    contactEmail: leadData.email,
    
    // Formatted values
    totalValueCreated: formatCurrency(calculatedValues.totalValueCreated, language),
    annualWaste: formatCurrency(calculatedValues.annualWaste, language),
    potentialFreedHours: formatNumber(calculatedValues.potentialFreedHours, language),
    laborCostAvoided: formatCurrency(calculatedValues.laborCostAvoided, language),
    newRevenuePotential: formatCurrency(calculatedValues.newRevenuePotential, language),
    
    // Formatted dates
    currentDate: formatDateForPDF(currentDate, language),
    
    // Pricing (always redacted for customer PDF)
    pricingRedacted: language === 'de' 
      ? 'Preisdetails verfügbar während des Beratungsgesprächs'
      : 'Pricing details available during consultation call',
    
    // Task breakdown hours (calculated from percentages)
    eventCoordinationHours: formatNumber(Math.round(calculatedValues.totalAnnualHours * 0.256), language),
    memberCommunicationHours: formatNumber(Math.round(calculatedValues.totalAnnualHours * 0.192), language),
    complianceReportingHours: formatNumber(Math.round(calculatedValues.totalAnnualHours * 0.167), language),
    financialAdminHours: formatNumber(Math.round(calculatedValues.totalAnnualHours * 0.167), language),
    dataManagementHours: formatNumber(Math.round(calculatedValues.totalAnnualHours * 0.218), language),
    
    // Automation percentages
    eventAutomationPercent: '90%',
    memberCommAutomationPercent: '85%',
    complianceAutomationPercent: '95%',
    financialAutomationPercent: '90%',
    dataAutomationPercent: '95%',
  };
}

/**
 * Replace placeholders in content strings
 */
export function replaceContentPlaceholders(
  content: string,
  replacements: ContentReplacements
): string {
  let result = content;
  
  // Replace all placeholders with format {{key}}
  Object.entries(replacements).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    result = result.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return result;
}

/**
 * Replace placeholders in an array of content strings
 */
export function replaceContentArrayPlaceholders(
  contentArray: string[],
  replacements: ContentReplacements
): string[] {
  return contentArray.map(content => replaceContentPlaceholders(content, replacements));
}

/**
 * Generate task breakdown data for tables
 */
export function generateTaskBreakdownData(
  calculatedValues: CalculatedValues,
  language: Language
): Array<{
  category: string;
  currentHours: string;
  automationPotential: string;
  hoursFreed: string;
  costSavings: string;
}> {
  const categories = [
    {
      key: 'eventCoordination',
      nameEn: 'Event Coordination & Management',
      nameDe: 'Veranstaltungskoordination & -management',
      percentage: 0.256,
      automation: 90
    },
    {
      key: 'memberCommunication',
      nameEn: 'Member Communication & Outreach',
      nameDe: 'Mitgliederkommunikation & Outreach',
      percentage: 0.192,
      automation: 85
    },
    {
      key: 'complianceReporting',
      nameEn: 'Compliance & Reporting',
      nameDe: 'Compliance & Berichtswesen',
      percentage: 0.167,
      automation: 95
    },
    {
      key: 'financialAdmin',
      nameEn: 'Financial Administration',
      nameDe: 'Finanzverwaltung',
      percentage: 0.167,
      automation: 90
    },
    {
      key: 'dataManagement',
      nameEn: 'Data Entry & Management',
      nameDe: 'Dateneingabe & -verwaltung',
      percentage: 0.218,
      automation: 95
    }
  ];

  return categories.map(category => {
    const currentHours = Math.round(calculatedValues.totalAnnualHours * category.percentage);
    const hoursFreed = Math.round(currentHours * (category.automation / 100));
    const avgLaborCost = calculatedValues.laborCostAvoided / calculatedValues.potentialFreedHours;
    const costSavings = hoursFreed * avgLaborCost;

    return {
      category: language === 'de' ? category.nameDe : category.nameEn,
      currentHours: formatNumber(currentHours, language),
      automationPotential: `${category.automation}%`,
      hoursFreed: formatNumber(hoursFreed, language),
      costSavings: formatCurrency(costSavings, language)
    };
  });
}

/**
 * Generate growth scenario data
 */
export function generateGrowthScenarioData(
  calculatedValues: CalculatedValues,
  language: Language
): {
  memberAcquisition: { hours: string; newMembers: string; revenue: string };
  programDevelopment: { description: string; revenue: string };
  partnerships: { description: string; revenue: string };
  retention: { description: string; revenue: string };
  total: { conservative: string; optimistic: string };
} {
  // Calculate member acquisition potential
  const productiveHours = calculatedValues.potentialFreedHours * 0.5; // 50% utilization
  const hoursPerNewMember = 10;
  const conversionRate = 0.30;
  const newMembersAcquired = Math.floor((productiveHours / hoursPerNewMember) * conversionRate);
  
  // Revenue calculations (these should match the existing calculator logic)
  const memberRevenue = newMembersAcquired * 500; // Assuming €500 avg member value
  const programRevenue = 15000;
  const partnershipRevenue = 20000;
  const retentionRevenue = 2500; // 5 members retained at €500 each
  
  const conservativeTotal = memberRevenue + programRevenue + partnershipRevenue + retentionRevenue;
  const optimisticTotal = Math.round(conservativeTotal * 1.5); // 50% higher with better execution

  return {
    memberAcquisition: {
      hours: formatNumber(Math.round(productiveHours * 0.6), language), // 60% of productive hours for acquisition
      newMembers: formatNumber(newMembersAcquired, language),
      revenue: formatCurrency(memberRevenue, language)
    },
    programDevelopment: {
      description: language === 'de' ? '2-3 neue Premium-Programme' : '2-3 new premium programs',
      revenue: formatCurrency(programRevenue, language)
    },
    partnerships: {
      description: language === 'de' ? '2 Unternehmenspartnerschaften' : '2 corporate sponsorships',
      revenue: formatCurrency(partnershipRevenue, language)
    },
    retention: {
      description: language === 'de' ? '5% Churn-Reduktion' : '5% churn reduction',
      revenue: formatCurrency(retentionRevenue, language)
    },
    total: {
      conservative: formatCurrency(conservativeTotal, language),
      optimistic: formatCurrency(optimisticTotal, language)
    }
  };
}