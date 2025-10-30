/**
 * Page 1: Executive Summary PDF template
 * Based on requirements 1.1, 1.3, 1.4
 */

import { BasePDFTemplate } from './base';
import { LeadData, CalculatedValues, LocalizedContent } from '../../value-calculator/types';
import { generateContentReplacements, replaceContentPlaceholders, replaceContentArrayPlaceholders } from '../content/replacements';

// Helper function to safely format numbers
function safeToLocaleString(value: number | undefined, locale: string, options?: Intl.NumberFormatOptions): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '0';
  }
  return value.toLocaleString(locale, options);
}

export class ExecutiveSummaryTemplate extends BasePDFTemplate {
  /**
   * Generate Page 1: Executive Summary
   */
  public generatePage1(
    leadData: LeadData,
    calculatedValues: CalculatedValues,
    content: LocalizedContent
  ): void {
    const replacements = generateContentReplacements(leadData, calculatedValues, leadData.language || 'en');
    
    // Add header with organization name
    this.addHeader(content.pdf.title, leadData.organizationName);
    
    let currentY = this.getContentStartY(true);
    
    // Contact information section
    currentY = this.addContactInfo(leadData, currentY, replacements);
    
    // Value opportunity highlight box
    currentY = this.addValueOpportunityBox(
      replaceContentPlaceholders(content.pdf.executiveSummary.valueOpportunity, replacements),
      calculatedValues,
      currentY,
      leadData.language || 'en'
    );
    
    // Current situation vs L4YERCAK3 comparison
    currentY = this.addSituationComparison(
      content.pdf.executiveSummary,
      replacements,
      currentY
    );
    
    // Redacted pricing section
    currentY = this.addPricingSection(
      replaceContentPlaceholders(content.pdf.executiveSummary.pricingRedacted, replacements),
      currentY
    );
    
    // Call to action
    this.addCallToAction(
      content.pdf.executiveSummary.callToAction,
      currentY
    );
    
    // Add footer
    this.addFooter(1);
  }
  
  /**
   * Add contact information section
   */
  private addContactInfo(
    leadData: LeadData,
    startY: number,
    replacements: any
  ): number {
    const contactInfo = [
      `Prepared for: ${leadData.fullName}, ${leadData.jobTitle}`,
      `Organization: ${leadData.organizationName}`,
      `Date: ${replacements.currentDate}`,
      `Email: ${leadData.email}`
    ];
    
    this.doc.setFontSize(this.styles.fonts.small.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.gray);
    
    let currentY = startY;
    for (const info of contactInfo) {
      this.doc.text(info, this.config.margins.left, currentY);
      currentY += this.styles.fonts.small.size * this.styles.spacing.lineHeight;
    }
    
    return currentY + this.styles.spacing.sectionGap;
  }
  
  /**
   * Add professional value opportunity highlight box
   */
  private addValueOpportunityBox(
    title: string,
    calculatedValues: CalculatedValues,
    startY: number,
    language: string
  ): number {
    const boxWidth = this.config.pageWidth - this.config.margins.left - this.config.margins.right;
    const boxHeight = 55;
    const x = this.config.margins.left;
    
    // Shadow effect
    this.setFillColor('#1e40af');
    this.doc.roundedRect(x + 3, startY + 3, boxWidth, boxHeight, 8, 8, 'F');
    
    // Gradient background effect (simulate with multiple rectangles)
    this.setFillColor(this.colors.primary);
    this.doc.roundedRect(x, startY, boxWidth, boxHeight, 8, 8, 'F');
    
    // Lighter overlay for gradient effect
    this.setFillColor(this.colors.primaryLight);
    this.doc.roundedRect(x, startY, boxWidth, boxHeight / 3, 8, 8, 'F');
    this.doc.rect(x, startY + boxHeight / 3 - 4, boxWidth, 8, 'F');
    
    // Title with better typography
    this.doc.setFontSize(this.styles.fonts.heading.size);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(255, 255, 255);
    const titleWidth = this.doc.getTextWidth(title);
    this.doc.text(title, x + (boxWidth - titleWidth) / 2, startY + 18);
    
    // Value amount with enhanced styling
    const valueText = language === 'de' 
      ? `€${safeToLocaleString(calculatedValues.totalValueCreated, 'de-DE')}/Jahr`
      : `€${safeToLocaleString(calculatedValues.totalValueCreated, 'en-US')}/year`;
    
    this.doc.setFontSize(32);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(255, 255, 255);
    const valueWidth = this.doc.getTextWidth(valueText);
    this.doc.text(valueText, x + (boxWidth - valueWidth) / 2, startY + 42);
    
    // Subtle accent line at bottom
    this.setFillColor('#fbbf24');
    this.doc.roundedRect(x + 20, startY + boxHeight - 4, boxWidth - 40, 2, 1, 1, 'F');
    
    return startY + boxHeight + this.styles.spacing.sectionGap * 2;
  }
  
