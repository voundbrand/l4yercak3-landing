/**
 * PDF generation utility functions
 * Based on requirements 6.1, 7.3, 7.4
 */

import { Language } from '../../value-calculator/types';

/**
 * Format currency values based on language/locale
 * Enhanced to match existing calculator formatting
 */
export function formatCurrency(amount: number, language: Language = 'en'): string {
  if (language === 'de') {
    // German formatting: €1.234,56 (matches existing calculator)
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  } else {
    // English formatting: €1,234 (simplified for readability)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
}

/**
 * Format numbers based on language/locale
 * Enhanced to match existing calculator formatting
 */
export function formatNumber(number: number, language: Language = 'en'): string {
  if (language === 'de') {
    // German formatting: 1.234 (matches existing calculator)
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  } else {
    // English formatting: 1,234 (matches existing calculator)
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  }
}

/**
 * Format dates based on language/locale
 * Enhanced with better German support
 */
export function formatDate(date: Date, language: Language = 'en'): string {
  if (language === 'de') {
    // German formatting: DD.MM.YYYY
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  } else {
    // English formatting: MM/DD/YYYY
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(date);
  }
}

/**
 * Format percentage values
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Wrap text to fit within specified width
 */
export function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
  // Simple text wrapping - can be enhanced with actual PDF text measurement
  const avgCharWidth = fontSize * 0.6; // Approximate character width
  const maxCharsPerLine = Math.floor(maxWidth / avgCharWidth);
  
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

/**
 * Convert hex color to RGB array for jsPDF
 */
export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

/**
 * Calculate ROI percentage
 */
export function calculateROI(benefit: number, cost: number): number {
  if (cost === 0) return 0;
  return ((benefit - cost) / cost) * 100;
}

/**
 * Generate filename for PDF with timestamp
 */
export function generatePDFFilename(organizationName: string, language: Language = 'en'): string {
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const cleanOrgName = organizationName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const prefix = language === 'de' ? 'Wertanalyse' : 'Value-Analysis';
  
  return `${prefix}-${cleanOrgName}-${timestamp}.pdf`;
}