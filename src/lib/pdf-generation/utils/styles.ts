/**
 * Professional PDF styling constants for L4YERCAK3 brand
 * Enhanced design system with modern typography and visual hierarchy
 * Based on requirements 1.3, 6.1
 */

import { PDFStyles } from '../../value-calculator/types';

export const PDF_STYLES: PDFStyles = {
  colors: {
    primary: '#2563eb',      // L4YERCAK3 blue
    secondary: '#64748b',    // Gray
    success: '#059669',      // Green
    warning: '#d97706',      // Orange
    danger: '#dc2626',       // Red
    text: '#1f2937',         // Dark gray
    light: '#f8fafc',        // Light background
  },
  fonts: {
    title: { size: 28, style: 'bold' },      // Larger, more impactful
    heading: { size: 20, style: 'bold' },    // Better hierarchy
    subheading: { size: 16, style: 'bold' }, // More prominent
    body: { size: 12, style: 'normal' },     // Better readability
    small: { size: 10, style: 'normal' },    // Clearer small text
  },
  spacing: {
    margin: 25,              // More generous margins
    lineHeight: 1.6,         // Better readability
    sectionGap: 20,          // More breathing room
  },
};

export const PDF_CONFIG = {
  format: 'a4' as const,
  orientation: 'portrait' as const,
  unit: 'mm' as const,
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  pageWidth: 210, // A4 width in mm
  pageHeight: 297, // A4 height in mm
};

export const BRAND_COLORS = {
  // Primary brand colors
  primary: '#2563eb',
  primaryRgb: [37, 99, 235] as [number, number, number],
  primaryLight: '#3b82f6',
  primaryLightRgb: [59, 130, 246] as [number, number, number],
  primaryDark: '#1d4ed8',
  primaryDarkRgb: [29, 78, 216] as [number, number, number],
  
  // Secondary colors
  secondary: '#64748b',
  secondaryRgb: [100, 116, 139] as [number, number, number],
  success: '#059669',
  successRgb: [5, 150, 105] as [number, number, number],
  successLight: '#10b981',
  successLightRgb: [16, 185, 129] as [number, number, number],
  warning: '#d97706',
  warningRgb: [217, 119, 6] as [number, number, number],
  danger: '#dc2626',
  dangerRgb: [220, 38, 38] as [number, number, number],
  
  // Text colors
  text: '#1f2937',
  textRgb: [31, 41, 55] as [number, number, number],
  textLight: '#6b7280',
  textLightRgb: [107, 114, 128] as [number, number, number],
  textMuted: '#9ca3af',
  textMutedRgb: [156, 163, 175] as [number, number, number],
  
  // Background colors
  white: '#ffffff',
  whiteRgb: [255, 255, 255] as [number, number, number],
  gray: '#64748b',
  grayRgb: [100, 116, 139] as [number, number, number],
  light: '#f8fafc',
  lightRgb: [248, 250, 252] as [number, number, number],
  lightGray: '#f1f5f9',
  lightGrayRgb: [241, 245, 249] as [number, number, number],
  
  // Professional gradients (for backgrounds)
  gradientStart: '#f8fafc',
  gradientStartRgb: [248, 250, 252] as [number, number, number],
  gradientEnd: '#e2e8f0',
  gradientEndRgb: [226, 232, 240] as [number, number, number],
  
  // Accent colors for highlights
  accent: '#8b5cf6',
  accentRgb: [139, 92, 246] as [number, number, number],
  accentLight: '#a78bfa',
  accentLightRgb: [167, 139, 250] as [number, number, number],
} as const;