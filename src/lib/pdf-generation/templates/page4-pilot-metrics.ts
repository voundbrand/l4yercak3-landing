/**
 * Page 4: Pilot Metrics PDF template
 * Based on requirements 1.1, 1.3
 */

import { BasePDFTemplate } from './base';
import { LeadData, CalculatedValues, LocalizedContent } from '../../value-calculator/types';

export class PilotMetricsTemplate extends BasePDFTemplate {
  /**
   * Generate Page 4: Pilot Metrics
   */
  public generatePage4(
    leadData: LeadData,
    calculatedValues: CalculatedValues,
    content: LocalizedContent
  ): void {
    // Add new page
    this.addNewPage();
    
    // Add header
    this.addHeader(content.pdf.pilotMetrics.title);
    
    let currentY = this.getContentStartY();
    
    // Introduction section
    currentY = this.addPilotIntroduction(currentY, leadData.language || 'en');
    
    // 90-day framework
    currentY = this.addPilotFramework(content.pdf.pilotMetrics, currentY, leadData.language || 'en');
    
    // Success metrics specific to their organization
    currentY = this.addSuccessMetrics(leadData, calculatedValues, currentY, leadData.language || 'en');
    
    // Final call to action
    this.addFinalCTA(leadData, currentY, leadData.language || 'en');
    
    // Add footer
    this.addFooter(4);
  }
  
  /**
   * Add pilot introduction section
   */
  private addPilotIntroduction(
    startY: number,
    language: string
  ): number {
    const introText = language === 'de' 
      ? [
          'Bevor Sie sich zu einem vollständigen Jahresvertrag verpflichten,',
          'lassen Sie uns den Wert in einem risikoarmen 90-Tage-Pilot beweisen.',
          '',
          'Unser bewährtes Framework stellt sicher, dass Sie messbare',
          'Ergebnisse sehen, bevor Sie eine größere Investition tätigen.'
        ]
      : [
          'Before committing to a full annual contract, let us prove',
          'the value in a low-risk 90-day pilot program.',
          '',
          'Our proven framework ensures you see measurable results',
          'before making a larger investment.'
        ];
    
    return this.addSection('', introText, startY);
  }
  
  /**
   * Add 90-day pilot framework
   */
  private addPilotFramework(
    pilotMetrics: any,
    startY: number,
    language: string
  ): number {
    let currentY = startY;
    
    // Phase 1: Baseline Measurement
    currentY = this.addPhaseBox(
      '1',
      pilotMetrics.phases.baseline,
      language === 'de' 
        ? [
            'Aktuelle Arbeitsabläufe dokumentieren',
            'Zeitaufwand für 3 Schlüsselprozesse messen',
            'Baseline für Vergleichsmessungen etablieren'
          ]
        : [
            'Document current workflows',
            'Measure time spent on 3 key processes',
            'Establish baseline for comparison'
          ],
      currentY,
      this.colors.secondary
    );
    
    // Phase 2: Core Automation
    currentY = this.addPhaseBox(
      '2',
      pilotMetrics.phases.automation,
      language === 'de' 
        ? [
            'Automatisierte Systeme implementieren',
            'Team in neuen Arbeitsabläufen schulen',
            'Erste Zeitersparnis messen'
          ]
        : [
            'Implement automated systems',
            'Train team on new workflows',
            'Measure initial time savings'
          ],
      currentY,
      this.colors.primary
    );
    
    // Phase 3: Validation
    currentY = this.addPhaseBox(
      '3',
      pilotMetrics.phases.validation,
      language === 'de' 
        ? [
            'Ergebnisse gegen Baseline validieren',
            'ROI berechnen und dokumentieren',
            'Vollvertrag oder freundliche Trennung'
          ]
        : [
            'Validate results against baseline',
            'Calculate and document ROI',
            'Full contract or amicable parting'
          ],
      currentY,
      this.colors.success
    );
    
    return currentY;
  }
  
  /**
   * Add phase box
   */
  private addPhaseBox(
    phaseNumber: string,
    phaseTitle: string,
    activities: string[],
    startY: number,
    color: string
  ): number {
    const boxWidth = this.config.pageWidth - this.config.margins.left - this.config.margins.right;
    const padding = 8;
    const lineHeight = this.styles.fonts.body.size * this.styles.spacing.lineHeight;
    const titleHeight = this.styles.fonts.subheading.size + 6;
    const contentHeight = activities.length * lineHeight;
    const totalHeight = titleHeight + contentHeight + padding * 2;

    // Phase number circle
    this.setFillColor(color);
    this.doc.circle(this.config.margins.left + 10, startY + 15, 8, 'F');
    
    this.doc.setFontSize(this.styles.fonts.heading.size);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(phaseNumber, this.config.margins.left + 7, startY + 18);

    // Box background
    this.setFillColor(this.colors.light);
    this.doc.roundedRect(this.config.margins.left + 25, startY, boxWidth - 25, totalHeight, 3, 3, 'F');

    // Box border
    this.setDrawColor(color);
    this.doc.setLineWidth(2);
    this.doc.roundedRect(this.config.margins.left + 25, startY, boxWidth - 25, totalHeight, 3, 3, 'S');

    // Phase title
    this.doc.setFontSize(this.styles.fonts.subheading.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(color);
    this.doc.text(phaseTitle, this.config.margins.left + 25 + padding, startY + padding + this.styles.fonts.subheading.size);

    // Activities
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.text);

    let activityY = startY + padding + titleHeight;
    for (const activity of activities) {
      this.doc.text(`• ${activity}`, this.config.margins.left + 25 + padding + 5, activityY);
      activityY += lineHeight;
    }

    return startY + totalHeight + this.styles.spacing.sectionGap;
  }
  
