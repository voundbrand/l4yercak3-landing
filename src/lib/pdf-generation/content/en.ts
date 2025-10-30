/**
 * English content for PDF generation
 * Based on requirements 1.5, 7.1, 7.2
 */

import { LocalizedContent } from '../../value-calculator/types';

export const EN_CONTENT: LocalizedContent = {
  pdf: {
    title: 'Value Analysis Report',
    executiveSummary: {
      title: 'Executive Summary',
      valueOpportunity: '{{totalValueCreated}} Annual Value Opportunity',
      currentSituation: [
        '{{potentialFreedHours}} hours wasted annually on manual processes',
        'Limited capacity for strategic growth initiatives',
        'Operational inefficiencies impacting member experience'
      ],
      withL4yercak3: [
        'Automated workflows freeing up {{potentialFreedHours}} hours annually',
        'Strategic capacity for revenue-generating activities',
        'Enhanced member experience through streamlined operations'
      ],
      pricingRedacted: '{{pricingRedacted}}',
      callToAction: 'Schedule Your Strategy Call'
    },
    taskBreakdown: {
      title: 'WHERE YOUR TIME IS GOING',
      categories: {
        eventCoordination: 'Event Coordination & Management',
        memberCommunication: 'Member Communication & Outreach',
        complianceReporting: 'Compliance & Reporting',
        financialAdmin: 'Financial Administration',
        dataManagement: 'Data Entry & Management'
      }
    },
    growthScenarios: {
      title: 'STRATEGIC CAPACITY UNLOCKED',
      opportunities: [
        'Member Acquisition Programs',
        'Corporate Partnership Development',
        'Premium Service Offerings',
        'Member Retention Initiatives'
      ]
    },
    pilotMetrics: {
      title: 'PROVE IT FIRST: 90-DAY PILOT FRAMEWORK',
      phases: {
        baseline: 'Baseline Measurement (Days 1-14)',
        automation: 'Core Automation Implementation (Days 15-60)',
        validation: 'Results Validation & Optimization (Days 61-90)'
      }
    }
  },
  email: {
    customer: {
      subject: 'Your Value Analysis Report is Ready',
      greeting: 'Thank you for your interest in L4YERCAK3!',
      highlights: [
        'Your personalized value analysis shows significant automation potential',
        'We\'ve identified specific areas where you can reclaim administrative time',
        'The attached report outlines a clear path to operational efficiency'
      ],
      nextSteps: 'Next Steps: Schedule a 30-minute strategy call to discuss your specific needs and explore pilot options.',
      cta: 'Schedule Strategy Call',
      signature: 'Best regards,\nThe L4YERCAK3 Team',
      ps: 'P.S. We offer pilot programs that can be approved at your current signature authority level.'
    },
    sales: {
      subject: 'New Value Calculator Lead',
      leadQuality: 'Lead Quality Score',
      talkingPoints: [
        'Focus on time savings and operational efficiency',
        'Emphasize pilot program for risk mitigation',
        'Highlight ROI potential and member experience improvements'
      ],
      signatureAlert: 'Signature Authority Alert'
    }
  }
};