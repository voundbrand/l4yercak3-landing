/**
 * TypeScript interfaces for PDF Value Reports system
 * Based on requirements 6.1, 6.2, 6.4
 */

export interface LeadData {
  // Contact Information
  fullName: string;
  email: string;
  phone?: string;
  organizationName: string;
  jobTitle: string;
  signatureAuthority?: number;
  timeline: string;
  
  // Organization Metrics
  organizationSize: number;
  adminStaffCount: number;
  manualHoursPerWeek: number;
  loadedLaborCost: number;
  annualEvents: number;
  avgMemberValue: number;
  currentRevenue?: number;
  industryType: string;
  
  // System Fields
  language?: 'en' | 'de';
  submittedAt?: number;
}

export interface PricingOption {
  percentage: number;
  annualPrice: number;
  customerKeeps: number;
  roi: number;
}

export interface CalculatedValues {
  // Core Metrics
  totalAnnualHours: number;
  annualWaste: number;
  potentialFreedHours: number;
  laborCostAvoided: number;
  newRevenuePotential: number;
  totalValueCreated: number;
  
  // Pricing Intelligence
  pricing: {
    conservative: PricingOption;
    target: PricingOption;
    aggressive: PricingOption;
    premium: PricingOption;
  };
  
  // Sales Intelligence
  recommendedPhase: string;
  leadQualityScore: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface LocalizedContent {
  // PDF Content
  pdf: {
    title: string;
    executiveSummary: {
      title: string;
      valueOpportunity: string;
      currentSituation: string[];
      withL4yercak3: string[];
      pricingRedacted: string;
      callToAction: string;
    };
    taskBreakdown: {
      title: string;
      categories: {
        eventCoordination: string;
        memberCommunication: string;
        complianceReporting: string;
        financialAdmin: string;
        dataManagement: string;
      };
    };
    growthScenarios: {
      title: string;
      opportunities: string[];
    };
    pilotMetrics: {
      title: string;
      phases: {
        baseline: string;
        automation: string;
        validation: string;
      };
    };
  };
  
  // Email Content
  email: {
    customer: {
      subject: string;
      greeting: string;
      highlights: string[];
      nextSteps: string;
      cta: string;
      signature: string;
      ps: string;
    };
    sales: {
      subject: string;
      leadQuality: string;
      talkingPoints: string[];
      signatureAlert: string;
    };
  };
}

export interface EmailTemplate {
  subject: string;
  html: string;
  attachments: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

export interface PDFStyles {
  colors: {
    primary: string;      // #2563eb (L4YERCAK3 blue)
    secondary: string;    // #64748b (Gray)
    success: string;      // #059669 (Green)
    warning: string;      // #d97706 (Orange)
    danger: string;       // #dc2626 (Red)
    text: string;         // #1f2937 (Dark gray)
    light: string;        // #f8fafc (Light background)
  };
  fonts: {
    title: { size: number; style: string };
    heading: { size: number; style: string };
    subheading: { size: number; style: string };
    body: { size: number; style: string };
    small: { size: number; style: string };
  };
  spacing: {
    margin: number;
    lineHeight: number;
    sectionGap: number;
  };
}

export type Language = 'en' | 'de';

export type LeadQualityScore = 'HIGH' | 'MEDIUM' | 'LOW';