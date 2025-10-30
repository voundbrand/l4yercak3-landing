/**
 * Comprehensive error handling utilities for API requests
 * Based on requirements 5.4, 5.5
 */

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
  isRetryable?: boolean;
  statusCode?: number;
}

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffMultiplier: 2
};

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calculate exponential backoff delay
 */
function calculateDelay(attempt: number, config: RetryConfig): number {
  const delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt - 1);
  return Math.min(delay, config.maxDelay);
}

/**
 * Determine if an error is retryable
 */
function isRetryableError(error: ApiError): boolean {
  // Explicitly marked as retryable
  if (error.isRetryable === true) return true;
  if (error.isRetryable === false) return false;
  
  // Network errors are usually retryable
  if (!error.statusCode) return true;
  
  // Server errors (5xx) are retryable
  if (error.statusCode >= 500) return true;
  
  // Rate limiting (429) is retryable
  if (error.statusCode === 429) return true;
  
  // Timeout errors are retryable
  if (error.statusCode === 408) return true;
  
  // Client errors (4xx) are generally not retryable
  return false;
}

/**
 * Parse error response from fetch
 */
async function parseErrorResponse(response: Response): Promise<ApiError> {
  let errorData: any = {};
  
  try {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      errorData = await response.json();
    } else {
      errorData = { message: await response.text() };
    }
  } catch {
    // If we can't parse the response, use status text
    errorData = { message: response.statusText || 'Unknown error' };
  }
  
  return {
    message: errorData.error || errorData.message || `HTTP ${response.status}`,
    code: errorData.code,
    details: errorData.details,
    statusCode: response.status,
    isRetryable: response.status >= 500 || response.status === 429 || response.status === 408
  };
}

/**
 * Enhanced fetch with retry logic and comprehensive error handling
 */
export async function fetchWithRetry<T = any>(
  url: string,
  options: RequestInit = {},
  retryConfig: Partial<RetryConfig> = {}
): Promise<ApiResponse<T>> {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  let lastError: ApiError | null = null;
  
  for (let attempt = 1; attempt <= config.maxRetries + 1; attempt++) {
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Success response
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          data
        };
      }
      
      // Error response
      const error = await parseErrorResponse(response);
      lastError = error;
      
      // Don't retry if it's the last attempt or error is not retryable
      if (attempt > config.maxRetries || !isRetryableError(error)) {
        break;
      }
      
      // Wait before retrying
      const delay = calculateDelay(attempt, config);
      console.warn(`API request failed (attempt ${attempt}/${config.maxRetries + 1}), retrying in ${delay}ms:`, error.message);
      await sleep(delay);
      
    } catch (networkError) {
      // Network or timeout errors
      const error: ApiError = {
        message: networkError instanceof Error ? networkError.message : 'Network error',
        isRetryable: true
      };
      
      lastError = error;
      
      // Don't retry if it's the last attempt
      if (attempt > config.maxRetries) {
        break;
      }
      
      // Wait before retrying
      const delay = calculateDelay(attempt, config);
      console.warn(`Network error (attempt ${attempt}/${config.maxRetries + 1}), retrying in ${delay}ms:`, error.message);
      await sleep(delay);
    }
  }
  
  // All retries exhausted
  return {
    success: false,
    error: lastError || {
      message: 'Unknown error occurred',
      isRetryable: false
    }
  };
}

/**
 * User-friendly error messages for different error types
 */
export function getUserFriendlyErrorMessage(error: ApiError, language: 'en' | 'de' = 'en'): string {
  const messages = {
    en: {
      network: "Unable to connect to our servers. Please check your internet connection and try again.",
      timeout: "The request is taking longer than expected. Please try again.",
      serverError: "Our servers are experiencing issues. Please try again in a few minutes.",
      validation: "Please check your information and try again.",
      rateLimit: "Too many requests. Please wait a moment and try again.",
      emailDelivery: "Your report was generated but there was an issue sending the email. Please contact support.",
      pdfGeneration: "There was an issue generating your report. Please try again.",
      unknown: "An unexpected error occurred. Please try again or contact support if the problem persists."
    },
    de: {
      network: "Verbindung zu unseren Servern nicht möglich. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
      timeout: "Die Anfrage dauert länger als erwartet. Bitte versuchen Sie es erneut.",
      serverError: "Unsere Server haben Probleme. Bitte versuchen Sie es in ein paar Minuten erneut.",
      validation: "Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut.",
      rateLimit: "Zu viele Anfragen. Bitte warten Sie einen Moment und versuchen Sie es erneut.",
      emailDelivery: "Ihr Bericht wurde erstellt, aber beim E-Mail-Versand gab es ein Problem. Bitte kontaktieren Sie den Support.",
      pdfGeneration: "Bei der Erstellung Ihres Berichts gab es ein Problem. Bitte versuchen Sie es erneut.",
      unknown: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support."
    }
  };
  
  const msgs = messages[language];
  
  // Determine error type based on status code and message
  if (!error.statusCode) {
    return msgs.network;
  }
  
  if (error.statusCode === 408 || error.message.toLowerCase().includes('timeout')) {
    return msgs.timeout;
  }
  
  if (error.statusCode >= 500) {
    return msgs.serverError;
  }
  
  if (error.statusCode === 429) {
    return msgs.rateLimit;
  }
  
  if (error.statusCode === 400 || error.statusCode === 422) {
    return msgs.validation;
  }
  
  if (error.message.toLowerCase().includes('email')) {
    return msgs.emailDelivery;
  }
  
  if (error.message.toLowerCase().includes('pdf')) {
    return msgs.pdfGeneration;
  }
  
  return msgs.unknown;
}

/**
 * Enhanced error logging for debugging
 */
export function logError(error: ApiError, context: string, additionalData?: any): void {
  const logData = {
    timestamp: new Date().toISOString(),
    context,
    error: {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      isRetryable: error.isRetryable,
      details: error.details
    },
    additionalData
  };
  
  console.error(`[${context}] API Error:`, logData);
  
  // In production, you might want to send this to a logging service
  // Example: sendToLoggingService(logData);
}

/**
 * Validate response data structure
 */
export function validateApiResponse<T>(
  response: any,
  validator: (data: any) => data is T
): ApiResponse<T> {
  if (!response) {
    return {
      success: false,
      error: {
        message: 'Empty response received',
        code: 'EMPTY_RESPONSE'
      }
    };
  }
  
  if (!response.success) {
    return {
      success: false,
      error: {
        message: response.error || 'API request failed',
        code: response.code,
        details: response.details
      }
    };
  }
  
  if (!validator(response.data)) {
    return {
      success: false,
      error: {
        message: 'Invalid response format',
        code: 'INVALID_RESPONSE'
      }
    };
  }
  
  return {
    success: true,
    data: response.data
  };
}

/**
 * Type guard for successful API responses
 */
export function isSuccessResponse<T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: true; data: T } {
  return response.success === true && response.data !== undefined;
}

/**
 * Type guard for error API responses
 */
export function isErrorResponse<T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: false; error: ApiError } {
  return response.success === false && response.error !== undefined;
}