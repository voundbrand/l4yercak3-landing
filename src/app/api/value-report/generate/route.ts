/**
 * API route for generating and delivering PDF value reports
 * Based on requirements 6.4, 5.4, 1.1, 1.2, 5.1
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { 
  transformCalculatorDataForPDF,
  validateTransformedData,
  type ExistingCalculatorInputs,
  type ExistingCalculatedValues,
  type LeadContactInfo
} from '@/lib/value-calculator/bridge';
import { detectLanguageFromContext } from '@/lib/value-calculator/i18n-bridge';
import { getAPITemplateGenerator } from '@/lib/pdf-generation/apitemplate-generator';
import { sendValueReportEmails } from '@/lib/email-delivery/email-service';
import { validateResendConfig } from '@/lib/email-delivery/resend-client';

// Request validation schema
const ValueReportRequestSchema = z.object({
  // Calculator inputs (from existing calculator)
  calculatorInputs: z.object({
    organizationSize: z.number().min(1).max(10000),
    adminStaffCount: z.number().min(0).max(1000),
    adminHoursPerWeek: z.number().min(0).max(168),
    adminLaborCost: z.number().min(0).max(1000),
    executiveStaffCount: z.number().min(0).max(100),
    executiveHoursPerWeek: z.number().min(0).max(168),
    executiveLaborCost: z.number().min(0).max(1000),
    annualEvents: z.number().min(0).max(10000),
    avgMemberValue: z.number().min(0).max(100000),
    currentRevenue: z.number().optional(),
    industryType: z.string().min(1).max(100),
  }),
  
  // Calculated values (from existing calculator)
  calculatedValues: z.object({
    // Admin staff calculations
    adminWeeklyHours: z.number(),
    adminAnnualHours: z.number(),
    adminAnnualWaste: z.number(),
    adminFreedHours: z.number(),
    adminLaborCostAvoided: z.number(),
    
    // Executive staff calculations
    executiveWeeklyHours: z.number(),
    executiveAnnualHours: z.number(),
    executiveAnnualWaste: z.number(),
    executiveFreedHours: z.number(),
    executiveLaborCostAvoided: z.number(),
    
    // Combined totals
    totalWeeklyHours: z.number(),
    totalAnnualHours: z.number(),
    annualWaste: z.number(),
    potentialFreedHours: z.number(),
    potentialFreedWeeklyHours: z.number(),
    laborCostAvoided: z.number(),
    
    // Revenue calculations
    newMembersAcquired: z.number(),
    memberRevenue: z.number(),
    newProgramRevenue: z.number(),
    partnershipRevenue: z.number(),
    churnReductionRevenue: z.number(),
    conservativeNewRevenue: z.number(),
    totalValueCreated: z.number(),
    
    // Task breakdown
    taskBreakdown: z.record(z.string(), z.object({
      annualHours: z.number(),
      annualCost: z.number(),
      percentage: z.number(),
    })),
  }),
  
  // Lead contact information
  contactInfo: z.object({
    fullName: z.string().min(1).max(200),
    email: z.string().email().max(200),
    phone: z.string().optional(),
    organizationName: z.string().min(1).max(200),
    jobTitle: z.string().min(1).max(200),
    signatureAuthority: z.number().optional(),
    timeline: z.string().min(1).max(100),
    language: z.enum(['en', 'de']).optional(),
  }),
});

type ValueReportRequest = z.infer<typeof ValueReportRequestSchema>;

/**
 * POST /api/value-report/generate
 * Generate PDF value report and send emails
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = ValueReportRequestSchema.parse(body);
    
    // Detect language from request headers and form data
    const acceptLanguage = request.headers.get('accept-language') || undefined;
    const detectedLanguage = detectLanguageFromContext(
      undefined, // No i18n context in API
      acceptLanguage,
      validatedData.contactInfo.language
    );
    
    // Add detected language to contact info
    const contactInfoWithLanguage: LeadContactInfo = {
      ...validatedData.contactInfo,
      language: detectedLanguage,
    };
    
    // Transform data for PDF system
    const { leadData, calculatedValues } = transformCalculatorDataForPDF(
      validatedData.calculatorInputs as ExistingCalculatorInputs,
      validatedData.calculatedValues as ExistingCalculatedValues,
      contactInfoWithLanguage
    );
    
    // Validate transformed data
    const validation = validateTransformedData(leadData, calculatedValues);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Data validation failed',
          details: validation.errors 
        },
        { status: 400 }
      );
    }
    
    // Validate email configuration
    const emailValidation = await validateResendConfig();
    if (!emailValidation.isValid) {
      console.error('Email configuration invalid:', emailValidation.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service unavailable',
          details: 'Please try again later'
        },
        { status: 503 }
      );
    }
    
    // Generate PDF using API Template.io
    const generator = getAPITemplateGenerator();
    const pdfResult = await generator.generateValueReportSafe(
      leadData,
      calculatedValues
    );
    
    if (!pdfResult.success || !pdfResult.pdf || !pdfResult.filename) {
      console.error('PDF generation failed:', pdfResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'PDF generation failed',
          details: pdfResult.error || 'Unknown PDF error'
        },
        { status: 500 }
      );
    }
    
    // Send emails with PDF attachment
    const emailResult = await sendValueReportEmails(
      leadData,
      calculatedValues,
      pdfResult.pdf,
      pdfResult.filename
    );
    
    if (!emailResult.overallSuccess) {
      console.error('Email delivery failed:', {
        customer: emailResult.customerEmail,
        sales: emailResult.salesEmail
      });
      
      // Check if at least customer email was sent
      const customerEmailSent = emailResult.customerEmail.success;
      const salesEmailSent = emailResult.salesEmail.success;
      
      if (customerEmailSent) {
        // Customer got their email, this is acceptable
        console.warn('Sales email failed but customer email succeeded');
        
        return NextResponse.json({
          success: true,
          message: 'Value report generated and delivered to customer successfully',
          warnings: ['Internal notification delivery failed'],
          data: {
            leadId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            pdfFilename: pdfResult.filename,
            emailDelivery: {
              customerMessageId: emailResult.customerEmail.messageId,
              salesMessageId: null,
            },
            processingTime: `${Date.now() - startTime}ms`,
            language: detectedLanguage,
            totalValue: calculatedValues.totalValueCreated,
            leadQuality: calculatedValues.leadQualityScore,
          }
        });
      } else {
        // Customer email failed - this is a problem
        return NextResponse.json(
          {
            success: false,
            error: 'Email delivery failed',
            details: {
              message: 'Your report was generated but could not be delivered via email',
              customerEmail: emailResult.customerEmail.error,
              salesEmail: emailResult.salesEmail.error,
              supportMessage: 'Please contact support with your email address to receive your report'
            },
            pdfGenerated: true,
            fallbackInstructions: {
              en: 'Please contact support at support@l4yercak3.com with your email address to receive your value report.',
              de: 'Bitte kontaktieren Sie den Support unter support@l4yercak3.com mit Ihrer E-Mail-Adresse, um Ihren Wertbericht zu erhalten.'
            }
          },
          { status: 207 } // Multi-status
        );
      }
    }
    
    // Success response
    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      message: 'Value report generated and delivered successfully',
      data: {
        leadId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Temporary ID
        pdfFilename: pdfResult.filename,
        emailDelivery: {
          customerMessageId: emailResult.customerEmail.messageId,
          salesMessageId: emailResult.salesEmail.messageId,
        },
        processingTime: `${processingTime}ms`,
        language: detectedLanguage,
        totalValue: calculatedValues.totalValueCreated,
        leadQuality: calculatedValues.leadQualityScore,
      }
    });
    
  } catch (error) {
    console.error('Value report generation error:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.issues.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/value-report/generate
 * Health check endpoint
 */
export async function GET() {
  try {
    // Check email service health
    const emailHealth = await validateResendConfig();
    
    // Check API Template.io service health
    const generator = getAPITemplateGenerator();
    const pdfHealth = await generator.getHealthStatus();
    
    return NextResponse.json({
      status: 'healthy',
      services: {
        email: emailHealth.isValid ? 'operational' : 'degraded',
        pdf: pdfHealth.status === 'healthy' ? 'operational' : pdfHealth.status,
      },
      timestamp: new Date().toISOString(),
      details: {
        email: emailHealth.isValid ? 'Email service ready' : emailHealth.error,
        pdf: pdfHealth.message,
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}