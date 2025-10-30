/**
 * Template preview utilities for development and testing
 * Helps visualize how the PDF will look with different data
 */

import { LeadData, CalculatedValues } from '../value-calculator/types';
import { transformDataForTemplate } from './apitemplate-client';
import { VALUE_REPORT_HTML, VALUE_REPORT_CSS } from './templates/value-report-html';

/**
 * Generate HTML preview of the PDF template
 * Useful for development and debugging
 */
export function generateHTMLPreview(
  leadData: LeadData,
  calculatedValues: CalculatedValues
): string {
  const templateData = transformDataForTemplate(leadData, calculatedValues);
  
  // Simple template replacement (for preview only)
  let html = VALUE_REPORT_HTML;
  
  // Replace template variables with actual values
  Object.entries(templateData).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    html = html.replace(regex, String(value));
  });
  
  // Handle number formatting
  html = html.replace(/{{([^}]+)\s*\|\s*number_format}}/g, (match, expression) => {
    const value = templateData[expression.trim()];
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return match;
  });
  
  // Add CSS
  html = html.replace('</head>', `${VALUE_REPORT_CSS}</head>`);
  
  return html;
}

/**
 * Generate sample data for testing templates
 */
export function generateSampleData(): {
  leadData: LeadData;
  calculatedValues: CalculatedValues;
} {
  const leadData: LeadData = {
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@medicalassoc.org',
    organizationName: 'European Medical Association',
    jobTitle: 'Executive Director',
    phone: '+49-30-12345678',
    industryType: 'medical',
    timeline: 'Within 3 months',
    language: 'en',
    signatureAuthority: 75000,
    // Required organization metrics
    organizationSize: 450,
    adminStaffCount: 3,
    manualHoursPerWeek: 60,
    loadedLaborCost: 65,
    annualEvents: 24,
    avgMemberValue: 180,
  };

  const calculatedValues: CalculatedValues = {
    // Core Metrics
    totalAnnualHours: 2080,
    annualWaste: 101400,
    potentialFreedHours: 1872,
    laborCostAvoided: 91260,
    newRevenuePotential: 285000,
    totalValueCreated: 376260,

    // Pricing Intelligence
    pricing: {
      conservative: {
        percentage: 15,
        annualPrice: 56439,
        customerKeeps: 319821,
        roi: 567,
      },
      target: {
        percentage: 20,
        annualPrice: 75252,
        customerKeeps: 301008,
        roi: 400,
      },
      aggressive: {
        percentage: 25,
        annualPrice: 94065,
        customerKeeps: 282195,
        roi: 300,
      },
      premium: {
        percentage: 30,
        annualPrice: 112878,
        customerKeeps: 263382,
        roi: 233,
      },
    },

    // Sales Intelligence
    recommendedPhase: 'Pilot with expansion',
    leadQualityScore: 'HIGH',
  };

  return { leadData, calculatedValues };
}

/**
 * Generate multiple sample datasets for testing different scenarios
 */
export function generateTestScenarios(): Array<{
  name: string;
  description: string;
  leadData: LeadData;
  calculatedValues: CalculatedValues;
}> {
  return [
    {
      name: 'Large Medical Association',
      description: 'High-value organization with significant automation potential',
      ...generateSampleData(),
    },
    {
      name: 'Small Legal Network',
      description: 'Smaller organization with focused needs',
      leadData: {
        fullName: 'Michael Chen',
        email: 'michael.chen@legalnetwork.com',
        organizationName: 'Regional Legal Network',
        jobTitle: 'Managing Partner',
        phone: '+1-555-0199',
        industryType: 'legal',
        timeline: 'Within 6 months',
        language: 'en',
        signatureAuthority: 25000,
        organizationSize: 150,
        adminStaffCount: 2,
        manualHoursPerWeek: 23,
        loadedLaborCost: 55,
        annualEvents: 12,
        avgMemberValue: 150,
      },
      calculatedValues: {
        totalAnnualHours: 1196,
        annualWaste: 56680,
        potentialFreedHours: 1076,
        laborCostAvoided: 51012,
        newRevenuePotential: 155000,
        totalValueCreated: 206012,
        pricing: {
          conservative: {
            percentage: 15,
            annualPrice: 30902,
            customerKeeps: 175110,
            roi: 567,
          },
          target: {
            percentage: 20,
            annualPrice: 41202,
            customerKeeps: 164810,
            roi: 400,
          },
          aggressive: {
            percentage: 25,
            annualPrice: 51503,
            customerKeeps: 154509,
            roi: 300,
          },
          premium: {
            percentage: 30,
            annualPrice: 61804,
            customerKeeps: 144208,
            roi: 233,
          },
        },
        recommendedPhase: 'Standard pilot',
        leadQualityScore: 'MEDIUM',
      },
    },
    {
      name: 'German Engineering Association',
      description: 'German language template test with engineering focus',
      leadData: {
        fullName: 'Dr. Klaus Weber',
        email: 'klaus.weber@ingenieure.de',
        organizationName: 'Deutscher Ingenieurverband',
        jobTitle: 'Geschäftsführer',
        phone: '+49-89-12345678',
        industryType: 'engineering',
        timeline: 'Within 1 month',
        language: 'de',
        signatureAuthority: 100000,
        organizationSize: 600,
        adminStaffCount: 4,
        manualHoursPerWeek: 75,
        loadedLaborCost: 70,
        annualEvents: 36,
        avgMemberValue: 200,
      },
      calculatedValues: {
        totalAnnualHours: 2600,
        annualWaste: 130000,
        potentialFreedHours: 2340,
        laborCostAvoided: 117000,
        newRevenuePotential: 360000,
        totalValueCreated: 477000,
        pricing: {
          conservative: {
            percentage: 15,
            annualPrice: 71550,
            customerKeeps: 405450,
            roi: 567,
          },
          target: {
            percentage: 20,
            annualPrice: 95400,
            customerKeeps: 381600,
            roi: 400,
          },
          aggressive: {
            percentage: 25,
            annualPrice: 119250,
            customerKeeps: 357750,
            roi: 300,
          },
          premium: {
            percentage: 30,
            annualPrice: 143100,
            customerKeeps: 333900,
            roi: 233,
          },
        },
        recommendedPhase: 'Pilot with expansion',
        leadQualityScore: 'HIGH',
      },
    },
  ];
}