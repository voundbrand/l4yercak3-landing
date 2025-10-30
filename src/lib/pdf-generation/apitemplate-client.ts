/**
 * API Template.io client for generating beautiful PDF reports
 * Based on the API specification and value calculator requirements
 */

import { LeadData, CalculatedValues } from '../value-calculator/types';
import { getLocalizedContent } from './templates/localized-content';
import { formatDateForPDF, numberToLocaleString } from '../value-calculator/i18n-bridge';

export interface APITemplateConfig {
  apiKey: string;
  baseUrl: string;
  templateId?: string;
}

export interface PDFGenerationOptions {
  exportType?: 'json' | 'file';
  outputFormat?: 'pdf' | 'html';
  fileName?: string;
  expiration?: number;
  async?: boolean;
}

export interface APITemplateResponse {
  status: 'success' | 'error';
  download_url?: string;
  message?: string;
  error?: string;
  transaction_ref?: string;
}

export class APITemplateClient {
  private config: APITemplateConfig;

  constructor(config: APITemplateConfig) {
    this.config = config;
  }

  /**
   * Generate PDF from HTML template with data
   */
  async generatePDFFromHTML(
    htmlContent: string,
    cssContent: string,
    data: Record<string, any>,
    options: PDFGenerationOptions = {}
  ): Promise<APITemplateResponse> {
    const url = new URL('/v2/create-pdf-from-html', this.config.baseUrl);
    
    // Add query parameters
    if (options.exportType) url.searchParams.set('export_type', options.exportType);
    if (options.outputFormat) url.searchParams.set('output_format', options.outputFormat);
    if (options.fileName) url.searchParams.set('file_name', options.fileName);
    if (options.expiration) url.searchParams.set('expiration', options.expiration.toString());
    if (options.async) url.searchParams.set('async', options.async.toString());

    const requestBody = {
      body: htmlContent,
      css: cssContent,
      data: data,
      settings: {
        paper_size: 'A4',
        orientation: '1', // Portrait
        margin_top: '20mm',
        margin_bottom: '20mm', 
        margin_left: '20mm',
        margin_right: '20mm',
        print_background: true,
        display_header_footer: false,
        page_ranges: '',
        scale: 1.0,
      }
    };

    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.config.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API Template.io request failed: ${response.status} ${response.statusText}`);
      }

      const result: APITemplateResponse = await response.json();
      return result;

    } catch (error) {
      console.error('API Template.io generation error:', error);
      throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate PDF using a pre-created template
   */
  async generatePDFFromTemplate(
    templateId: string,
    data: Record<string, any>,
    options: PDFGenerationOptions = {}
  ): Promise<APITemplateResponse> {
    const url = new URL('/v2/create-pdf', this.config.baseUrl);
    
    // Add query parameters
    url.searchParams.set('template_id', templateId);
    if (options.exportType) url.searchParams.set('export_type', options.exportType);
    if (options.outputFormat) url.searchParams.set('output_format', options.outputFormat);
    if (options.fileName) url.searchParams.set('file_name', options.fileName);
    if (options.expiration) url.searchParams.set('expiration', options.expiration.toString());
    if (options.async) url.searchParams.set('async', options.async.toString());

    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.config.apiKey,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API Template.io request failed: ${response.status} ${response.statusText}`);
      }

      const result: APITemplateResponse = await response.json();
      return result;

    } catch (error) {
      console.error('API Template.io generation error:', error);
      throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Download PDF from URL and return as Buffer
   */
  async downloadPDF(downloadUrl: string): Promise<Buffer> {
    try {
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.status} ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);

    } catch (error) {
      console.error('PDF download error:', error);
      throw new Error(`PDF download failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate and download PDF in one step
   */
  async generateAndDownloadPDF(
    htmlContent: string,
    cssContent: string,
    data: Record<string, any>,
    options: PDFGenerationOptions = {}
  ): Promise<Buffer> {
    // Force export_type to 'json' to get download URL
    const generateOptions = { ...options, exportType: 'json' as const };
    
    const result = await this.generatePDFFromHTML(htmlContent, cssContent, data, generateOptions);
    
    if (result.status !== 'success' || !result.download_url) {
      throw new Error(`PDF generation failed: ${result.error || result.message || 'Unknown error'}`);
    }

    return await this.downloadPDF(result.download_url);
  }
}

/**
 * Create configured API Template.io client
 */
export function createAPITemplateClient(): APITemplateClient {
  const apiKey = process.env.APITEMPLATE_API_KEY;
  const baseUrl = process.env.APITEMPLATE_BASE_URL || 'https://rest.apitemplate.io';

  if (!apiKey) {
    throw new Error('APITEMPLATE_API_KEY environment variable is required. Please add your API key to .env.local');
  }

  return new APITemplateClient({
    apiKey,
    baseUrl,
  });
}

/**
 * Transform value calculator data for API Template.io
 */
export function transformDataForTemplate(
  leadData: LeadData,
  calculatedValues: CalculatedValues
): Record<string, any> {
  // Calculate some derived values for the template
  const potentialFreedWeeklyHours = Math.round(calculatedValues.potentialFreedHours / 52);
  const newMembersAcquired = Math.round(calculatedValues.newRevenuePotential / leadData.avgMemberValue * 0.3); // Estimate 30% from new members
  
  // Create task breakdown for visualization (estimated distribution)
  const taskBreakdown = {
    eventCoordination: {
      annualHours: Math.round(calculatedValues.totalAnnualHours * 0.30),
      annualCost: Math.round(calculatedValues.annualWaste * 0.30),
      percentage: 30,
    },
    memberCommunication: {
      annualHours: Math.round(calculatedValues.totalAnnualHours * 0.25),
      annualCost: Math.round(calculatedValues.annualWaste * 0.25),
      percentage: 25,
    },
    complianceReporting: {
      annualHours: Math.round(calculatedValues.totalAnnualHours * 0.20),
      annualCost: Math.round(calculatedValues.annualWaste * 0.20),
      percentage: 20,
    },
    financialAdmin: {
      annualHours: Math.round(calculatedValues.totalAnnualHours * 0.15),
      annualCost: Math.round(calculatedValues.annualWaste * 0.15),
      percentage: 15,
    },
    dataManagement: {
      annualHours: Math.round(calculatedValues.totalAnnualHours * 0.10),
      annualCost: Math.round(calculatedValues.annualWaste * 0.10),
      percentage: 10,
    },
  };

  // Get localized content
  const language = leadData.language || 'en';
  const content = getLocalizedContent(language);
  
  // Format numbers according to locale
  const formatNumber = (num: number) => numberToLocaleString(num, language);
  const formatCurrency = (amount: number) => {
    const locale = language === 'de' ? 'de-DE' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Generate localized text content
  const executiveSummaryText = content.page1.executiveSummaryText({
    annualWaste: formatCurrency(calculatedValues.annualWaste),
    potentialFreedHours: formatNumber(calculatedValues.potentialFreedHours),
    conservativeNewRevenue: formatCurrency(calculatedValues.newRevenuePotential),
    companyName: content.companyName,
  });
  
  const impactDescription = content.page2.impactStatement.description(
    formatNumber(calculatedValues.potentialFreedHours)
  );
  
  const readyDescription = content.page3.readyDescription({
    timeline: leadData.timeline,
    totalValue: formatCurrency(calculatedValues.totalValueCreated),
  });

  return {
    // Lead information
    fullName: leadData.fullName,
    email: leadData.email,
    organizationName: leadData.organizationName,
    jobTitle: leadData.jobTitle,
    phone: leadData.phone || '',
    industryType: leadData.industryType,
    timeline: leadData.timeline,
    
    // Calculated values (formatted for display)
    totalValueCreated: formatNumber(calculatedValues.totalValueCreated),
    laborCostAvoided: formatNumber(calculatedValues.laborCostAvoided),
    conservativeNewRevenue: formatNumber(calculatedValues.newRevenuePotential),
    potentialFreedHours: formatNumber(calculatedValues.potentialFreedHours),
    potentialFreedWeeklyHours: formatNumber(potentialFreedWeeklyHours),
    annualWaste: formatNumber(calculatedValues.annualWaste),
    
    // Revenue breakdown (estimated from total new revenue potential)
    memberRevenue: formatNumber(Math.round(calculatedValues.newRevenuePotential * 0.35)),
    newProgramRevenue: formatNumber(Math.round(calculatedValues.newRevenuePotential * 0.25)),
    partnershipRevenue: formatNumber(Math.round(calculatedValues.newRevenuePotential * 0.20)),
    churnReductionRevenue: formatNumber(Math.round(calculatedValues.newRevenuePotential * 0.20)),
    newMembersAcquired: formatNumber(newMembersAcquired),
    
    // Task breakdown for charts (formatted)
    taskBreakdown: {
      eventCoordination: {
        annualHours: formatNumber(taskBreakdown.eventCoordination.annualHours),
        annualCost: formatNumber(taskBreakdown.eventCoordination.annualCost),
        percentage: taskBreakdown.eventCoordination.percentage,
      },
      memberCommunication: {
        annualHours: formatNumber(taskBreakdown.memberCommunication.annualHours),
        annualCost: formatNumber(taskBreakdown.memberCommunication.annualCost),
        percentage: taskBreakdown.memberCommunication.percentage,
      },
      complianceReporting: {
        annualHours: formatNumber(taskBreakdown.complianceReporting.annualHours),
        annualCost: formatNumber(taskBreakdown.complianceReporting.annualCost),
        percentage: taskBreakdown.complianceReporting.percentage,
      },
      financialAdmin: {
        annualHours: formatNumber(taskBreakdown.financialAdmin.annualHours),
        annualCost: formatNumber(taskBreakdown.financialAdmin.annualCost),
        percentage: taskBreakdown.financialAdmin.percentage,
      },
      dataManagement: {
        annualHours: formatNumber(taskBreakdown.dataManagement.annualHours),
        annualCost: formatNumber(taskBreakdown.dataManagement.annualCost),
        percentage: taskBreakdown.dataManagement.percentage,
      },
    },
    
    // Localized content
    content: content,
    
    // Pre-formatted text content
    executiveSummaryText: executiveSummaryText,
    impactDescription: impactDescription,
    readyDescription: readyDescription,
    
    // Impact activities (localized)
    impactActivity1: content.page2.impactStatement.activities[0],
    impactActivity2: content.page2.impactStatement.activities[1],
    impactActivity3: content.page2.impactStatement.activities[2],
    impactActivity4: content.page2.impactStatement.activities[3],
    impactActivity5: content.page2.impactStatement.activities[4],
    
    // Lead quality and pricing info
    leadQualityScore: calculatedValues.leadQualityScore,
    recommendedPhase: calculatedValues.recommendedPhase,
    targetPricing: calculatedValues.pricing.target,
    
    // Current date (localized)
    reportDate: formatDateForPDF(new Date(), language),
    
    // Company branding
    companyName: content.companyName,
    companyWebsite: 'https://l4yercak3.com',
    supportEmail: 'support@l4yercak3.com',
  };
}