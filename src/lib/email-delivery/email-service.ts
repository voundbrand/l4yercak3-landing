/**
 * Main email delivery service for PDF value reports
 * Based on requirements 2.1, 2.4, 3.1, 5.2
 */

import { LeadData, CalculatedValues } from '../value-calculator/types';
import { generateCustomerEmailTemplate } from '../email-templates/customer';
import { generateSalesEmailTemplate } from '../email-templates/sales';
import { sendEmailWithRetry, getSenderConfig, getSalesTeamEmail, getReplyToEmail, getCalAppointmentLink, validateEmailAddress } from './resend-client';

export interface EmailDeliveryResult {
  customerEmail: {
    success: boolean;
    messageId?: string;
    error?: string;
  };
  salesEmail: {
    success: boolean;
    messageId?: string;
    error?: string;
  };
  overallSuccess: boolean;
}

/**
 * Send both customer and sales team emails with PDF attachment
 */
export async function sendValueReportEmails(
  leadData: LeadData,
  calculatedValues: CalculatedValues,
  pdfBuffer: Buffer,
  pdfFilename: string
): Promise<EmailDeliveryResult> {
  const language = leadData.language || 'en';
  const senderConfig = getSenderConfig();
  const salesTeamEmail = getSalesTeamEmail();
  const replyToEmail = getReplyToEmail();

  // Validate email addresses
  if (!validateEmailAddress(leadData.email)) {
    return {
      customerEmail: {
        success: false,
        error: 'Invalid customer email address'
      },
      salesEmail: {
        success: false,
        error: 'Cannot send sales email due to invalid customer email'
      },
      overallSuccess: false
    };
  }

  // Generate email templates
  const customerTemplate = generateCustomerEmailTemplate(leadData, calculatedValues, language);
  const salesTemplate = generateSalesEmailTemplate(leadData, calculatedValues, language);

  // Prepare PDF attachment
  const pdfAttachment = {
    filename: pdfFilename,
    content: pdfBuffer,
    contentType: 'application/pdf'
  };

  // Send customer email
  const customerResult = await sendEmailWithRetry({
    from: senderConfig.customerEmail,
    to: leadData.email,
    subject: customerTemplate.subject,
    html: customerTemplate.html,
    replyTo: replyToEmail,
    attachments: [pdfAttachment]
  });

  // Send sales team email (with same PDF so they see what customer received)
  const salesResult = await sendEmailWithRetry({
    from: senderConfig.salesEmail,
    to: salesTeamEmail,
    subject: salesTemplate.subject,
    html: salesTemplate.html,
    replyTo: replyToEmail,
    attachments: [pdfAttachment]
  });
  
  return {
    customerEmail: customerResult,
    salesEmail: salesResult,
    overallSuccess: customerResult.success && salesResult.success
  };
}

/**
 * Send follow-up email to customer (24 hours later)
 */
