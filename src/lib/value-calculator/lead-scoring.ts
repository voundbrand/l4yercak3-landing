/**
 * Lead quality scoring system for PDF value reports
 * Based on requirements 4.4, 3.4, 3.5
 */

import { LeadData, LeadQualityScore } from './types';
import { ExistingCalculatedValues } from './bridge';

/**
 * Calculate comprehensive lead quality score
 */
export function calculateLeadQualityScore(
  leadData: LeadData,
  calculations: ExistingCalculatedValues
): LeadQualityScore {
  const score = calculateLeadScore(leadData, calculations);
  
  if (score >= 80) return 'HIGH';
  if (score >= 60) return 'MEDIUM';
  return 'LOW';
}

/**
 * Calculate numerical lead score (0-100)
 */
function calculateLeadScore(
  leadData: LeadData,
  calculations: ExistingCalculatedValues
): number {
  let score = 0;
  
  // Value Potential (40 points max)
  score += calculateValueScore(calculations.totalValueCreated);
  
  // Timeline Urgency (25 points max)
  score += calculateTimelineScore(leadData.timeline);
  
  // Decision-Making Authority (20 points max)
  score += calculateAuthorityScore(leadData.jobTitle, leadData.signatureAuthority, calculations.totalValueCreated);
  
  // Organization Fit (15 points max)
  score += calculateOrganizationScore(leadData);
  
  return Math.min(100, score);
}

/**
 * Score based on total value potential (0-40 points)
 */
function calculateValueScore(totalValue: number): number {
  if (totalValue >= 200000) return 40; // Exceptional value
  if (totalValue >= 150000) return 35; // Very high value
  if (totalValue >= 100000) return 30; // High value
  if (totalValue >= 75000) return 25;  // Good value
  if (totalValue >= 50000) return 20;  // Moderate value
  if (totalValue >= 25000) return 15;  // Low value
  return 10; // Minimal value
}

/**
 * Score based on timeline urgency (0-25 points)
 */
function calculateTimelineScore(timeline: string): number {
  switch (timeline) {
    case 'Immediately (within 30 days)':
      return 25; // Hot lead
    case 'This quarter (1-3 months)':
      return 20; // Warm lead
    case 'Next quarter (3-6 months)':
      return 15; // Medium-term
    case 'Just exploring options':
      return 5;  // Cold lead
    default:
      return 10; // Unknown timeline
  }
}

/**
 * Score based on decision-making authority (0-20 points)
 */
function calculateAuthorityScore(
  jobTitle: string,
  signatureAuthority?: number,
  totalValue?: number
): number {
  let score = 0;
  
  // Job title authority (0-15 points)
  const title = jobTitle.toLowerCase();
  if (title.includes('ceo') || title.includes('president') || title.includes('owner')) {
    score += 15; // Ultimate decision maker
  } else if (title.includes('director') || title.includes('managing') || title.includes('executive')) {
    score += 12; // Senior decision maker
  } else if (title.includes('manager') || title.includes('head') || title.includes('lead')) {
    score += 8; // Mid-level decision maker
  } else if (title.includes('coordinator') || title.includes('assistant') || title.includes('admin')) {
    score += 3; // Limited authority
  } else {
    score += 6; // Unknown role
  }
  
  // Signature authority (0-5 points)
  if (signatureAuthority && totalValue) {
    const targetPrice = totalValue * 0.33; // Target pricing at 33%
    if (signatureAuthority >= targetPrice) {
      score += 5; // Can approve full contract
    } else if (signatureAuthority >= targetPrice * 0.5) {
      score += 3; // Can approve pilot
    } else if (signatureAuthority >= 10000) {
      score += 2; // Some authority
    } else {
      score += 1; // Limited authority
    }
  }
  
  return score;
}

/**
 * Score based on organization characteristics (0-15 points)
 */
