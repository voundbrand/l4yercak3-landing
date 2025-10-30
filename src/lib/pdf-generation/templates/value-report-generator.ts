/**
 * Main PDF generator that combines all page templates
 * Based on requirements 1.1, 1.2, 5.1, 5.4
 */

import { LeadData, CalculatedValues, Language } from '../../value-calculator/types';
import { getLocalizedContent } from '../content';
import { ExecutiveSummaryTemplate } from './page1-executive-summary';
import { TaskBreakdownTemplate } from './page2-task-breakdown';
import { GrowthScenariosTemplate } from './page3-growth-scenarios';
import { PilotMetricsTemplate } from './page4-pilot-metrics';
import { generatePDFFilename } from '../utils/helpers';

export class ValueReportGenerator {
  /**
   * Generate complete 4-page value report PDF
   */
  public static generateValueReport(
    leadData: LeadData,
    calculatedValues: CalculatedValues
  ): Buffer {
    const language = leadData.language || 'en';
    const content = getLocalizedContent(language);
    
    // Create PDF generator instance (using Page 1 template as base)
    const generator = new ExecutiveSummaryTemplate();
    
    try {
      // Generate Page 1: Executive Summary
      generator.generatePage1(leadData, calculatedValues, content);
      
      // Generate Page 2: Task Breakdown
      const taskBreakdownGenerator = new TaskBreakdownTemplate();
      // Copy the document reference to continue on same PDF
      (taskBreakdownGenerator as any).doc = (generator as any).doc;
      taskBreakdownGenerator.generatePage2(leadData, calculatedValues, content);
      
      // Generate Page 3: Growth Scenarios
      const growthScenariosGenerator = new GrowthScenariosTemplate();
      (growthScenariosGenerator as any).doc = (generator as any).doc;
      growthScenariosGenerator.generatePage3(leadData, calculatedValues, content);
      
      // Generate Page 4: Pilot Metrics
      const pilotMetricsGenerator = new PilotMetricsTemplate();
      (pilotMetricsGenerator as any).doc = (generator as any).doc;
      pilotMetricsGenerator.generatePage4(leadData, calculatedValues, content);
      
      // Return PDF as buffer
      return generator.getBuffer();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Generate PDF filename based on organization and date
   */
  public static generateFilename(
    leadData: LeadData
  ): string {
    return generatePDFFilename(leadData.organizationName, leadData.language || 'en');
  }
  
  /**
   * Validate input data before PDF generation
   */
  public static validateInputData(
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
    if (!calculatedValues.totalAnnualHours || calculatedValues.totalAnnualHours <= 0) {
      errors.push('Total annual hours must be positive');
    }
    if (!calculatedValues.potentialFreedHours || calculatedValues.potentialFreedHours <= 0) {
      errors.push('Potential freed hours must be positive');
    }
    
    // Validate language
    if (leadData.language && !['en', 'de'].includes(leadData.language)) {
      errors.push('Language must be either "en" or "de"');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Generate PDF with error handling and validation
   */
  public static async generateValueReportSafe(
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
      const pdf = this.generateValueReport(leadData, calculatedValues);
      const filename = this.generateFilename(leadData);
      
      return {
        success: true,
        pdf,
        filename
      };
      
    } catch (error) {
      console.error('PDF generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown PDF generation error'
      };
    }
  }
}