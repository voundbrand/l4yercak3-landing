/**
 * Client-side API utilities for value report generation
 * Based on requirements 1.1, 2.1, 5.4, 5.5
 */

import { 
  fetchWithRetry, 
  getUserFriendlyErrorMessage, 
  logError, 
  isSuccessResponse,
  type ApiResponse 
} from './error-handling';

export interface ValueReportRequest {
  calculatorInputs: any;
  calculatedValues: any;
  contactInfo: {
    fullName: string;
    email: string;
    phone?: string;
    organizationName: string;
    jobTitle: string;
    signatureAuthority?: number;
    timeline: string;
    language: 'en' | 'de';
  };
}

export interface ValueReportResponse {
  leadId: string;
  pdfFilename: string;
  emailDelivery: {
    customerMessageId: string | null;
    salesMessageId: string | null;
  };
  processingTime: string;
  language: 'en' | 'de';
  totalValue: number;
  leadQuality: string;
  warnings?: string[];
}

export interface ValueReportResult {
  success: boolean;
  data?: ValueReportResponse;
  error?: string;
  isPartialSuccess?: boolean;
  fallbackInstructions?: string;
  canRetry?: boolean;
}

/**
 * Generate value report with comprehensive error handling
 */
export async function generateValueReport(
  request: ValueReportRequest,
  language: 'en' | 'de' = 'en'
): Promise<ValueReportResult> {
  try {
    // Validate request data
    const validationError = validateValueReportRequest(request);
    if (validationError) {
      return {
        success: false,
        error: validationError,
        canRetry: false
      };
    }

    // Make API request with retry logic
    const response: ApiResponse<ValueReportResponse> = await fetchWithRetry(
      '/api/value-report/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language
        },
        body: JSON.stringify(request)
      },
      {
        maxRetries: 2, // Allow 2 retries (3 total attempts)
        baseDelay: 2000, // Start with 2 second delay
        maxDelay: 8000 // Max 8 second delay
      }
    );

    if (isSuccessResponse(response)) {
      return {
        success: true,
        data: response.data,
        isPartialSuccess: response.data.warnings && response.data.warnings.length > 0
      };
    } else {
      const error = response.error!;
      
      // Log error for debugging
      logError(error, 'generateValueReport', {
        email: request.contactInfo.email,
        organizationName: request.contactInfo.organizationName,
        language
      });

      // Check for partial success (PDF generated but email failed)
      if (error.details?.pdfGenerated) {
        const fallbackMessage = error.details.fallbackInstructions?.[language] || 
          error.details.supportMessage ||
          getUserFriendlyErrorMessage(error, language);
        
        return {
          success: false,
          error: fallbackMessage,
          isPartialSuccess: true,
          fallbackInstructions: error.details.fallbackInstructions?.[language],
          canRetry: false // Don't retry for email delivery failures
        };
      }

      // Regular error handling
      const userMessage = getUserFriendlyErrorMessage(error, language);
      
      return {
        success: false,
        error: userMessage,
        canRetry: error.isRetryable !== false
      };
    }

  } catch (networkError) {
    console.error('Unexpected value report generation error:', networkError);
    
    const errorMessage = language === 'de' 
      ? 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
      : 'An unexpected error occurred. Please try again.';
    
    return {
      success: false,
      error: errorMessage,
      canRetry: true
    };
  }
}

/**
 * Validate value report request data
 */
function validateValueReportRequest(request: ValueReportRequest): string | null {
  // Validate contact info
  if (!request.contactInfo.fullName?.trim()) {
    return 'Full name is required';
  }
  
  if (!request.contactInfo.email?.trim()) {
    return 'Email address is required';
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(request.contactInfo.email)) {
    return 'Please enter a valid email address';
  }
  
  if (!request.contactInfo.organizationName?.trim()) {
    return 'Organization name is required';
  }
  
  if (!request.contactInfo.jobTitle?.trim()) {
    return 'Job title is required';
  }
  
  if (!request.contactInfo.timeline?.trim()) {
    return 'Timeline is required';
  }
  
  // Validate calculator inputs
  if (!request.calculatorInputs) {
    return 'Calculator inputs are missing';
  }
  
  if (!request.calculatedValues) {
    return 'Calculated values are missing';
  }
  
  // Validate numeric values
  if (typeof request.calculatedValues.totalValueCreated !== 'number' || 
      request.calculatedValues.totalValueCreated <= 0) {
    return 'Invalid calculated values - please recalculate';
  }
  
  return null; // No validation errors
}

/**
 * Check if the API is healthy
 */
export async function checkValueReportApiHealth(): Promise<{
  isHealthy: boolean;
  services: {
    email: string;
    pdf: string;
  };
  error?: string;
}> {
  try {
    const response = await fetch('/api/value-report/generate', {
      method: 'GET'
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        isHealthy: data.status === 'healthy',
        services: data.services || { email: 'unknown', pdf: 'unknown' }
      };
    } else {
      return {
        isHealthy: false,
        services: { email: 'unknown', pdf: 'unknown' },
        error: `HTTP ${response.status}`
      };
    }
  } catch (error) {
    return {
      isHealthy: false,
      services: { email: 'unknown', pdf: 'unknown' },
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

/**
 * Format processing time for display
 */
export function formatProcessingTime(processingTime: string): string {
  const match = processingTime.match(/(\d+)ms/);
  if (match) {
    const ms = parseInt(match[1]);
    if (ms < 1000) {
      return `${ms}ms`;
    } else {
      return `${(ms / 1000).toFixed(1)}s`;
    }
  }
  return processingTime;
}

/**
 * Format total value for display
 */
export function formatTotalValue(value: number, language: 'en' | 'de' = 'en'): string {
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}