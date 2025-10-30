/**
 * Page 2: Task Breakdown PDF template
 * Based on requirements 1.1, 1.3
 */

import { BasePDFTemplate } from './base';
import { LeadData, CalculatedValues, LocalizedContent, Language } from '../../value-calculator/types';
import { generateTaskBreakdownData } from '../content/replacements';
import { hexToRgb } from '../utils/helpers';

// Helper function to safely format numbers
function safeToLocaleString(value: number | undefined, locale: string, options?: Intl.NumberFormatOptions): string {
  if (value === undefined || value === null || isNaN(value)) {
    return '0';
  }
  return value.toLocaleString(locale, options);
}

export class TaskBreakdownTemplate extends BasePDFTemplate {
  /**
   * Generate Page 2: Task Breakdown
   */
  public generatePage2(
    leadData: LeadData,
    calculatedValues: CalculatedValues,
    content: LocalizedContent
  ): void {
    // Add new page
    this.addNewPage();
    
    // Add header
    this.addHeader(content.pdf.taskBreakdown.title);
    
    let currentY = this.getContentStartY();
    
    // Introduction section
    currentY = this.addIntroduction(calculatedValues, currentY, leadData.language || 'en');
    
    // Task breakdown table
    currentY = this.addTaskBreakdownTable(calculatedValues, currentY, leadData.language || 'en');
    
    // Automation potential visualization
    currentY = this.addAutomationVisualization(calculatedValues, currentY, leadData.language || 'en');
    
    // Summary section
    this.addTaskSummary(calculatedValues, currentY, leadData.language || 'en');
    
    // Add footer
    this.addFooter(2);
  }
  
  /**
   * Add introduction section
   */
  private addIntroduction(
    calculatedValues: CalculatedValues,
    startY: number,
    language: string
  ): number {
    const totalHours = calculatedValues.totalAnnualHours;
    const totalCost = calculatedValues.annualWaste;
    
    const introText = language === 'de' 
      ? [
          `Ihre Organisation verbringt derzeit ${safeToLocaleString(totalHours, 'de-DE')} Stunden pro Jahr`,
          `mit manuellen Aufgaben im Wert von ${safeToLocaleString(totalCost, 'de-DE', { style: 'currency', currency: 'EUR' })}.`,
          '',
          'Hier ist die Aufschlüsselung, wo Ihre Zeit hingeht:'
        ]
      : [
          `Your organization currently spends ${safeToLocaleString(totalHours, 'en-US')} hours per year`,
          `on manual tasks worth ${safeToLocaleString(totalCost, 'en-US', { style: 'currency', currency: 'EUR' })}.`,
          '',
          'Here\'s the breakdown of where your time is going:'
        ];
    
    return this.addSection('', introText, startY);
  }
  
  /**
   * Add task breakdown table
   */
  private addTaskBreakdownTable(
    calculatedValues: CalculatedValues,
    startY: number,
    language: Language
  ): number {
    const taskData = generateTaskBreakdownData(calculatedValues, language);
    
    const headers = language === 'de' 
      ? ['Aufgabenbereich', 'Aktuelle Stunden', 'Automatisierung', 'Gesparte Stunden', 'Kosteneinsparung']
      : ['Task Category', 'Current Hours', 'Automation', 'Hours Freed', 'Cost Savings'];
    
    const tableData = taskData.map(task => [
      task.category,
      task.currentHours,
      task.automationPotential,
      task.hoursFreed,
      task.costSavings
    ]);
    
    return this.addTable(headers, tableData, startY, {
      columnStyles: {
        0: { cellWidth: 60 }, // Task category - wider
        1: { cellWidth: 25, halign: 'right' }, // Current hours
        2: { cellWidth: 25, halign: 'center' }, // Automation %
        3: { cellWidth: 25, halign: 'right' }, // Hours freed
        4: { cellWidth: 35, halign: 'right' }, // Cost savings
      },
      styles: {
        fontSize: this.styles.fonts.small.size,
        cellPadding: 4,
      }
    });
  }
  
