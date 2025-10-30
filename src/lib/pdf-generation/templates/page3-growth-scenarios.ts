/**
 * Page 3: Growth Scenarios PDF template
 * Based on requirements 1.1, 1.3
 */

import { BasePDFTemplate } from './base';
import { LeadData, CalculatedValues, LocalizedContent, Language } from '../../value-calculator/types';
import { generateGrowthScenarioData } from '../content/replacements';

// Helper function to safely format numbers
function safeToLocaleString(value: number | undefined, locale: string, options?: Intl.NumberFormatOptions): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '0';
  }
  return value.toLocaleString(locale, options);
}

export class GrowthScenariosTemplate extends BasePDFTemplate {
  /**
   * Generate Page 3: Growth Scenarios
   */
  public generatePage3(
    leadData: LeadData,
    calculatedValues: CalculatedValues,
    content: LocalizedContent
  ): void {
    // Add new page
    this.addNewPage();
    
    // Add header
    this.addHeader(content.pdf.growthScenarios.title);
    
    let currentY = this.getContentStartY();
    
    // Introduction section
    currentY = this.addGrowthIntroduction(calculatedValues, currentY, leadData.language || 'en');
    
    // Growth opportunities breakdown
    currentY = this.addGrowthOpportunities(calculatedValues, currentY, leadData.language || 'en');
    
    // Scenario comparison
    currentY = this.addScenarioComparison(calculatedValues, currentY, leadData.language || 'en');
    
    // ROI timeline
    this.addROITimeline(calculatedValues, currentY, leadData.language || 'en');
    
    // Add footer
    this.addFooter(3);
  }
  
  /**
   * Add growth introduction section
   */
  private addGrowthIntroduction(
    calculatedValues: CalculatedValues,
    startY: number,
    language: string
  ): number {
    const freedHours = calculatedValues.potentialFreedHours;
    const weeklyHours = Math.round(freedHours / 52);
    
    const introText = language === 'de' 
      ? [
          `Mit ${safeToLocaleString(freedHours, 'de-DE')} freigesetzten Stunden pro Jahr`,
          `(${weeklyHours} Stunden pro Woche) kann Ihr Team sich auf`,
          'strategische Wachstumsinitiativen konzentrieren.',
          '',
          'Hier sind die konkreten Umsatzmöglichkeiten:'
        ]
      : [
          `With ${safeToLocaleString(freedHours, 'en-US')} hours freed annually`,
          `(${weeklyHours} hours per week), your team can focus on`,
          'strategic growth initiatives.',
          '',
          'Here are the concrete revenue opportunities:'
        ];
    
    return this.addSection('', introText, startY);
  }
  
  /**
   * Add growth opportunities breakdown
   */
  private addGrowthOpportunities(
    calculatedValues: CalculatedValues,
    startY: number,
    language: Language
  ): number {
    const growthData = generateGrowthScenarioData(calculatedValues, language);
    
    let currentY = startY;
    
    // Member Acquisition
    currentY = this.addOpportunityBox(
      language === 'de' ? 'Mitgliedergewinnung' : 'Member Acquisition',
      [
        `${growthData.memberAcquisition.hours} ${language === 'de' ? 'Stunden für gezieltes Outreach' : 'hours for targeted outreach'}`,
        `${growthData.memberAcquisition.newMembers} ${language === 'de' ? 'neue Mitglieder erwartet' : 'new members expected'}`,
        `${growthData.memberAcquisition.revenue} ${language === 'de' ? 'zusätzlicher Umsatz' : 'additional revenue'}`
      ],
      this.config.margins.left,
      currentY,
      85,
      this.colors.success
    );
    
    // Program Development
    currentY = this.addOpportunityBox(
      language === 'de' ? 'Programmentwicklung' : 'Program Development',
      [
        growthData.programDevelopment.description,
        `${growthData.programDevelopment.revenue} ${language === 'de' ? 'Programmumsatz' : 'program revenue'}`
      ],
      this.config.margins.left + 95,
      startY,
      85,
      this.colors.primary
    );
    
    // Corporate Partnerships
    currentY = Math.max(currentY, this.addOpportunityBox(
      language === 'de' ? 'Unternehmenspartnerschaften' : 'Corporate Partnerships',
      [
        growthData.partnerships.description,
        `${growthData.partnerships.revenue} ${language === 'de' ? 'Partnerschaftsumsatz' : 'partnership revenue'}`
      ],
      this.config.margins.left,
      currentY + 10,
      85,
      this.colors.warning
    ));
    
    // Member Retention
    currentY = Math.max(currentY, this.addOpportunityBox(
      language === 'de' ? 'Mitgliederbindung' : 'Member Retention',
      [
        growthData.retention.description,
        `${growthData.retention.revenue} ${language === 'de' ? 'behaltener Umsatz' : 'retained revenue'}`
      ],
      this.config.margins.left + 95,
      currentY - 35,
      85,
      this.colors.secondary
    ));
    
    return currentY;
  }
  
