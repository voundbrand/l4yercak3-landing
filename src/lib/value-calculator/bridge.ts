/**
 * Data bridge between existing value calculator and PDF system
 * Transforms existing calculator data to PDF-compatible format
 * Based on requirements 4.1, 4.2, 6.4
 */

import { LeadData, CalculatedValues as PDFCalculatedValues, Language, LeadQualityScore } from './types';
import { calculatePricingTiers, determineRecommendedPhase } from './pricing';
import { calculateLeadQualityScore } from './lead-scoring';

// Import existing calculator interfaces (we'll reference them directly)
export interface ExistingCalculatorInputs {
  organizationSize: number;
  adminStaffCount: number;
  adminHoursPerWeek: number;
  adminLaborCost: number;
  executiveStaffCount: number;
  executiveHoursPerWeek: number;
  executiveLaborCost: number;
  annualEvents: number;
  avgMemberValue: number;
  currentRevenue?: number;
  industryType: string;
}

export interface ExistingCalculatedValues {
  // Admin staff calculations
  adminWeeklyHours: number;
  adminAnnualHours: number;
  adminAnnualWaste: number;
  adminFreedHours: number;
  adminLaborCostAvoided: number;
  
  // Executive staff calculations
  executiveWeeklyHours: number;
  executiveAnnualHours: number;
  executiveAnnualWaste: number;
  executiveFreedHours: number;
  executiveLaborCostAvoided: number;
  
  // Combined totals
  totalWeeklyHours: number;
  totalAnnualHours: number;
  annualWaste: number;
  potentialFreedHours: number;
  potentialFreedWeeklyHours: number;
  laborCostAvoided: number;
  
  // Revenue calculations
  newMembersAcquired: number;
  memberRevenue: number;
  newProgramRevenue: number;
  partnershipRevenue: number;
  churnReductionRevenue: number;
  conservativeNewRevenue: number;
  totalValueCreated: number;
  
  taskBreakdown: {
    [key: string]: {
      annualHours: number;
      annualCost: number;
      percentage: number;
    };
  };
}

// Additional lead information needed for PDF system
export interface LeadContactInfo {
  fullName: string;
  email: string;
  phone?: string;
  organizationName: string;
  jobTitle: string;
  signatureAuthority?: number;
  timeline: string;
  language?: Language;
}

/**
 * Transform existing calculator inputs to LeadData format
 */
export function transformToLeadData(
  calculatorInputs: ExistingCalculatorInputs,
  contactInfo: LeadContactInfo
): LeadData {
  return {
    // Contact Information
    fullName: contactInfo.fullName,
    email: contactInfo.email,
    phone: contactInfo.phone,
    organizationName: contactInfo.organizationName,
    jobTitle: contactInfo.jobTitle,
    signatureAuthority: contactInfo.signatureAuthority,
    timeline: contactInfo.timeline,
    
    // Organization Metrics (mapped from existing calculator)
    organizationSize: calculatorInputs.organizationSize,
    adminStaffCount: calculatorInputs.adminStaffCount,
    manualHoursPerWeek: calculatorInputs.adminHoursPerWeek + calculatorInputs.executiveHoursPerWeek,
    loadedLaborCost: calculateWeightedLaborCost(calculatorInputs),
    annualEvents: calculatorInputs.annualEvents,
    avgMemberValue: calculatorInputs.avgMemberValue,
    currentRevenue: calculatorInputs.currentRevenue,
    industryType: calculatorInputs.industryType,
    
    // System Fields
    language: contactInfo.language || 'en',
    submittedAt: Date.now(),
  };
}

/**
 * Calculate weighted average labor cost from admin and executive costs
 */
function calculateWeightedLaborCost(inputs: ExistingCalculatorInputs): number {
  const adminTotalHours = inputs.adminStaffCount * inputs.adminHoursPerWeek;
  const executiveTotalHours = inputs.executiveStaffCount * inputs.executiveHoursPerWeek;
  const totalHours = adminTotalHours + executiveTotalHours;
  
  if (totalHours === 0) return inputs.adminLaborCost;
  
  const weightedCost = (
    (adminTotalHours * inputs.adminLaborCost) + 
    (executiveTotalHours * inputs.executiveLaborCost)
  ) / totalHours;
  
  return Math.round(weightedCost);
}

/**
 * Transform existing calculated values to PDF system format
 */
export function transformToCalculatedValues(
  existingCalculations: ExistingCalculatedValues,
  leadData: LeadData
): PDFCalculatedValues {
  // Calculate pricing tiers
  const pricing = calculatePricingTiers(existingCalculations.totalValueCreated);
  
  // Determine lead quality score
  const leadQualityScore = calculateLeadQualityScore(leadData, existingCalculations);
  
  // Determine recommended phase
  const recommendedPhase = determineRecommendedPhase(existingCalculations.totalValueCreated, leadData);
  
  return {
    // Core Metrics (mapped from existing calculations)
    totalAnnualHours: existingCalculations.totalAnnualHours,
    annualWaste: existingCalculations.annualWaste,
    potentialFreedHours: existingCalculations.potentialFreedHours,
    laborCostAvoided: existingCalculations.laborCostAvoided,
    newRevenuePotential: existingCalculations.conservativeNewRevenue,
    totalValueCreated: existingCalculations.totalValueCreated,
    
    // Pricing Intelligence (new calculations)
    pricing,
    
    // Sales Intelligence (new calculations)
    recommendedPhase,
    leadQualityScore,
  };
}







/**
 * Main transformation function that combines all transformations
 */
export function transformCalculatorDataForPDF(
  calculatorInputs: ExistingCalculatorInputs,
  existingCalculations: ExistingCalculatedValues,
  contactInfo: LeadContactInfo
): { leadData: LeadData; calculatedValues: PDFCalculatedValues } {
  const leadData = transformToLeadData(calculatorInputs, contactInfo);
  const calculatedValues = transformToCalculatedValues(existingCalculations, leadData);
  
  return {
    leadData,
    calculatedValues,
  };
}

/**
 * Validation function to ensure data integrity
 */
export function validateTransformedData(
  leadData: LeadData,
  calculatedValues: PDFCalculatedValues
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate required lead data fields
  if (!leadData.fullName?.trim()) errors.push('Full name is required');
  if (!leadData.email?.trim()) errors.push('Email is required');
  if (!leadData.organizationName?.trim()) errors.push('Organization name is required');
  if (!leadData.jobTitle?.trim()) errors.push('Job title is required');
  if (!leadData.timeline?.trim()) errors.push('Timeline is required');
  
  // Validate numeric values
  if (leadData.organizationSize <= 0) errors.push('Organization size must be positive');
  if (leadData.adminStaffCount <= 0) errors.push('Admin staff count must be positive');
  if (leadData.manualHoursPerWeek <= 0) errors.push('Manual hours per week must be positive');
  if (leadData.loadedLaborCost <= 0) errors.push('Labor cost must be positive');
  
  // Validate calculated values
  if (calculatedValues.totalValueCreated <= 0) errors.push('Total value created must be positive');
  if (calculatedValues.totalAnnualHours <= 0) errors.push('Total annual hours must be positive');
  
  // Validate pricing tiers
  const { pricing } = calculatedValues;
  if (pricing.conservative.annualPrice >= pricing.target.annualPrice) {
    errors.push('Conservative pricing should be less than target pricing');
  }
  if (pricing.target.annualPrice >= pricing.aggressive.annualPrice) {
    errors.push('Target pricing should be less than aggressive pricing');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}