export async function sendFollowUpEmail(
  leadData: LeadData,
  calculatedValues: CalculatedValues
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const language = leadData.language || 'en';
  const senderConfig = getSenderConfig();
  const replyToEmail = getReplyToEmail();
  const calLink = getCalAppointmentLink();
  const firstName = leadData.fullName.split(' ')[0];
  
  const subject = language === 'de' 
    ? `Re: ${formatCurrency(calculatedValues.totalValueCreated, language)} Wertpotenzial - Kurze Frage`
    : `Re: ${formatCurrency(calculatedValues.totalValueCreated, language)} value opportunity - Quick question`;
  
  const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <p>${language === 'de' ? 'Hallo' : 'Hi'} ${firstName},</p>
    
    <p>
        ${language === 'de' 
          ? `Ich wollte bezüglich Ihres Wertberichts nachfassen. Ich habe bemerkt, dass Ihr Zeitplan "${leadData.timeline}" ist - ich bin neugierig, was Sie dazu veranlasst hat, jetzt Automatisierungsoptionen zu erkunden?`
          : `I wanted to follow up on your value report. I noticed your timeline is "${leadData.timeline}" - I'm curious what triggered you to explore automation options now?`
        }
    </p>
    
    <p>
        ${language === 'de'
          ? `Im Bericht haben wir ${formatCurrency(calculatedValues.annualWaste, language)} jährliche Verschwendung bei manuellen Aufgaben hervorgehoben. Die meisten Netzwerke in Ihrer Situation beginnen mit unserem 90-Tage-Pilot, um die Zeitersparnis zu beweisen, bevor sie sich zu einem vollständigen Jahresvertrag verpflichten.`
          : `In the report, we highlighted ${formatCurrency(calculatedValues.annualWaste, language)} in annual waste on manual tasks. Most networks in your situation start with our 90-day pilot to prove the time savings before committing to a full annual contract.`
        }
    </p>
    
    <p>
        ${language === 'de'
          ? 'Würde ein 15-minütiges Erkundungsgespräch diese Woche Sinn machen?'
          : 'Would a 15-minute exploratory call make sense this week?'
        }
    </p>
    
    <div style="text-align: center; margin: 25px 0;">
        <a href="${calLink}" class="cta-button">
            ${language === 'de' ? 'Gespräch vereinbaren' : 'Schedule Call'}
        </a>
    </div>
    
    <p>
        ${language === 'de' ? 'Beste Grüße,' : 'Best regards,'}<br>
        L4YERCAK3 Team
    </p>
</body>
</html>`;
  
  return await sendEmailWithRetry({
    from: senderConfig.customerEmail,
    to: leadData.email,
    subject,
    html,
    replyTo: replyToEmail
  });
}

/**
 * Send abandoned calculator email (for users who didn't complete)
 */
export async function sendAbandonedCalculatorEmail(
  partialData: {
    email: string;
    organizationSize?: number;
    estimatedValue?: number;
    language?: string;
  }
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const language = (partialData.language as 'en' | 'de') || 'en';
  const senderConfig = getSenderConfig();
  const replyToEmail = getReplyToEmail();
  
  const subject = language === 'de'
    ? `Noch neugierig auf Ihr ${partialData.estimatedValue ? formatCurrency(partialData.estimatedValue, language) : '€100K+'} Potenzial?`
    : `Still curious about your ${partialData.estimatedValue ? formatCurrency(partialData.estimatedValue, language) : '€100K+'} opportunity?`;
  
  const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <p>${language === 'de' ? 'Hallo,' : 'Hi there,'}</p>
    
    <p>
        ${language === 'de'
          ? 'Sie haben früher begonnen, den Automatisierungswert Ihrer Organisation zu berechnen, aber den Bericht nicht fertiggestellt. Kein Problem - wir haben Ihren Fortschritt gespeichert.'
          : 'You started calculating your organization\'s automation value earlier, but didn\'t finish the report. No worries - we saved your progress.'
        }
    </p>
    
    ${partialData.organizationSize ? `
    <p>
        ${language === 'de'
          ? `Basierend auf dem, was Sie eingegeben haben:`
          : `Based on what you entered:`
        }
    </p>
    <ul>
        <li>${partialData.organizationSize} ${language === 'de' ? 'Mitarbeiter' : 'employees'}</li>
        ${partialData.estimatedValue ? `<li>${language === 'de' ? 'Geschätztes Potenzial:' : 'Estimated potential:'} ${formatCurrency(partialData.estimatedValue, language)}</li>` : ''}
    </ul>
    ` : ''}
    
    <p>
        ${language === 'de'
          ? 'Möchten Sie die vollständige Aufschlüsselung sehen? Beenden Sie Ihre Wertbewertung:'
          : 'Want to see the full breakdown? Finish your value assessment:'
        }
    </p>
    
    <div style="text-align: center; margin: 25px 0;">
        <a href="https://l4yercak3.com/go-to-market" class="cta-button">
            ${language === 'de' ? 'Wertbewertung fortsetzen' : 'Continue Your Value Assessment'}
        </a>
    </div>
    
    <p style="font-size: 14px; color: #6b7280;">
        ${language === 'de'
          ? 'Dauert 2 Minuten. Keine Verpflichtung erforderlich.'
          : 'Takes 2 minutes. No commitment required.'
        }
    </p>
    
    <p>
        - ${language === 'de' ? 'Das L4YERCAK3 Team' : 'The L4YERCAK3 Team'}
    </p>
</body>
</html>`;
  
  return await sendEmailWithRetry({
    from: senderConfig.systemEmail,
    to: partialData.email,
    subject,
    html,
    replyTo: replyToEmail
  });
}

// Helper function for formatting currency in email templates
function formatCurrency(amount: number, language: string): string {
  if (language === 'de') {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
}