  /**
   * Add professional opportunity box with enhanced styling
   */
  private addOpportunityBox(
    title: string,
    content: string[],
    x: number,
    y: number,
    width: number,
    borderColor: string
  ): number {
    const padding = 10;
    const lineHeight = this.styles.fonts.body.size * this.styles.spacing.lineHeight;
    const titleHeight = this.styles.fonts.subheading.size + 8;
    const contentHeight = content.length * lineHeight;
    const totalHeight = titleHeight + contentHeight + padding * 2;

    // Box shadow
    this.setFillColor('#e2e8f0');
    this.doc.roundedRect(x + 2, y + 2, width, totalHeight, 6, 6, 'F');

    // Box background
    this.setFillColor(this.colors.white);
    this.doc.roundedRect(x, y, width, totalHeight, 6, 6, 'F');

    // Colored header section
    this.setFillColor(borderColor);
    this.doc.roundedRect(x, y, width, titleHeight + 4, 6, 6, 'F');
    this.doc.rect(x, y + titleHeight - 2, width, 6, 'F');

    // Box border
    this.setDrawColor(borderColor);
    this.doc.setLineWidth(2);
    this.doc.roundedRect(x, y, width, totalHeight, 6, 6, 'S');

    // Title with white text on colored background
    this.doc.setFontSize(this.styles.fonts.subheading.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.white);
    this.doc.text(title, x + padding, y + padding + this.styles.fonts.subheading.size);

    // Content with better formatting
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.text);

    let contentY = y + padding + titleHeight + 4;
    for (const line of content) {
      // Add bullet points for list items
      if (line.includes('hours') || line.includes('members') || line.includes('revenue')) {
        this.setTextColor(borderColor);
        this.doc.text('▶', x + padding, contentY);
        this.setTextColor(this.colors.text);
        this.doc.text(line, x + padding + 8, contentY);
      } else {
        this.doc.text(line, x + padding, contentY);
      }
      contentY += lineHeight;
    }

