/**
 * Resend API client configuration and utilities
 * Based on requirements 6.2, 5.4, 5.5
 */

import { Resend } from 'resend';

// Initialize Resend client
let resendClient: Resend | null = null;

/**
 * Get or create Resend client instance
 */
export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey || apiKey === 'your_resend_api_key_here') {
      throw new Error('RESEND_API_KEY environment variable is not configured');
    }
    
    resendClient = new Resend(apiKey);
  }
  
  return resendClient;
}

/**
 * Validate Resend API configuration
 */
export async function validateResendConfig(): Promise<{ isValid: boolean; error?: string }> {
  try {
    const client = getResendClient();
    
    // Test API key by attempting to get domains (lightweight operation)
    await client.domains.list();
    
    return { isValid: true };
  } catch (error) {
    console.error('Resend API validation failed:', error);
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown Resend API error'
    };
  }
}

/**
 * Email sending utility with retry logic and error handling
 */
export async function sendEmailWithRetry(
  emailData: {
    from: string;
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
    attachments?: Array<{
      filename: string;
      content: Buffer;
      contentType?: string;
    }>;
  },
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const client = getResendClient();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await client.emails.send({
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        replyTo: emailData.replyTo,
        attachments: emailData.attachments?.map(attachment => ({
          filename: attachment.filename,
          content: attachment.content,
          content_type: attachment.contentType || 'application/octet-stream'
        }))
      });
      
      return {
        success: true,
        messageId: result.data?.id
      };
      
    } catch (error) {
      console.error(`Email send attempt ${attempt} failed:`, error);
      
      // If this is the last attempt, return the error
      if (attempt === maxRetries) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown email sending error'
        };
      }
      
      // Wait before retrying (exponential backoff)
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return {
    success: false,
    error: 'Max retries exceeded'
  };
}

/**
 * Batch email sending utility
 */
export async function sendBatchEmails(
  emails: Array<{
    from: string;
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
    attachments?: Array<{
      filename: string;
      content: Buffer;
      contentType?: string;
    }>;
  }>
): Promise<Array<{ success: boolean; messageId?: string; error?: string }>> {
  const results = [];
  
  // Send emails sequentially to avoid rate limiting
  for (const email of emails) {
    const result = await sendEmailWithRetry(email);
    results.push(result);
    
    // Small delay between emails to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}

/**
 * Get email delivery status (if supported by Resend)
 */
export async function getEmailStatus(messageId: string): Promise<{
  status: string;
  error?: string;
}> {
  try {
    const client = getResendClient();
    
    // Note: This depends on Resend API capabilities
    // May need to be updated based on actual Resend API
    const result = await client.emails.get(messageId);
    
    return {
      status: result.data?.last_event || 'unknown'
    };
    
  } catch (error) {
    console.error('Failed to get email status:', error);
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown status error'
    };
  }
}

/**
 * Validate email address format
 */
export function validateEmailAddress(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize email content to prevent injection
 */
export function sanitizeEmailContent(content: string): string {
  // Basic sanitization - remove potentially dangerous content
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

/**
 * Get sender email configuration
 */
export function getSenderConfig(): {
  customerEmail: string;
  salesEmail: string;
  systemEmail: string;
  pilotEmail: string;
} {
  return {
    customerEmail: 'L4YERCAK3 Sales <sales@mail.l4yercak3.com>',
    salesEmail: 'L4YERCAK3 Value Calculator <calculator@mail.l4yercak3.com>',
    systemEmail: 'L4YERCAK3 System <noreply@mail.l4yercak3.com>',
    pilotEmail: 'L4YERCAK3 Pilot <pilot@mail.l4yercak3.com>'
  };
}

/**
 * Get sales team email from environment
 */
export function getSalesTeamEmail(): string {
  const salesEmail = process.env.SALES_EMAIL;

  if (!salesEmail) {
    console.warn('SALES_EMAIL environment variable not set, using default');
    return 'remington@l4yercak3.com';
  }

  return salesEmail;
}

/**
 * Get reply-to email address from environment
 */
export function getReplyToEmail(): string {
  const replyToEmail = process.env.REPLY_TO_EMAIL;

  if (!replyToEmail) {
    console.warn('REPLY_TO_EMAIL environment variable not set, using default');
    return 'remington@l4yercak3.com';
  }

  return replyToEmail;
}

/**
 * Get Cal.com appointment booking link from environment
 */
export function getCalAppointmentLink(): string {
  const calLink = process.env.CAL_APPT_LINK;

  if (!calLink) {
    console.warn('CAL_APPT_LINK environment variable not set, using default');
    return 'https://cal.com/voundbrand/open-end-meeting';
  }

  return calLink;
}