  /**
   * Add automation potential visualization
   */
  private addAutomationVisualization(
    calculatedValues: CalculatedValues,
    startY: number,
    language: string
  ): number {
    const title = language === 'de' 
      ? 'Automatisierungspotenzial nach Kategorie'
      : 'Automation Potential by Category';
    
    // Add section title
    this.doc.setFontSize(this.styles.fonts.subheading.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.text);
    this.doc.text(title, this.config.margins.left, startY);
    
    let currentY = startY + this.styles.spacing.sectionGap;
    
    // Automation categories with progress bars
    const categories = [
      { name: language === 'de' ? 'Dateneingabe & -verwaltung' : 'Data Entry & Management', percent: 95 },
      { name: language === 'de' ? 'Compliance & Berichtswesen' : 'Compliance & Reporting', percent: 95 },
      { name: language === 'de' ? 'Veranstaltungskoordination' : 'Event Coordination', percent: 90 },
      { name: language === 'de' ? 'Finanzverwaltung' : 'Financial Administration', percent: 90 },
      { name: language === 'de' ? 'Mitgliederkommunikation' : 'Member Communication', percent: 85 }
    ];
    
    for (const category of categories) {
      // Category name
      this.doc.setFontSize(this.styles.fonts.body.size);
      this.doc.setFont('helvetica', 'normal');
      this.setTextColor(this.colors.text);
      this.doc.text(category.name, this.config.margins.left, currentY);
      
      // Progress bar
      const barX = this.config.margins.left + 80;
      const barWidth = 80;
      this.addProgressBar(category.percent, barX, currentY - 4, barWidth, 6);
      
      currentY += 12;
    }
    
    return currentY + this.styles.spacing.sectionGap;
  }
  
  /**
   * Add professional task summary section with metrics
   */
  private addTaskSummary(
    calculatedValues: CalculatedValues,
    startY: number,
    language: string
  ): void {
    const freedHours = calculatedValues.potentialFreedHours;
    const costSavings = calculatedValues.laborCostAvoided;
    const weeklyHours = Math.round(freedHours / 52);
    
    const summaryTitle = language === 'de' ? '💡 Zusammenfassung der Zeitersparnis' : '💡 Time Savings Summary';
    
    // Create metric boxes for key numbers
    const boxWidth = (this.config.pageWidth - this.config.margins.left - this.config.margins.right - 20) / 3;
    
    // Annual hours saved
    this.addMetricBox(
      language === 'de' ? 'Gesparte Stunden/Jahr' : 'Hours Saved/Year',
      safeToLocaleString(freedHours, language === 'de' ? 'de-DE' : 'en-US'),
      language === 'de' ? `${weeklyHours} Std./Woche` : `${weeklyHours} hrs/week`,
      this.config.margins.left,
      startY,
      boxWidth,
      45,
      this.colors.success
    );
    
    // Cost savings
    this.addMetricBox(
      language === 'de' ? 'Kosteneinsparung' : 'Cost Savings',
      safeToLocaleString(costSavings, language === 'de' ? 'de-DE' : 'en-US', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0
      }),
      language === 'de' ? 'pro Jahr' : 'per year',
      this.config.margins.left + boxWidth + 10,
      startY,
      boxWidth,
      45,
      this.colors.primary
    );
    
    // Efficiency gain
    const efficiencyGain = Math.round((freedHours / calculatedValues.totalAnnualHours) * 100);
    this.addMetricBox(
      language === 'de' ? 'Effizienzsteigerung' : 'Efficiency Gain',
      `${efficiencyGain}%`,
      language === 'de' ? 'Verbesserung' : 'improvement',
      this.config.margins.left + (boxWidth + 10) * 2,
      startY,
      boxWidth,
      45,
      this.colors.accent
    );
    
    // Summary text below metrics
    const summaryContent = language === 'de' 
      ? [
          'Diese freigesetzte Zeit kann strategisch eingesetzt werden für:',
          '• Mitgliederbetreuung und -bindung',
          '• Neue Programmentwicklung',
          '• Umsatzgenerierende Aktivitäten',
          '• Strategische Partnerschaften'
        ]
      : [
          'This freed time can be strategically deployed for:',
          '• Member engagement and retention',
          '• New program development', 
          '• Revenue-generating activities',
          '• Strategic partnerships'
        ];
    
    const boxWidthFull = this.config.pageWidth - this.config.margins.left - this.config.margins.right;
    
    this.addCard(
      language === 'de' ? '🚀 Strategische Möglichkeiten' : '🚀 Strategic Opportunities',
      summaryContent,
      this.config.margins.left,
      startY + 60,
      boxWidthFull,
      this.colors.success
    );
  }
}