  /**
   * Add professional current situation vs L4YERCAK3 comparison
   */
  private addSituationComparison(
    executiveSummary: any,
    replacements: any,
    startY: number
  ): number {
    const columnWidth = (this.config.pageWidth - this.config.margins.left - this.config.margins.right - 20) / 2;
    
    // Current situation (left column)
    const currentSituation = replaceContentArrayPlaceholders(
      executiveSummary.currentSituation,
      replacements
    );
    
    const withL4yercak3 = replaceContentArrayPlaceholders(
      executiveSummary.withL4yercak3,
      replacements
    );
    
    let currentY = startY;
    
    // Section title
    this.doc.setFontSize(this.styles.fonts.heading.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.text);
    this.doc.text('Transformation Overview', this.config.margins.left, currentY);
    currentY += this.styles.spacing.sectionGap + 5;
    
    // Current Situation card (left)
    currentY = this.addCard(
      '❌ Current Challenges',
      currentSituation,
      this.config.margins.left,
      currentY,
      columnWidth,
      this.colors.danger
    );
    
    // With L4YERCAK3 card (right side)
    this.addCard(
      '✅ With L4YERCAK3',
      withL4yercak3,
      this.config.margins.left + columnWidth + 20,
      startY + this.styles.spacing.sectionGap + 5,
      columnWidth,
      this.colors.success
    );
    
    return currentY;
  }
  
  /**
   * Add redacted pricing section
   */
  private addPricingSection(
    pricingText: string,
    startY: number
  ): number {
    const boxWidth = this.config.pageWidth - this.config.margins.left - this.config.margins.right;
    
    return this.addInfoBox(
      'Investment & Pricing',
      [pricingText, 'Custom proposal based on your specific needs and timeline'],
      this.config.margins.left,
      startY,
      boxWidth,
      this.colors.warning
    );
  }
  
  /**
   * Add professional call to action section
   */
  private addCallToAction(
    ctaText: string,
    startY: number
  ): void {
    const boxWidth = this.config.pageWidth - this.config.margins.left - this.config.margins.right;
    const boxHeight = 45;
    const x = this.config.margins.left;
    
    // CTA background box
    this.setFillColor(this.colors.gradientStart);
    this.doc.roundedRect(x, startY, boxWidth, boxHeight, 8, 8, 'F');
    
    // Border
    this.setDrawColor(this.colors.primary);
    this.doc.setLineWidth(2);
    this.doc.roundedRect(x, startY, boxWidth, boxHeight, 8, 8, 'S');
    
    // CTA Button with enhanced styling
    const buttonWidth = 100;
    const buttonHeight = 16;
    const buttonX = (this.config.pageWidth - buttonWidth) / 2;
    const buttonY = startY + 8;
    
    // Button shadow
    this.setFillColor('#1e40af');
    this.doc.roundedRect(buttonX + 2, buttonY + 2, buttonWidth, buttonHeight, 4, 4, 'F');
    
    // Button background
    this.setFillColor(this.colors.primary);
    this.doc.roundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 4, 4, 'F');
    
    // Button text
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(255, 255, 255);
    
    const textWidth = this.doc.getTextWidth(ctaText);
    const textX = buttonX + (buttonWidth - textWidth) / 2;
    const textY = buttonY + buttonHeight / 2 + 3;
    
    this.doc.text(ctaText, textX, textY);
    
    // Contact information with better styling
    this.doc.setFontSize(this.styles.fonts.small.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.textLight);
    
    const contactText = '📞 Contact us to schedule your personalized consultation';
    const contactWidth = this.doc.getTextWidth(contactText);
    this.doc.text(
      contactText,
      (this.config.pageWidth - contactWidth) / 2,
      startY + 35
    );
  }
}