function calculateOrganizationScore(leadData: LeadData): number {
  let score = 0;
  
  // Organization size (0-8 points)
  if (leadData.organizationSize >= 200) {
    score += 8; // Large organization
  } else if (leadData.organizationSize >= 100) {
    score += 6; // Medium-large organization
  } else if (leadData.organizationSize >= 50) {
    score += 5; // Medium organization
  } else if (leadData.organizationSize >= 20) {
    score += 4; // Small-medium organization
  } else {
    score += 2; // Small organization
  }
  
  // Industry type (0-4 points)
  switch (leadData.industryType) {
    case 'medical':
      score += 4; // High compliance needs, good fit
      break;
    case 'legal':
      score += 4; // High compliance needs, good fit
      break;
    case 'tax':
      score += 3; // Seasonal workflows, good fit
      break;
    case 'engineering':
      score += 3; // Technical users, good fit
      break;
    default:
      score += 2; // Other professional networks
  }
  
  // Admin staff ratio (0-3 points)
  const adminRatio = leadData.adminStaffCount / leadData.organizationSize;
  if (adminRatio >= 0.2) {
    score += 3; // High admin overhead
  } else if (adminRatio >= 0.1) {
    score += 2; // Moderate admin overhead
  } else {
    score += 1; // Low admin overhead
  }
  
  return score;
}

/**
 * Detect if contact is likely a decision maker
 */
export function isDecisionMaker(jobTitle: string): boolean {
  const title = jobTitle.toLowerCase();
  const decisionMakerTitles = [
    'ceo', 'president', 'owner', 'founder',
    'executive director', 'managing director',
    'director', 'head of', 'chief',
    'board chair', 'chairman'
  ];
  
  return decisionMakerTitles.some(dmTitle => title.includes(dmTitle));
}

/**
 * Generate sales talking points based on lead profile
 */
export function generateSalesTalkingPoints(
  leadData: LeadData,
  calculations: ExistingCalculatedValues,
  leadQuality: LeadQualityScore
): string[] {
  const talkingPoints: string[] = [];
  
  // Value-focused talking points
  talkingPoints.push(
    `"You're wasting €${calculations.annualWaste?.toLocaleString() || '0'}/year on manual work"`
  );
  talkingPoints.push(
    `"We can free ${calculations.potentialFreedHours?.toLocaleString() || '0'} hours for strategic growth"`
  );
  talkingPoints.push(
    `"Conservative estimate: €${calculations.conservativeNewRevenue?.toLocaleString() || '0'} in new revenue possible"`
  );
  
  // Pricing and ROI talking points
  const targetPrice = Math.round(calculations.totalValueCreated * 0.33);
  const customerKeeps = calculations.totalValueCreated - targetPrice;
  talkingPoints.push(
    `"Your net benefit: €${customerKeeps?.toLocaleString() || '0'}/year for €${targetPrice?.toLocaleString() || '0'} investment"`
  );
  talkingPoints.push(
    `"That's a 2x return in year one, compounding every year after"`
  );
  
  // Timeline-specific talking points
  if (leadData.timeline === 'Immediately (within 30 days)') {
    talkingPoints.push(
      `"With your urgent timeline, we can have you seeing results within 30 days"`
    );
  } else if (leadData.timeline === 'This quarter (1-3 months)') {
    talkingPoints.push(
      `"Perfect timing - we can implement and prove ROI within your quarter"`
    );
  }
  
  // Authority-specific talking points
  if (leadData.signatureAuthority) {
    const targetPrice = Math.round(calculations.totalValueCreated * 0.33);
    if (leadData.signatureAuthority >= targetPrice) {
      talkingPoints.push(
        `"You can approve this directly - no need for lengthy CFO approval processes"`
      );
    } else {
      talkingPoints.push(
        `"Let's prove it with a 90-day pilot under your signature authority"`
      );
    }
  }
  
  // Industry-specific talking points
  if (leadData.industryType === 'medical') {
    talkingPoints.push(
      `"Medical networks see 40% faster ROI due to high compliance automation value"`
    );
  } else if (leadData.industryType === 'legal') {
    talkingPoints.push(
      `"Legal networks love our automated compliance reporting and client communication"`
    );
  }
  
  // Lead quality specific talking points
  if (leadQuality === 'HIGH') {
    talkingPoints.push(
      `"This is exactly the type of high-value opportunity we excel at - let's move fast"`
    );
  } else if (leadQuality === 'LOW') {
    talkingPoints.push(
      `"Even with conservative assumptions, you'll see positive ROI in year one"`
    );
  }
  
  return talkingPoints;
}

