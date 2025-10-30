/**
 * Pricing intelligence calculations for PDF value reports
 * Based on requirements 4.1, 4.2, 4.4
 */

import { PricingOption, LeadData } from './types';

/**
 * Calculate all pricing tiers based on total value created
 * Uses value-based pricing with different capture percentages
 */
export function calculatePricingTiers(totalValueCreated: number): {
  conservative: PricingOption;
  target: PricingOption;
  aggressive: PricingOption;
  premium: PricingOption;
} {
  return {
    conservative: calculatePricingOption(totalValueCreated, 0.25),
    target: calculatePricingOption(totalValueCreated, 0.33),
    aggressive: calculatePricingOption(totalValueCreated, 0.40),
    premium: calculatePricingOption(totalValueCreated, 0.50),
  };
}

/**
 * Calculate a single pricing option with ROI
 */
function calculatePricingOption(totalValue: number, percentage: number): PricingOption {
  const annualPrice = Math.round(totalValue * percentage);
  const customerKeeps = Math.round(totalValue - annualPrice);
  const roi = Math.round(((customerKeeps) / annualPrice) * 100);
  
  return {
    percentage: Math.round(percentage * 100),
    annualPrice,
    customerKeeps,
    roi,
  };
}

/**
 * Determine recommended phase based on total value and organization profile
 */
export function determineRecommendedPhase(
  totalValueCreated: number,
  leadData: LeadData
): string {
  // High-value organizations get AI Workforce recommendation
  if (totalValueCreated >= 100000) {
    return 'AI Workforce (Full Platform)';
  }
  
  // Medium-value organizations with growth potential
  if (totalValueCreated >= 75000 && leadData.organizationSize >= 50) {
    return 'Core Platform with AI Upgrade Path';
  }
  
  // Smaller organizations start with Core Platform
  return 'Core Platform';
}

/**
 * Generate phase justification text for sales team
 */
export function generatePhaseJustification(
  recommendedPhase: string,
  totalValueCreated: number,
  leadData: LeadData
): string {
  if (recommendedPhase.includes('AI Workforce')) {
    return `High value opportunity (€${Math.round(totalValueCreated / 1000)}K+) - lead with full AI solution to maximize impact`;
  }
  
  if (recommendedPhase.includes('Upgrade Path')) {
    return `Strong growth potential - start with Core Platform, demonstrate value, then upsell to AI features`;
  }
  
  return `Start with Core Platform to prove value, expand to AI features after demonstrating ROI`;
}

/**
 * Calculate signature authority analysis and recommendations
 */
export function analyzeSignatureAuthority(
  leadData: LeadData,
  targetPrice: number
): {
  canApproveDirectly: boolean;
  recommendedPilotPrice: number;
  signatureAuthorityAlert: string;
  pilotStrategy: string;
} {
  const signatureAuthority = leadData.signatureAuthority;
  
  if (!signatureAuthority) {
    return {
      canApproveDirectly: false,
      recommendedPilotPrice: Math.min(15000, targetPrice),
      signatureAuthorityAlert: 'Signature authority not provided - ask on discovery call',
      pilotStrategy: 'Propose pilot under €15K to avoid CFO approval requirement',
    };
  }
  
  const canApproveDirectly = signatureAuthority >= targetPrice;
  
  if (canApproveDirectly) {
    return {
      canApproveDirectly: true,
      recommendedPilotPrice: targetPrice,
      signatureAuthorityAlert: `✅ Can approve full contract directly (Authority: €${signatureAuthority?.toLocaleString() || '0'})`,
      pilotStrategy: 'Can proceed with full annual contract - no pilot needed',
    };
  }
  
  // Calculate pilot price just under signature authority
  const recommendedPilotPrice = Math.min(signatureAuthority - 1, targetPrice);
  
  return {
    canApproveDirectly: false,
    recommendedPilotPrice,
    signatureAuthorityAlert: `⚠️ Requires CFO/Board approval (Authority: €${signatureAuthority?.toLocaleString() || '0'}, Target: €${targetPrice?.toLocaleString() || '0'})`,
    pilotStrategy: `Recommend 90-day pilot at €${recommendedPilotPrice?.toLocaleString() || '0'} (under signature authority)`,
  };
}

