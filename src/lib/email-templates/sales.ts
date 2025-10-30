/**
 * Sales team email template for PDF value reports
 * Based on requirements 3.2, 3.3, 3.4, 3.5
 */

import { LeadData, CalculatedValues, Language } from '../value-calculator/types';
import { getLocalizedContent } from '../pdf-generation/content';
import { formatCurrencyLikeCalculator, formatNumberLikeCalculator } from '../value-calculator/i18n-bridge';
import { 
  generateSalesTalkingPoints, 
  generateSignatureAuthorityAlert,
  generateLeadQualityAssessment 
} from '../value-calculator/lead-scoring';
import { 
  generatePricingRecommendations,
  calculatePilotPricing 
} from '../value-calculator/pricing';

export function generateSalesEmailTemplate(
  lead: LeadData,
  calculatedValues: CalculatedValues,
  language: Language
): {
  subject: string;
  html: string;
} {
  const content = getLocalizedContent(language);
  
  // Generate sales intelligence
  const talkingPoints = generateSalesTalkingPoints(lead, calculatedValues as any, calculatedValues.leadQualityScore);
  const signatureAlert = generateSignatureAuthorityAlert(lead, calculatedValues.pricing.target.annualPrice);
  const leadAssessment = generateLeadQualityAssessment(lead, calculatedValues as any, calculatedValues.leadQualityScore);
  const pricingRecommendations = generatePricingRecommendations(calculatedValues.totalValueCreated, lead);
  const pilotPricing = calculatePilotPricing(lead, calculatedValues.pricing.target.annualPrice);
  
  // Helper functions for formatting
  const formatCurrency = (amount: number) => formatCurrencyLikeCalculator(amount);
  const formatNumber = (num: number) => formatNumberLikeCalculator(num);
  
  const subject = `🔥 ${content.email.sales.subject} - ${lead.organizationName} (${calculatedValues.leadQualityScore}) - ${formatCurrency(calculatedValues.totalValueCreated)}`;
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #ffffff !important;
            color: #1f2937 !important;
            padding: 20px;
            margin: 0;
            line-height: 1.6;
        }
        .email-container {
            background-color: #ffffff !important;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 30px;
            max-width: 850px;
            margin: 0 auto;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        .header {
            color: #dc2626;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 25px;
            text-align: center;
            border-bottom: 3px solid #fecaca;
            padding-bottom: 15px;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .lead-quality {
            font-size: 18px;
            font-weight: bold;
            padding: 20px;
            border-radius: 12px;
            margin: 25px 0;
            text-align: center;
            border: 3px solid;
        }
        .quality-high { 
            background-color: #f0fdf4; 
            border-color: #16a34a; 
            color: #15803d; 
        }
        .quality-medium { 
            background-color: #fffbeb; 
            border-color: #f59e0b; 
            color: #d97706; 
        }
        .quality-low { 
            background-color: #fef2f2; 
            border-color: #dc2626; 
            color: #b91c1c; 
        }
        
        .section {
            margin: 25px 0;
            padding: 25px;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            background-color: #f9fafb !important;
        }
        .section-title {
            color: #1e40af;
            font-weight: bold;
            margin-bottom: 20px;
            font-size: 18px;
            border-bottom: 2px solid #dbeafe;
            padding-bottom: 10px;
        }
        .data-row {
            display: flex;
            justify-content: space-between;
            margin: 12px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .data-row:last-child {
            border-bottom: none;
        }
        .data-label {
            color: #4b5563 !important;
            font-weight: 600;
            flex: 1;
        }
        .data-value {
            color: #1f2937 !important;
            font-weight: bold;
            text-align: right;
            flex: 1;
        }
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 25px 0;
        }
        .pricing-option {
            border: 2px solid #d1d5db;
            padding: 20px;
            border-radius: 12px;
            background-color: #ffffff !important;
            transition: all 0.3s ease;
        }
        .pricing-option:hover {
            border-color: #3b82f6;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }
        .pricing-title {
            color: #1e40af;
            font-weight: bold;
            margin-bottom: 12px;
            font-size: 16px;
        }
        .alert {
            padding: 20px;
            margin: 20px 0;
            border-radius: 12px;
            font-weight: 600;
            border: 2px solid;
        }
        .alert-warning {
            background-color: #fffbeb;
            border-color: #f59e0b;
            color: #92400e;
        }
        .alert-success {
            background-color: #f0fdf4;
            border-color: #16a34a;
            color: #15803d;
        }
        .talking-points {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .talking-points li {
            margin: 15px 0;
            padding: 12px 15px 12px 40px;
            position: relative;
            color: #1f2937;
            line-height: 1.7;
            background-color: #ffffff;
            border-left: 4px solid #3b82f6;
            border-radius: 6px;
        }
        .talking-points li::before {
            content: "💡";
            position: absolute;
            left: 12px;
            top: 12px;
            font-size: 16px;
        }
        .highlight-value {
            color: #059669;
            font-weight: bold;
            background-color: #ecfdf5;
            padding: 2px 6px;
            border-radius: 4px;
        }
        .highlight-currency {
            color: #d97706;
            font-weight: bold;
            background-color: #fffbeb;
            padding: 2px 6px;
            border-radius: 4px;
        }
        .next-steps {
            color: #1f2937;
            padding-left: 25px;
            line-height: 1.7;
        }
        .next-steps li {
            margin: 12px 0;
            color: #1f2937;
        }
        .footer-highlight {
            text-align: center; 
            margin-top: 40px; 
            padding: 25px; 
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            border-radius: 12px;
            border: 2px solid #3b82f6;
        }
        .footer-highlight div {
            color: #1e40af;
            font-weight: bold;
            font-size: 18px;
        }
        .status-pass {
            color: #059669 !important;
            font-weight: bold;
        }
        .status-warning {
            color: #d97706 !important;
            font-weight: bold;
        }
        .status-fail {
            color: #dc2626 !important;
            font-weight: bold;
        }
        .roi-highlight {
            color: #059669 !important;
            font-size: 14px;
            font-weight: 600;
            background-color: #ecfdf5;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 8px;
        }
    </style>
</head>
<body style="background-color: #ffffff !important; color: #1f2937 !important;">
    <div class="email-container" style="background-color: #ffffff !important; color: #1f2937 !important;">
        <div class="header">
            🚨 NEW LEAD ALERT - L4YERCAK3 VALUE CALCULATOR 🚨
        </div>
        
        <div class="lead-quality quality-${calculatedValues.leadQualityScore.toLowerCase()}">
            ${content.email.sales.leadQuality}: ${calculatedValues.leadQualityScore}
            <div style="font-size: 12px; margin-top: 5px;">
                ${leadAssessment.overallAssessment}
            </div>
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">📋 LEAD INFORMATION</div>
            <div class="data-row">
                <span class="data-label">Name:</span>
                <span class="data-value">${lead.fullName}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Email:</span>
                <span class="data-value">${lead.email}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Phone:</span>
                <span class="data-value">${lead.phone || 'Not provided'}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Organization:</span>
                <span class="data-value">${lead.organizationName}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Job Title:</span>
                <span class="data-value">${lead.jobTitle}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Timeline:</span>
                <span class="data-value">${lead.timeline}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Language:</span>
                <span class="data-value">${language.toUpperCase()}</span>
            </div>
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">🏢 ORGANIZATION PROFILE</div>
            <div class="data-row">
                <span class="data-label">Size:</span>
                <span class="data-value">${formatNumber(lead.organizationSize)} members</span>
            </div>
            <div class="data-row">
                <span class="data-label">Admin Staff:</span>
                <span class="data-value">${lead.adminStaffCount} people</span>
            </div>
            <div class="data-row">
                <span class="data-label">Manual Hours/Week:</span>
                <span class="data-value">${lead.manualHoursPerWeek}h</span>
            </div>
            <div class="data-row">
                <span class="data-label">Labor Cost:</span>
                <span class="data-value">${formatCurrency(lead.loadedLaborCost)}/hour</span>
            </div>
            <div class="data-row">
                <span class="data-label">Annual Events:</span>
                <span class="data-value">${formatNumber(lead.annualEvents)}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Avg Member Value:</span>
                <span class="data-value">${formatCurrency(lead.avgMemberValue)}</span>
            </div>
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">💰 VALUE ANALYSIS</div>
            <div class="data-row">
                <span class="data-label">Annual Waste:</span>
                <span class="data-value highlight-currency">${formatCurrency(calculatedValues.annualWaste)}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Potential Savings:</span>
                <span class="data-value highlight-value">${formatCurrency(calculatedValues.laborCostAvoided)}</span>
            </div>
            <div class="data-row">
                <span class="data-label">New Revenue Potential:</span>
                <span class="data-value highlight-value">${formatCurrency(calculatedValues.newRevenuePotential)}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Total Value Created:</span>
                <span class="data-value highlight-value" style="font-size: 18px;">${formatCurrency(calculatedValues.totalValueCreated)}</span>
            </div>
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">💵 PRICING RECOMMENDATIONS</div>
            <div class="pricing-grid">
                <div class="pricing-option" style="background-color: #ffffff !important; color: #1f2937 !important;">
                    <div class="pricing-title">💚 Conservative (${calculatedValues.pricing.conservative.percentage}%)</div>
                    <div class="data-value highlight-currency">${formatCurrency(calculatedValues.pricing.conservative.annualPrice)}/year</div>
                    <div class="roi-highlight">ROI: ${calculatedValues.pricing.conservative.roi.toFixed(0)}%</div>
                </div>
                <div class="pricing-option" style="background-color: #ffffff !important; color: #1f2937 !important;">
                    <div class="pricing-title">🎯 Target (${calculatedValues.pricing.target.percentage}%)</div>
                    <div class="data-value highlight-currency">${formatCurrency(calculatedValues.pricing.target.annualPrice)}/year</div>
                    <div class="roi-highlight">ROI: ${calculatedValues.pricing.target.roi.toFixed(0)}%</div>
                </div>
                <div class="pricing-option" style="background-color: #ffffff !important; color: #1f2937 !important;">
                    <div class="pricing-title">🚀 Aggressive (${calculatedValues.pricing.aggressive.percentage}%)</div>
                    <div class="data-value highlight-currency">${formatCurrency(calculatedValues.pricing.aggressive.annualPrice)}/year</div>
                    <div class="roi-highlight">ROI: ${calculatedValues.pricing.aggressive.roi.toFixed(0)}%</div>
                </div>
                <div class="pricing-option" style="background-color: #ffffff !important; color: #1f2937 !important;">
                    <div class="pricing-title">💎 Premium (${calculatedValues.pricing.premium.percentage}%)</div>
                    <div class="data-value highlight-currency">${formatCurrency(calculatedValues.pricing.premium.annualPrice)}/year</div>
                    <div class="roi-highlight">ROI: ${calculatedValues.pricing.premium.roi.toFixed(0)}%</div>
                </div>
            </div>
        </div>
        
        <div class="alert ${lead.signatureAuthority && lead.signatureAuthority < calculatedValues.pricing.target.annualPrice ? 'alert-warning' : 'alert-success'}">
            ${signatureAlert}
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">🎯 PRICING STRATEGY</div>
            <div class="data-row">
                <span class="data-label">Recommended Approach:</span>
                <span class="data-value highlight-value">${pricingRecommendations.primaryRecommendation.toUpperCase()}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Reasoning:</span>
                <span class="data-value">${pricingRecommendations.reasoning}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Negotiation Range:</span>
                <span class="data-value highlight-currency">${formatCurrency(pricingRecommendations.negotiationRange.floor)} - ${formatCurrency(pricingRecommendations.negotiationRange.ceiling)}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Competitive Position:</span>
                <span class="data-value">${pricingRecommendations.competitivePositioning}</span>
            </div>
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">🚀 PILOT STRATEGY</div>
            <div class="data-row">
                <span class="data-label">Pilot Price:</span>
                <span class="data-value highlight-currency">${formatCurrency(pilotPricing.pilotPrice)} (${pilotPricing.pilotDuration} days)</span>
            </div>
            <div class="data-row">
                <span class="data-label">Conversion Price:</span>
                <span class="data-value highlight-currency">${formatCurrency(pilotPricing.conversionPrice)}</span>
            </div>
            <div class="data-row">
                <span class="data-label">Strategy:</span>
                <span class="data-value">${pilotPricing.pilotStrategy}</span>
            </div>
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">📊 LEAD QUALITY BREAKDOWN</div>
            ${leadAssessment.criteria.map(criterion => `
                <div class="data-row">
                    <span class="data-label">${criterion.criterion}:</span>
                    <span class="data-value status-${criterion.status === 'pass' ? 'pass' : criterion.status === 'warning' ? 'warning' : 'fail'}">
                        ${criterion.status === 'pass' ? '✅' : criterion.status === 'warning' ? '⚠️' : '❌'} ${criterion.message}
                    </span>
                </div>
            `).join('')}
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">💬 PERSONALIZED TALKING POINTS</div>
            <ul class="talking-points">
                ${talkingPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">📞 NEXT STEPS</div>
            <ol class="next-steps">
                <li>Send customer email with PDF (<span class="highlight-value">✅ Done automatically</span>)</li>
                <li>Call within 2 hours: <span class="highlight-currency">${lead.phone || 'Use email contact'}</span></li>
                <li>Reference their specific pain points and value potential</li>
                <li>Propose <span class="highlight-value">${pilotPricing.pilotDuration}-day pilot</span> at <span class="highlight-currency">${formatCurrency(pilotPricing.pilotPrice)}</span></li>
                <li>Schedule pilot kickoff within 1 week</li>
            </ol>
        </div>
        
        <div class="section" style="background-color: #f9fafb !important; color: #1f2937 !important;">
            <div class="section-title">📈 RECOMMENDED PHASE</div>
            <div class="data-value highlight-value" style="font-size: 20px; text-align: center; padding: 15px;">${calculatedValues.recommendedPhase}</div>
        </div>
        
        <div class="footer-highlight">
            <div>
                📎 PDF Value Report attached - Same document sent to customer
            </div>
        </div>
    </div>
</body>
</html>`;

  return {
    subject,
    html,
  };
}