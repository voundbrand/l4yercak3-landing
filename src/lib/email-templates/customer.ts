/**
 * Customer email template for PDF value reports
 * Based on requirements 2.2, 2.3, 2.5
 */

import { LeadData, CalculatedValues, Language } from '../value-calculator/types';
import { getLocalizedContent } from '../pdf-generation/content';
import { formatCurrencyLikeCalculator, formatNumberLikeCalculator } from '../value-calculator/i18n-bridge';

// Create wrapper functions for consistency
const formatCurrency = (amount: number) => formatCurrencyLikeCalculator(amount);
const formatNumber = (num: number) => formatNumberLikeCalculator(num);

export function generateCustomerEmailTemplate(
  lead: LeadData,
  calculatedValues: CalculatedValues,
  language: Language
): {
  subject: string;
  html: string;
} {
  const content = getLocalizedContent(language);
  const firstName = lead.fullName.split(' ')[0];
  
  const subject = `${content.email.customer.subject} - ${formatCurrency(calculatedValues.totalValueCreated)} ${language === 'de' ? 'Potenzial' : 'Opportunity'}`;
  
  const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #2563eb;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }
        .greeting {
            font-size: 18px;
            color: #2563eb;
            margin-bottom: 20px;
        }
        .highlight-box {
            background-color: #eff6ff;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .highlight-item {
            margin: 10px 0;
            padding-left: 20px;
            position: relative;
        }
        .highlight-item::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #059669;
            font-weight: bold;
        }
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .cta-button:hover {
            background-color: #1d4ed8;
        }
        .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }
        .ps {
            font-style: italic;
            color: #6b7280;
            margin-top: 15px;
            font-size: 14px;
        }
        .value-highlight {
            font-size: 24px;
            font-weight: bold;
            color: #059669;
            text-align: center;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">L4YERCAK3</div>
            <div style="color: #6b7280;">Modern Automation Solutions</div>
        </div>
        
        <div class="greeting">
            ${content.email.customer.greeting.replace('!', `, ${firstName}!`)}
        </div>
        
        <div class="highlight-box">
            <div class="value-highlight">
                ${formatCurrency(calculatedValues.totalValueCreated)}
            </div>
            <div style="font-size: 16px; color: #2563eb; margin-top: 5px;">
                ${language === 'de' ? 'Jährliches Wertpotenzial für' : 'Annual Value Opportunity for'} ${lead.organizationName}
            </div>
        </div>
        
        <div style="margin: 25px 0;">
            <p style="font-size: 16px; margin-bottom: 15px;">
                ${language === 'de' 
                  ? 'Ihre personalisierte Wertanalyse zeigt erhebliches Potenzial:'
                  : 'Your personalized value analysis shows significant potential:'
                }
            </p>
            ${content.email.customer.highlights.map(highlight => 
                `<div class="highlight-item">${highlight}</div>`
            ).join('')}
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #2563eb; margin: 0 0 15px 0;">
                ${language === 'de' ? 'Wichtige Erkenntnisse:' : 'Key Insights:'}
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <div style="font-weight: bold; color: #dc2626;">
                        ${formatCurrency(calculatedValues.annualWaste)}
                    </div>
                    <div style="font-size: 14px; color: #6b7280;">
                        ${language === 'de' ? 'Jährlich verschwendet' : 'Wasted annually'}
                    </div>
                </div>
                <div>
                    <div style="font-weight: bold; color: #059669;">
                        ${formatNumber(calculatedValues.potentialFreedHours)} ${language === 'de' ? 'Stunden' : 'hours'}
                    </div>
                    <div style="font-size: 14px; color: #6b7280;">
                        ${language === 'de' ? 'Können freigesetzt werden' : 'Can be freed up'}
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin: 25px 0;">
            <strong style="font-size: 16px;">${content.email.customer.nextSteps}</strong>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://cal.com/voundbrand/open-end-meeting" class="cta-button">${content.email.customer.cta}</a>
        </div>
        
        <div style="background-color: #eff6ff; padding: 15px; border-radius: 6px; margin: 25px 0;">
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
                <strong>${language === 'de' ? '📎 Anhang:' : '📎 Attachment:'}</strong>
                ${language === 'de' 
                  ? 'Ihr detaillierter 4-seitiger Wertanalyse-Bericht mit spezifischen Empfehlungen für Ihre Organisation.'
                  : 'Your detailed 4-page value analysis report with specific recommendations for your organization.'
                }
            </p>
        </div>
        
        <div class="signature">
            ${content.email.customer.signature.replace('\n', '<br>')}
        </div>
        
        <div class="ps">
            ${content.email.customer.ps}
        </div>
    </div>
</body>
</html>`;

  return {
    subject,
    html,
  };
}