/**
 * Generate pricing recommendations for sales team
 */
export function generatePricingRecommendations(
  totalValueCreated: number,
  leadData: LeadData
): {
  primaryRecommendation: 'conservative' | 'target' | 'aggressive' | 'premium';
  reasoning: string;
  negotiationRange: {
    floor: number;
    ceiling: number;
  };
  competitivePositioning: string;
} {
  const pricing = calculatePricingTiers(totalValueCreated);
  
  // Default to target pricing
  let primaryRecommendation: 'conservative' | 'target' | 'aggressive' | 'premium' = 'target';
  let reasoning = 'Standard value-based pricing with 2x ROI for customer';
  
  // Adjust based on timeline urgency
  if (leadData.timeline === 'Immediately (within 30 days)') {
    primaryRecommendation = 'aggressive';
    reasoning = 'Urgent timeline - customer values speed, can command premium';
  } else if (leadData.timeline === 'Just exploring options') {
    primaryRecommendation = 'conservative';
    reasoning = 'Early-stage exploration - use conservative pricing to build trust';
  }
  
  // Adjust based on organization size and industry
  if (leadData.organizationSize >= 100 && leadData.industryType === 'medical') {
    primaryRecommendation = 'aggressive';
    reasoning = 'Large medical network - high compliance requirements justify premium pricing';
  }
  
  // Adjust based on signature authority constraints
  const signatureAnalysis = analyzeSignatureAuthority(leadData, pricing.target.annualPrice);
  if (!signatureAnalysis.canApproveDirectly && leadData.signatureAuthority) {
    if (leadData.signatureAuthority < pricing.conservative.annualPrice) {
      primaryRecommendation = 'conservative';
      reasoning = 'Limited signature authority - start conservative to avoid approval delays';
    }
  }
  
  const selectedPricing = pricing[primaryRecommendation];
  
  return {
    primaryRecommendation,
    reasoning,
    negotiationRange: {
      floor: pricing.conservative.annualPrice,
      ceiling: pricing.premium.annualPrice,
    },
    competitivePositioning: generateCompetitivePositioning(selectedPricing, totalValueCreated),
  };
}

/**
 * Generate competitive positioning message
 */
function generateCompetitivePositioning(
  selectedPricing: PricingOption,
  totalValueCreated: number
): string {
  const roi = selectedPricing.roi;
  
  if (roi >= 200) {
    return `At ${roi}% ROI, we're significantly more cost-effective than building in-house or using multiple point solutions`;
  }
  
  if (roi >= 150) {
    return `Strong ${roi}% ROI justifies premium over basic automation tools - we deliver complete solution`;
  }
  
  return `Even at ${roi}% ROI, customer breaks even in year one with compounding benefits thereafter`;
}

/**
 * Calculate pilot pricing strategy
 */
export function calculatePilotPricing(
  leadData: LeadData,
  targetAnnualPrice: number
): {
  pilotPrice: number;
  pilotDuration: number; // days
  conversionPrice: number;
  pilotStrategy: string;
} {
  const signatureAnalysis = analyzeSignatureAuthority(leadData, targetAnnualPrice);
  
  // 90-day pilot is standard
  const pilotDuration = 90;
  
  // Pilot price is either under signature authority or 25% of annual
  const pilotPrice = signatureAnalysis.canApproveDirectly 
    ? Math.round(targetAnnualPrice * 0.25) // 25% of annual for 90 days
    : signatureAnalysis.recommendedPilotPrice;
  
  // Conversion price accounts for pilot payment
  const conversionPrice = Math.max(0, targetAnnualPrice - pilotPrice);
  
  let pilotStrategy = `90-day pilot to prove ${Math.round(targetAnnualPrice / pilotPrice)}x ROI before full commitment`;
  
  if (!signatureAnalysis.canApproveDirectly) {
    pilotStrategy = `Pilot priced under signature authority (€${pilotPrice?.toLocaleString() || '0'}) to avoid CFO approval delays`;
  }
  
  return {
    pilotPrice,
    pilotDuration,
    conversionPrice,
    pilotStrategy,
  };
}