  /**
   * Add success metrics specific to organization
   */
  private addSuccessMetrics(
    leadData: LeadData,
    calculatedValues: CalculatedValues,
    startY: number,
    language: string
  ): number {
    const title = language === 'de' 
      ? `Spezifische Erfolgskennzahlen für ${leadData.organizationName}`
      : `Specific Success Metrics for ${leadData.organizationName}`;
    
    // Calculate specific metrics
    const weeklyHoursSaved = Math.round(calculatedValues.potentialFreedHours / 52);
    const monthlyHoursSaved = Math.round(calculatedValues.potentialFreedHours / 12);
    const eventTimeSaving = Math.round(leadData.annualEvents > 0 ? (calculatedValues.totalAnnualHours * 0.256) / leadData.annualEvents * 0.5 : 0);
    
    const metrics = language === 'de' 
      ? [
          `Reduzierung der Veranstaltungsadministration von 8 auf 4 Stunden pro Event`,
          `${monthlyHoursSaved} Stunden pro Monat für strategische Aktivitäten freigesetzt`,
          `50% Automatisierung in den ersten 60 Tagen erreichen`,
          `Messbare Verbesserung der Mitgliederzufriedenheit`,
          `ROI-Validierung durch Zeiterfassung und Kosteneinsparung`
        ]
      : [
          `Reduce event administration time from 8 to 4 hours per event`,
          `Free ${monthlyHoursSaved} hours per month for strategic activities`,
          `Achieve 50% automation in first 60 days`,
          `Measurable improvement in member satisfaction`,
          `ROI validation through time tracking and cost savings`
        ];
    
    const boxWidth = this.config.pageWidth - this.config.margins.left - this.config.margins.right;
    
    return this.addInfoBox(
      title,
      metrics,
      this.config.margins.left,
      startY,
      boxWidth,
      this.colors.primary
    );
  }
  
  /**
   * Add final call to action
   */
  private addFinalCTA(
    leadData: LeadData,
    startY: number,
    language: string
  ): void {
    const ctaTitle = language === 'de' ? 'Bereit für Ihren Pilot?' : 'Ready for Your Pilot?';
    const ctaText = language === 'de' ? 'Pilot-Bewertung vereinbaren' : 'Schedule Pilot Assessment';
    
    // CTA box
    const boxWidth = this.config.pageWidth - this.config.margins.left - this.config.margins.right;
    const boxHeight = 35;
    
    this.setFillColor(this.colors.primary);
    this.doc.roundedRect(this.config.margins.left, startY, boxWidth, boxHeight, 5, 5, 'F');
    
    // Title
    this.doc.setFontSize(this.styles.fonts.heading.size);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(255, 255, 255);
    const titleWidth = this.doc.getTextWidth(ctaTitle);
    this.doc.text(ctaTitle, this.config.margins.left + (boxWidth - titleWidth) / 2, startY + 15);
    
    // Subtitle
    const subtitle = language === 'de' 
      ? 'Lassen Sie uns beweisen, dass wir Ihnen helfen können, bevor Sie sich verpflichten'
      : 'Let us prove we can help you before you commit';
    
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'normal');
    const subtitleWidth = this.doc.getTextWidth(subtitle);
    this.doc.text(subtitle, this.config.margins.left + (boxWidth - subtitleWidth) / 2, startY + 25);
    
    // Contact information
    const contactY = startY + boxHeight + 10;
    
    this.doc.setFontSize(this.styles.fonts.small.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.gray);
    
    const contactInfo = language === 'de' 
      ? [
          'Kontaktieren Sie uns für eine kostenlose Pilot-Bewertung:',
          'E-Mail: sales@l4yercak3.com',
          'Oder antworten Sie direkt auf diese E-Mail'
        ]
      : [
          'Contact us for a free pilot assessment:',
          'Email: sales@l4yercak3.com',
          'Or reply directly to this email'
        ];
    
    let infoY = contactY;
    for (const info of contactInfo) {
      const infoWidth = this.doc.getTextWidth(info);
      this.doc.text(info, this.config.margins.left + (boxWidth - infoWidth) / 2, infoY);
      infoY += this.styles.fonts.small.size * this.styles.spacing.lineHeight;
    }
  }
}