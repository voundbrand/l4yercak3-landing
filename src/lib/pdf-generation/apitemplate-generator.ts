/**
 * API Template.io PDF generator for L4YERCAK3 Value Reports
 * Replaces the manual PDF generation with beautiful API-generated reports
 */

import { LeadData, CalculatedValues, Language } from '../value-calculator/types';
import { createAPITemplateClient, transformDataForTemplate } from './apitemplate-client';
import { VALUE_REPORT_HTML, VALUE_REPORT_CSS } from './templates/value-report-html';
import { SIMPLE_VALUE_REPORT_HTML, SIMPLE_VALUE_REPORT_CSS } from './templates/simple-value-report';
import { getLocalizedContent } from './templates/localized-content';
import { generatePDFFilename } from './utils/helpers';

export class APITemplateValueReportGenerator {
  private client = createAPITemplateClient();

  /**
   * Generate beautiful PDF value report using API Template.io
   */
  async generateValueReport(
    leadData: LeadData,
    calculatedValues: CalculatedValues
  ): Promise<Buffer> {
    try {
      // Transform data for template
      const templateData = transformDataForTemplate(leadData, calculatedValues);

      // Generate filename
      const filename = generatePDFFilename(leadData.organizationName, leadData.language || 'en');

      // Generate PDF using API Template.io (using simplified template for now)
      const pdfBuffer = await this.client.generateAndDownloadPDF(
        SIMPLE_VALUE_REPORT_HTML,
        SIMPLE_VALUE_REPORT_CSS,
        templateData,
        {
          fileName: filename,
          exportType: 'json', // Get download URL first
          outputFormat: 'pdf',
          expiration: 3600, // 1 hour expiration
        }
      );

      return pdfBuffer;

    } catch (error) {
      console.error('API Template.io PDF generation error:', error);
      throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate PDF with comprehensive error handling and validation
   */
  async generateValueReportSafe(
    leadData: LeadData,
    calculatedValues: CalculatedValues
  ): Promise<{ success: boolean; pdf?: Buffer; filename?: string; error?: string }> {
    try {
      // Validate input data
      const validation = this.validateInputData(leadData, calculatedValues);
      if (!validation.isValid) {
        return {
          success: false,
          error: `Validation failed: ${validation.errors.join(', ')}`
        };
      }

      // Generate PDF
      const pdf = await this.generateValueReport(leadData, calculatedValues);
      const filename = generatePDFFilename(leadData.organizationName, leadData.language || 'en');

      return {
        success: true,
        pdf,
        filename
      };

    } catch (error) {
      console.error('API Template.io PDF generation error:', error);

      // Check if it's an API Template.io specific error
      if (error instanceof Error) {
        if (error.message.includes('API Template.io request failed')) {
          return {
            success: false,
            error: 'PDF service temporarily unavailable. Please try again in a few minutes.'
          };
        }

        if (error.message.includes('API key')) {
          return {
            success: false,
            error: 'PDF service configuration error. Please contact support.'
          };
        }
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown PDF generation error'
      };
    }
  }

  /**
   * Validate input data before PDF generation
   */
  private validateInputData(
    leadData: LeadData,
    calculatedValues: CalculatedValues
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate required lead data
    if (!leadData.fullName?.trim()) {
      errors.push('Full name is required');
    }
    if (!leadData.email?.trim()) {
      errors.push('Email is required');
    }
    if (!leadData.organizationName?.trim()) {
      errors.push('Organization name is required');
    }
    if (!leadData.jobTitle?.trim()) {
      errors.push('Job title is required');
    }

    // Validate numeric values
    if (!calculatedValues.totalValueCreated || calculatedValues.totalValueCreated <= 0) {
      errors.push('Total value created must be positive');
    }
    if (!calculatedValues.potentialFreedHours || calculatedValues.potentialFreedHours <= 0) {
      errors.push('Potential freed hours must be positive');
    }
    if (!calculatedValues.laborCostAvoided || calculatedValues.laborCostAvoided <= 0) {
      errors.push('Labor cost avoided must be positive');
    }

    // Validate language
    if (leadData.language && !['en', 'de'].includes(leadData.language)) {
      errors.push('Language must be either "en" or "de"');
    }

    // Validate pricing data (new structure)
    if (!calculatedValues.pricing) {
      errors.push('Pricing data is required');
    } else {
      if (!calculatedValues.pricing.target || calculatedValues.pricing.target.annualPrice <= 0) {
        errors.push('Target pricing must be positive');
      }
    }

    // Validate lead quality score
    if (!calculatedValues.leadQualityScore) {
      errors.push('Lead quality score is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Test API Template.io connection and configuration
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      // Create a minimal test template
      const testHTML = '<h1>Test</h1><p>{{test_message}}</p>';
      const testCSS = '<style>body { font-family: Arial; }</style>';
      const testData = { test_message: 'API Template.io connection test' };

      // Try to generate a simple PDF
      await this.client.generateAndDownloadPDF(testHTML, testCSS, testData, {
        fileName: 'connection-test.pdf',
        exportType: 'json'
      });

      return { success: true };

    } catch (error) {
      console.error('API Template.io connection test failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection test failed'
      };
    }
  }

  /**
   * Get service health status
   */
  async getHealthStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    message: string;
    details?: any;
  }> {
    try {
      const connectionTest = await this.testConnection();

      if (connectionTest.success) {
        return {
          status: 'healthy',
          message: 'API Template.io service is operational'
        };
      } else {
        return {
          status: 'degraded',
          message: 'API Template.io service has issues',
          details: connectionTest.error
        };
      }

    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'API Template.io service is unavailable',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

/**
 * Create singleton instance for the application
 */
let generatorInstance: APITemplateValueReportGenerator | null = null;

export function getAPITemplateGenerator(): APITemplateValueReportGenerator {
  if (!generatorInstance) {
    generatorInstance = new APITemplateValueReportGenerator();
  }
  return generatorInstance;
}

/**
 * Generate PDF filename based on organization and date
 */
export function generateAPITemplateFilename(
  organizationName: string,
  language: Language = 'en'
): string {
  return generatePDFFilename(organizationName, language);
}