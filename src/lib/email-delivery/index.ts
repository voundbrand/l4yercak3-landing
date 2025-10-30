/**
 * Email delivery system exports
 * Based on requirements 2.1, 2.4, 3.1, 5.2
 */

export {
  sendValueReportEmails,
  sendFollowUpEmail,
  sendAbandonedCalculatorEmail,
  type EmailDeliveryResult
} from './email-service';

export {
  getResendClient,
  validateResendConfig,
  sendEmailWithRetry,
  sendBatchEmails,
  getEmailStatus,
  validateEmailAddress,
  sanitizeEmailContent,
  getSenderConfig,
  getSalesTeamEmail
} from './resend-client';