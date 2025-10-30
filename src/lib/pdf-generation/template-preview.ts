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
    // Admin staff calculations
    adminWeeklyHours: 25,
    adminAnnualHours: 1300,
    adminAnnualWaste: 39000,
    adminFreedHours: 1170,
    adminLaborCostAvoided: 35100,

    // Executive staff calculations  
    executiveWeeklyHours: 15,
    executiveAnnualHours: 780,
    executiveAnnualWaste: 62400,
    executiveFreedHours: 702,
    executiveLaborCostAvoided: 56160,

    // Combined totals
    totalWeeklyHours: 40,
    totalAnnualHours: 2080,
    annualWaste: 101400,
    potentialFreedHours: 1872,
    potentialFreedWeeklyHours: 36,
    laborCostAvoided: 91260,

    // Revenue calculations
    newMembersAcquired: 35,
    memberRevenue: 105000,
    newProgramRevenue: 75000,
    partnershipRevenue: 60000,
    churnReductionRevenue: 45000,
    conservativeNewRevenue: 285000,
    totalValueCreated: 376260,

    // Task breakdown
    taskBreakdown: {
      eventCoordination: {
        annualHours: 624,
        annualCost: 18720,
        percentage: 30,
      },
      memberCommunication: {
        annualHours: 520,
        annualCost: 15600,
        percentage: 25,
      },
      complianceReporting: {
        annualHours: 416,
        annualCost: 12480,
        percentage: 20,
      },
      financialAdmin: {
        annualHours: 312,
        annualCost: 9360,
        percentage: 15,
      },
      dataManagement: {
        annualHours: 208,
        annualCost: 6240,
        percentage: 10,
      },
    },

    // Additional fields
    leadQualityScore: 92,
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
      },
      calculatedValues: {
        adminWeeklyHours: 15,
        adminAnnualHours: 780,
        adminAnnualWaste: 23400,
        adminFreedHours: 702,
        adminLaborCostAvoided: 21060,
        executiveWeeklyHours: 8,
        executiveAnnualHours: 416,
        executiveAnnualWaste: 33280,
        executiveFreedHours: 374,
        executiveLaborCostAvoided: 29952,
        totalWeeklyHours: 23,
        totalAnnualHours: 1196,
        annualWaste: 56680,
        potentialFreedHours: 1076,
        potentialFreedWeeklyHours: 21,
        laborCostAvoided: 51012,
        newMembersAcquired: 20,
        memberRevenue: 60000,
        newProgramRevenue: 40000,
        partnershipRevenue: 30000,
        churnReductionRevenue: 25000,
        conservativeNewRevenue: 155000,
        totalValueCreated: 206012,
        taskBreakdown: {
          eventCoordination: {
            annualHours: 359,
            annualCost: 10770,
            percentage: 30,
          },
          memberCommunication: {
            annualHours: 299,
            annualCost: 8970,
            percentage: 25,
          },
          complianceReporting: {
            annualHours: 239,
            annualCost: 7170,
            percentage: 20,
          },
          financialAdmin: {
            annualHours: 179,
            annualCost: 5370,
            percentage: 15,
          },
          dataManagement: {
            annualHours: 120,
            annualCost: 3600,
            percentage: 10,
          },
        },
        leadQualityScore: 78,
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
      },
      calculatedValues: {
        adminWeeklyHours: 30,
        adminAnnualHours: 1560,
        adminAnnualWaste: 46800,
        adminFreedHours: 1404,
        adminLaborCostAvoided: 42120,
        executiveWeeklyHours: 20,
        executiveAnnualHours: 1040,
        executiveAnnualWaste: 83200,
        executiveFreedHours: 936,
        executiveLaborCostAvoided: 74880,
        totalWeeklyHours: 50,
        totalAnnualHours: 2600,
        annualWaste: 130000,
        potentialFreedHours: 2340,
        potentialFreedWeeklyHours: 45,
        laborCostAvoided: 117000,
        newMembersAcquired: 45,
        memberRevenue: 135000,
        newProgramRevenue: 90000,
        partnershipRevenue: 75000,
        churnReductionRevenue: 60000,
        conservativeNewRevenue: 360000,
        totalValueCreated: 477000,
        taskBreakdown: {
          eventCoordination: {
            annualHours: 780,
            annualCost: 23400,
            percentage: 30,
          },
          memberCommunication: {
            annualHours: 650,
            annualCost: 19500,
            percentage: 25,
          },
          complianceReporting: {
            annualHours: 520,
            annualCost: 15600,
            percentage: 20,
          },
          financialAdmin: {
            annualHours: 390,
            annualCost: 11700,
            percentage: 15,
          },
          dataManagement: {
            annualHours: 260,
            annualCost: 7800,
            percentage: 10,
          },
        },
        leadQualityScore: 95,
      },
    },
  ];
}