/**
 * Base PDF template class with common styling functions
 * Based on requirements 1.3, 6.1
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PDF_STYLES, PDF_CONFIG, BRAND_COLORS } from '../utils/styles';
import { hexToRgb } from '../utils/helpers';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export class BasePDFTemplate {
  protected doc: jsPDF;
  protected styles = PDF_STYLES;
  protected config = PDF_CONFIG;
  protected colors = BRAND_COLORS;

  constructor() {
    this.doc = new jsPDF({
      orientation: this.config.orientation,
      unit: this.config.unit,
      format: this.config.format,
    });
  }

  /**
   * Set text color using hex color
   */
  protected setTextColor(hexColor: string): void {
    const [r, g, b] = hexToRgb(hexColor);
    this.doc.setTextColor(r, g, b);
  }

  /**
   * Set fill color using hex color
   */
  protected setFillColor(hexColor: string): void {
    const [r, g, b] = hexToRgb(hexColor);
    this.doc.setFillColor(r, g, b);
  }

  /**
   * Set draw color using hex color
   */
  protected setDrawColor(hexColor: string): void {
    const [r, g, b] = hexToRgb(hexColor);
    this.doc.setDrawColor(r, g, b);
  }

  /**
   * Add professional branded header to page
   */
  protected addHeader(pageTitle: string, organizationName?: string): void {
    // Header background gradient effect
    this.setFillColor(this.colors.gradientStart);
    this.doc.rect(0, 0, this.config.pageWidth, 65, 'F');
    
    // Subtle accent line at top
    this.setDrawColor(this.colors.primary);
    this.doc.setLineWidth(3);
    this.doc.line(0, 0, this.config.pageWidth, 0);

    // L4YERCAK3 logo/brand with enhanced styling
    this.doc.setFontSize(this.styles.fonts.title.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.primary);
    this.doc.text('L4YERCAK3', this.config.margins.left, 28);

    // Tagline with better positioning
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.textLight);
    this.doc.text('Modern Automation Solutions', this.config.margins.left, 36);

    // Organization name with enhanced styling
    if (organizationName) {
      this.doc.setFontSize(this.styles.fonts.heading.size);
      this.doc.setFont('helvetica', 'bold');
      this.setTextColor(this.colors.text);
      this.doc.text(organizationName, this.config.margins.left, 50);
      
      // Page title with better hierarchy
      this.doc.setFontSize(this.styles.fonts.subheading.size);
      this.doc.setFont('helvetica', 'normal');
      this.setTextColor(this.colors.textLight);
      this.doc.text(pageTitle, this.config.margins.left, 58);
    } else {
      // Page title only with better positioning
      this.doc.setFontSize(this.styles.fonts.heading.size);
      this.doc.setFont('helvetica', 'bold');
      this.setTextColor(this.colors.text);
      this.doc.text(pageTitle, this.config.margins.left, 50);
    }

    // Professional separator line with gradient effect
    this.setDrawColor(this.colors.primary);
    this.doc.setLineWidth(2);
    this.doc.line(
      this.config.margins.left,
      organizationName ? 65 : 58,
      this.config.pageWidth - this.config.margins.right,
      organizationName ? 65 : 58
    );
    
    // Subtle shadow line
    this.setDrawColor(this.colors.lightGray);
    this.doc.setLineWidth(1);
    this.doc.line(
      this.config.margins.left,
      organizationName ? 66 : 59,
      this.config.pageWidth - this.config.margins.right,
      organizationName ? 66 : 59
    );
  }

  /**
   * Add professional footer to page
   */
  protected addFooter(pageNumber: number): void {
    const footerY = this.config.pageHeight - 20;
    
    // Footer separator line
    this.setDrawColor(this.colors.lightGray);
    this.doc.setLineWidth(1);
    this.doc.line(
      this.config.margins.left,
      footerY - 8,
      this.config.pageWidth - this.config.margins.right,
      footerY - 8
    );
    
    this.doc.setFontSize(this.styles.fonts.small.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.textMuted);
    
    // Company info on left
    this.doc.text('L4YERCAK3 - Modern Automation Solutions', this.config.margins.left, footerY);
    
    // Contact info in center
    const contactInfo = 'info@l4yercak3.com | www.l4yercak3.com';
    const contactWidth = this.doc.getTextWidth(contactInfo);
    this.doc.text(
      contactInfo,
      (this.config.pageWidth - contactWidth) / 2,
      footerY
    );
    
    // Page number on right with better styling
    const pageText = `${pageNumber} / 4`;
    const pageTextWidth = this.doc.getTextWidth(pageText);
    this.doc.text(
      pageText,
      this.config.pageWidth - this.config.margins.right - pageTextWidth,
      footerY
    );
  }

  /**
   * Add a section with title and content
   */
  protected addSection(
    title: string,
    content: string[],
    startY: number,
    titleColor: string = this.colors.text
  ): number {
    let currentY = startY;

    // Section title
    this.doc.setFontSize(this.styles.fonts.subheading.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(titleColor);
    this.doc.text(title, this.config.margins.left, currentY);
    currentY += this.styles.spacing.sectionGap;

    // Section content
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.text);

    for (const line of content) {
      this.doc.text(line, this.config.margins.left + 5, currentY);
      currentY += this.styles.fonts.body.size * this.styles.spacing.lineHeight;
    }

    return currentY + this.styles.spacing.sectionGap;
  }

  /**
   * Add a professional highlighted value box with shadow and gradient
   */
  protected addValueBox(
    title: string,
    value: string,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    // Shadow effect
    this.setFillColor('#e2e8f0');
    this.doc.roundedRect(x + 2, y + 2, width, height, 4, 4, 'F');

    // Box background with gradient effect
    this.setFillColor(this.colors.white);
    this.doc.roundedRect(x, y, width, height, 4, 4, 'F');

    // Box border with enhanced styling
    this.setDrawColor(this.colors.primary);
    this.doc.setLineWidth(2);
    this.doc.roundedRect(x, y, width, height, 4, 4, 'S');

    // Accent line at top
    this.setFillColor(this.colors.primary);
    this.doc.roundedRect(x, y, width, 8, 4, 4, 'F');

    // Title with better positioning
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.textLight);
    const titleWidth = this.doc.getTextWidth(title);
    this.doc.text(title, x + (width - titleWidth) / 2, y + 20);

    // Value with enhanced typography
    this.doc.setFontSize(this.styles.fonts.title.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.primary);
    const valueWidth = this.doc.getTextWidth(value);
    this.doc.text(value, x + (width - valueWidth) / 2, y + height - 15);
  }

  /**
   * Get the PDF as buffer
   */
  public getBuffer(): Buffer {
    return Buffer.from(this.doc.output('arraybuffer'));
  }

  /**
   * Get the PDF as base64 string
   */
  public getBase64(): string {
    return this.doc.output('datauristring').split(',')[1];
  }

  /**
   * Add a new page with consistent styling
   */
  protected addNewPage(): void {
    this.doc.addPage();
  }

  /**
   * Get current Y position after enhanced header
   */
  protected getContentStartY(hasOrganizationName: boolean = false): number {
    return hasOrganizationName ? 80 : 75;
  }

  /**
   * Add a professionally styled table using autoTable
   */
  protected addTable(
    headers: string[],
    data: (string | number)[][],
    startY: number,
    options?: any
  ): number {
    const tableOptions = {
      startY,
      head: [headers],
      body: data,
      theme: 'grid',
      styles: {
        fontSize: this.styles.fonts.body.size,
        cellPadding: 6,
        textColor: hexToRgb(this.colors.text),
        lineColor: hexToRgb(this.colors.lightGray),
        lineWidth: 1,
      },
      headStyles: {
        fillColor: hexToRgb(this.colors.primary),
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: this.styles.fonts.body.size,
        cellPadding: 8,
      },
      alternateRowStyles: {
        fillColor: hexToRgb(this.colors.light),
      },
      bodyStyles: {
        cellPadding: 6,
      },
      margin: { 
        left: this.config.margins.left, 
        right: this.config.margins.right 
      },
      tableLineColor: hexToRgb(this.colors.lightGray),
      tableLineWidth: 1,
      ...options,
    };

    autoTable(this.doc, tableOptions);
    return (this.doc as any).lastAutoTable.finalY + 15;
  }

  /**
   * Add a two-column layout section
   */
  protected addTwoColumnSection(
    leftContent: string[],
    rightContent: string[],
    startY: number,
    leftTitle?: string,
    rightTitle?: string
  ): number {
    const columnWidth = (this.config.pageWidth - this.config.margins.left - this.config.margins.right - 10) / 2;
    const leftX = this.config.margins.left;
    const rightX = this.config.margins.left + columnWidth + 10;
    
    let currentY = startY;

    // Left column
    if (leftTitle) {
      this.doc.setFontSize(this.styles.fonts.subheading.size);
      this.doc.setFont('helvetica', 'bold');
      this.setTextColor(this.colors.text);
      this.doc.text(leftTitle, leftX, currentY);
      currentY += this.styles.spacing.sectionGap;
    }

    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.text);

    let leftY = currentY;
    for (const line of leftContent) {
      this.doc.text(line, leftX, leftY);
      leftY += this.styles.fonts.body.size * this.styles.spacing.lineHeight;
    }

    // Right column
    let rightY = startY;
    if (rightTitle) {
      this.doc.setFontSize(this.styles.fonts.subheading.size);
      this.doc.setFont('helvetica', 'bold');
      this.setTextColor(this.colors.text);
      this.doc.text(rightTitle, rightX, rightY);
      rightY += this.styles.spacing.sectionGap;
    }

    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.text);

    for (const line of rightContent) {
      this.doc.text(line, rightX, rightY);
      rightY += this.styles.fonts.body.size * this.styles.spacing.lineHeight;
    }

    return Math.max(leftY, rightY) + this.styles.spacing.sectionGap;
  }

  /**
   * Add a professional call-to-action button with shadow and gradient
   */
  protected addCTAButton(
    text: string,
    x: number,
    y: number,
    width: number = 80,
    height: number = 16
  ): void {
    // Button shadow
    this.setFillColor('#1e40af');
    this.doc.roundedRect(x + 2, y + 2, width, height, 4, 4, 'F');

    // Button background with gradient effect
    this.setFillColor(this.colors.primary);
    this.doc.roundedRect(x, y, width, height, 4, 4, 'F');
    
    // Highlight effect on top
    this.setFillColor(this.colors.primaryLight);
    this.doc.roundedRect(x, y, width, height/3, 4, 4, 'F');
    this.doc.rect(x, y + height/3 - 2, width, 4, 'F');

    // Button border for definition
    this.setDrawColor(this.colors.primaryDark);
    this.doc.setLineWidth(1);
    this.doc.roundedRect(x, y, width, height, 4, 4, 'S');

    // Button text with better typography
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(255, 255, 255);
    
    const textWidth = this.doc.getTextWidth(text);
    const textX = x + (width - textWidth) / 2;
    const textY = y + height / 2 + 3;
    
    this.doc.text(text, textX, textY);
  }

  /**
   * Add a professional progress bar with enhanced styling
   */
  protected addProgressBar(
    percentage: number,
    x: number,
    y: number,
    width: number = 80,
    height: number = 8,
    label?: string
  ): void {
    // Background bar with rounded corners
    this.setFillColor(this.colors.lightGray);
    this.doc.roundedRect(x, y, width, height, height/2, height/2, 'F');

    // Progress fill with gradient effect
    const fillWidth = (width * percentage) / 100;
    if (fillWidth > 0) {
      // Determine color based on percentage
      let fillColor: string;
      if (percentage >= 75) fillColor = this.colors.success;
      else if (percentage >= 50) fillColor = this.colors.warning;
      else fillColor = this.colors.danger;
      
      this.setFillColor(fillColor);
      this.doc.roundedRect(x, y, fillWidth, height, height/2, height/2, 'F');
      
      // Add highlight effect on top half
      let highlightColor: string;
      if (percentage >= 75) highlightColor = this.colors.successLight;
      else if (percentage >= 50) highlightColor = '#fbbf24'; // lighter warning
      else highlightColor = '#f87171'; // lighter danger
      
      this.setFillColor(highlightColor);
      this.doc.roundedRect(x, y, fillWidth, height/2, height/4, height/4, 'F');
    }

    // Subtle border
    this.setDrawColor(this.colors.gray);
    this.doc.setLineWidth(0.5);
    this.doc.roundedRect(x, y, width, height, height/2, height/2, 'S');

    // Label with better positioning
    if (label) {
      this.doc.setFontSize(this.styles.fonts.small.size);
      this.doc.setFont('helvetica', 'normal');
      this.setTextColor(this.colors.text);
      this.doc.text(label, x, y - 4);
    }

    // Percentage text with better styling
    this.doc.setFontSize(this.styles.fonts.small.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.primary);
    const percentText = `${percentage}%`;
    const percentWidth = this.doc.getTextWidth(percentText);
    this.doc.text(percentText, x + width - percentWidth, y - 4);
  }

  /**
   * Add a professional bordered info box with enhanced styling
   */
  protected addInfoBox(
    title: string,
    content: string[],
    x: number,
    y: number,
    width: number,
    borderColor: string = this.colors.primary
  ): number {
    const padding = 12;
    const lineHeight = this.styles.fonts.body.size * this.styles.spacing.lineHeight;
    const titleHeight = this.styles.fonts.subheading.size + 8;
    const contentHeight = content.length * lineHeight;
    const totalHeight = titleHeight + contentHeight + padding * 2;

    // Shadow effect
    this.setFillColor('#e2e8f0');
    this.doc.roundedRect(x + 2, y + 2, width, totalHeight, 6, 6, 'F');

    // Box background with subtle gradient
    this.setFillColor(this.colors.white);
    this.doc.roundedRect(x, y, width, totalHeight, 6, 6, 'F');

    // Box border with enhanced styling
    this.setDrawColor(borderColor);
    this.doc.setLineWidth(2);
    this.doc.roundedRect(x, y, width, totalHeight, 6, 6, 'S');

    // Title background bar
    this.setFillColor(borderColor);
    this.doc.roundedRect(x, y, width, titleHeight + 4, 6, 6, 'F');
    
    // Cover bottom corners of title bar
    this.doc.rect(x, y + titleHeight - 2, width, 6, 'F');

    // Title with white text on colored background
    this.doc.setFontSize(this.styles.fonts.subheading.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.white);
    this.doc.text(title, x + padding, y + padding + this.styles.fonts.subheading.size);

    // Content with better spacing
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.text);

    let contentY = y + padding + titleHeight + 4;
    for (const line of content) {
      // Add bullet points for list items
      if (line.trim() && !line.includes(':')) {
        this.setTextColor(borderColor);
        this.doc.text('•', x + padding, contentY);
        this.setTextColor(this.colors.text);
        this.doc.text(line, x + padding + 8, contentY);
      } else {
        this.doc.text(line, x + padding, contentY);
      }
      contentY += lineHeight;
    }

    return y + totalHeight + this.styles.spacing.sectionGap;
  }

  /**
   * Add a professional card-style section
   */
  protected addCard(
    title: string,
    content: string[],
    x: number,
    y: number,
    width: number,
    accentColor: string = this.colors.primary
  ): number {
    const padding = 15;
    const lineHeight = this.styles.fonts.body.size * this.styles.spacing.lineHeight;
    const titleHeight = this.styles.fonts.heading.size + 10;
    const contentHeight = content.length * lineHeight;
    const totalHeight = titleHeight + contentHeight + padding * 2;

    // Card shadow
    this.setFillColor('#e2e8f0');
    this.doc.roundedRect(x + 3, y + 3, width, totalHeight, 8, 8, 'F');

    // Card background
    this.setFillColor(this.colors.white);
    this.doc.roundedRect(x, y, width, totalHeight, 8, 8, 'F');

    // Subtle border
    this.setDrawColor(this.colors.lightGray);
    this.doc.setLineWidth(1);
    this.doc.roundedRect(x, y, width, totalHeight, 8, 8, 'S');

    // Accent stripe on left
    this.setFillColor(accentColor);
    this.doc.rect(x, y + 8, 4, totalHeight - 16, 'F');

    // Title
    this.doc.setFontSize(this.styles.fonts.heading.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(accentColor);
    this.doc.text(title, x + padding, y + padding + this.styles.fonts.heading.size);

    // Content
    this.doc.setFontSize(this.styles.fonts.body.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.text);

    let contentY = y + padding + titleHeight;
    for (const line of content) {
      this.doc.text(line, x + padding, contentY);
      contentY += lineHeight;
    }

    return y + totalHeight + this.styles.spacing.sectionGap;
  }

  /**
   * Add a professional metric display box
   */
  protected addMetricBox(
    label: string,
    value: string,
    subtitle: string,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = this.colors.primary
  ): void {
    // Box shadow
    this.setFillColor('#e2e8f0');
    this.doc.roundedRect(x + 2, y + 2, width, height, 6, 6, 'F');

    // Box background
    this.setFillColor(this.colors.white);
    this.doc.roundedRect(x, y, width, height, 6, 6, 'F');

    // Colored top border
    this.setFillColor(color);
    this.doc.roundedRect(x, y, width, 6, 6, 6, 'F');
    this.doc.rect(x, y + 3, width, 3, 'F');

    // Label
    this.doc.setFontSize(this.styles.fonts.small.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(this.colors.textMuted);
    const labelWidth = this.doc.getTextWidth(label);
    this.doc.text(label, x + (width - labelWidth) / 2, y + 20);

    // Value
    this.doc.setFontSize(this.styles.fonts.title.size);
    this.doc.setFont('helvetica', 'bold');
    this.setTextColor(color);
    const valueWidth = this.doc.getTextWidth(value);
    this.doc.text(value, x + (width - valueWidth) / 2, y + height / 2 + 5);

    // Subtitle
    this.doc.setFontSize(this.styles.fonts.small.size);
    this.doc.setFont('helvetica', 'normal');
    this.setTextColor(this.colors.textLight);
    const subtitleWidth = this.doc.getTextWidth(subtitle);
    this.doc.text(subtitle, x + (width - subtitleWidth) / 2, y + height - 12);
  }
}