/**
 * Generate signature authority analysis and alerts
 */
export function generateSignatureAuthorityAlert(
  leadData: LeadData,
  targetPrice: number
): string {
  if (!leadData.signatureAuthority) {
    return 'Signature authority not provided - ask on discovery call';
  }
  
  if (leadData.signatureAuthority >= targetPrice) {
    return `✅ Can approve full contract directly (Authority: €${leadData.signatureAuthority?.toLocaleString() || '0'})`;
  }
  
  return `⚠️ Requires CFO/Board approval (Authority: €${leadData.signatureAuthority?.toLocaleString() || '0'}, Target: €${targetPrice?.toLocaleString() || '0'})`;
}

/**
 * Generate lead quality assessment with specific criteria
 */
export function generateLeadQualityAssessment(
  leadData: LeadData,
  calculations: ExistingCalculatedValues,
  leadQuality: LeadQualityScore
): {
  score: LeadQualityScore;
  criteria: Array<{ criterion: string; status: 'pass' | 'warning' | 'fail'; message: string }>;
  overallAssessment: string;
} {
  // Calculate status values
  const valueStatus: 'pass' | 'warning' | 'fail' = calculations.totalValueCreated >= 75000 ? 'pass' : 
                                                   calculations.totalValueCreated >= 50000 ? 'warning' : 'fail';
  const timelineStatus: 'pass' | 'warning' | 'fail' = ['Immediately', 'This quarter'].some(t => leadData.timeline.includes(t)) ? 'pass' : 'warning';
  const authorityStatus: 'pass' | 'warning' | 'fail' = isDecisionMaker(leadData.jobTitle) ? 'pass' : 'warning';
  const signatureStatus: 'pass' | 'warning' | 'fail' = leadData.signatureAuthority && leadData.signatureAuthority >= 10000 ? 'pass' : 'warning';

  const criteria = [
    {
      criterion: 'Total Value',
      status: valueStatus,
      message: calculations.totalValueCreated >= 75000 
        ? `High total value (€${Math.round(calculations.totalValueCreated / 1000)}K+)`
        : calculations.totalValueCreated >= 50000
        ? `Moderate value opportunity (€${Math.round(calculations.totalValueCreated / 1000)}K)`
        : `Lower value opportunity (€${Math.round(calculations.totalValueCreated / 1000)}K)`
    },
    {
      criterion: 'Timeline',
      status: timelineStatus,
      message: ['Immediately', 'This quarter'].some(t => leadData.timeline.includes(t))
        ? 'Near-term timeline'
        : 'Long sales cycle expected'
    },
    {
      criterion: 'Decision Authority',
      status: authorityStatus,
      message: isDecisionMaker(leadData.jobTitle)
        ? 'Decision-maker role'
        : 'May not be final decision-maker'
    },
    {
      criterion: 'Signature Authority',
      status: signatureStatus,
      message: leadData.signatureAuthority && leadData.signatureAuthority >= 10000
        ? 'Sufficient signature authority'
        : 'Limited signature authority'
    }
  ];
  
  let overallAssessment = '';
  if (leadQuality === 'HIGH') {
    overallAssessment = 'Strong lead with high value potential and favorable buying conditions';
  } else if (leadQuality === 'MEDIUM') {
    overallAssessment = 'Qualified lead with good potential - may need nurturing or pilot approach';
  } else {
    overallAssessment = 'Early-stage lead - focus on education and long-term relationship building';
  }
  
  return {
    score: leadQuality,
    criteria,
    overallAssessment
  };
}