    return y + totalHeight + 8;
  }
  
  /**
   * Add scenario comparison
   */
  private addScenarioComparison(
    calculatedValues: CalculatedValues,
    startY: number,
    language: Language
  ): number {
    const growthData = generateGrowthScenarioData(calculatedValues, language);
    
    const title = language === 'de' ? 'Umsatzszenarien Vergleich' : 'Revenue Scenarios Comparison';
    
    // Add section title
    this.doc.setFontSize(this.styles.fonts.subheading.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.text);
    this.doc.text(title, this.config.margins.left, startY);
    
    let currentY = startY + this.styles.spacing.sectionGap;
    
    // Conservative vs Optimistic comparison
    const columnWidth = (this.config.pageWidth - this.config.margins.left - this.config.margins.right - 15) / 2;
    
    const conservativeContent = language === 'de' 
      ? [
          'Konservative Schätzung (50% Nutzung)',
          `${growthData.total.conservative} zusätzlicher Jahresumsatz`,
          '',
          'Basiert auf bewährten Branchendurchschnitten',
          'und vorsichtigen Annahmen'
        ]
      : [
          'Conservative Estimate (50% utilization)',
          `${growthData.total.conservative} additional annual revenue`,
          '',
          'Based on proven industry averages',
          'and cautious assumptions'
        ];
    
    const optimisticContent = language === 'de' 
      ? [
          'Optimistische Schätzung (75% Nutzung)',
          `${growthData.total.optimistic} zusätzlicher Jahresumsatz`,
          '',
          'Mit fokussierter Umsetzung und',
          'strategischer Ausrichtung erreichbar'
        ]
      : [
          'Optimistic Estimate (75% utilization)',
          `${growthData.total.optimistic} additional annual revenue`,
          '',
          'Achievable with focused execution',
          'and strategic alignment'
        ];
    
    currentY = this.addTwoColumnSection(
      conservativeContent,
      optimisticContent,
      currentY,
      language === 'de' ? 'Konservativ' : 'Conservative',
      language === 'de' ? 'Optimistisch' : 'Optimistic'
    );
    
    return currentY;
  }
  
  /**
   * Add ROI timeline visualization
   */
  private addROITimeline(
    calculatedValues: CalculatedValues,
    startY: number,
    language: string
  ): void {
    const title = language === 'de' ? 'ROI-Entwicklung über Zeit' : 'ROI Timeline';
    
    // Add section title
    this.doc.setFontSize(this.styles.fonts.subheading.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.text);
    this.doc.text(title, this.config.margins.left, startY);
    
    let currentY = startY + this.styles.spacing.sectionGap;
    
    // Timeline milestones
    const milestones = language === 'de' 
      ? [
          { period: 'Monat 1-3', description: 'Implementierung und erste Automatisierung', roi: '25%' },
          { period: 'Monat 4-6', description: 'Vollständige Systemintegration', roi: '75%' },
          { period: 'Monat 7-12', description: 'Optimierung und Skalierung', roi: '150%' },
          { period: 'Jahr 2+', description: 'Kontinuierliche Verbesserung', roi: '200%+' }
        ]
      : [
          { period: 'Month 1-3', description: 'Implementation and initial automation', roi: '25%' },
          { period: 'Month 4-6', description: 'Full system integration', roi: '75%' },
          { period: 'Month 7-12', description: 'Optimization and scaling', roi: '150%' },
          { period: 'Year 2+', description: 'Continuous improvement', roi: '200%+' }
        ];
    
    for (let i = 0; i < milestones.length; i++) {
      const milestone = milestones[i];
      const y = currentY + (i * 15);
      
      // Timeline dot
      this.setFillColor(this.colors.primary);
      this.doc.circle(this.config.margins.left + 5, y, 2, 'F');
      
      // Timeline line (except for last item)
      if (i < milestones.length - 1) {
        this.setDrawColor(this.colors.gray);
        this.doc.setLineWidth(1);
        this.doc.line(this.config.margins.left + 5, y + 2, this.config.margins.left + 5, y + 13);
      }
      
      // Period
      this.doc.setFontSize(this.styles.fonts.body.size);
      this.doc.setFont('helvetica', 'bold');
      this.setTextColor(this.colors.primary);
      this.doc.text(milestone.period, this.config.margins.left + 15, y + 2);
      
      // Description
      this.doc.setFontSize(this.styles.fonts.body.size);
      this.doc.setFont('helvetica', 'normal');
      this.setTextColor(this.colors.text);
      this.doc.text(milestone.description, this.config.margins.left + 50, y + 2);
      
      // ROI
      this.doc.setFontSize(this.styles.fonts.body.size);
      this.doc.setFont('helvetica', 'bold');
      this.setTextColor(this.colors.success);
      this.doc.text(milestone.roi, this.config.margins.left + 150, y + 2);
    }
  }
}