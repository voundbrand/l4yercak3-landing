/**
 * API route for generating and delivering PDF value reports
 * Based on requirements 6.4, 5.4, 1.1, 1.2, 5.1
 */

import { NextRequest, NextResponse } from 'next/server';
import { z, ZodIssue } from 'zod';
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
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

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

/**
 * POST /api/value-report/generate
 * Generate PDF value report and send emails
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse and validate request body
    const body = await request.json();
    console.log('[Value Report API] Request received', {
      email: body.contactInfo?.email,
      organizationName: body.contactInfo?.organizationName,
      language: body.contactInfo?.language,
    });

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

    // Store lead data in Convex database
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    let leadId: string | null = null;

    if (convexUrl) {
      try {
        const convex = new ConvexHttpClient(convexUrl);
        const result = await convex.mutation(api.valueCalculatorLeads.storeLead, {
          // Contact Information
          fullName: leadData.fullName,
          email: leadData.email,
          phone: leadData.phone,
          organizationName: leadData.organizationName,
          jobTitle: leadData.jobTitle,
          signatureAuthority: leadData.signatureAuthority,
          timeline: leadData.timeline,

          // Organization Metrics
          organizationSize: leadData.organizationSize,
          adminStaffCount: leadData.adminStaffCount,
          manualHoursPerWeek: leadData.manualHoursPerWeek,
          loadedLaborCost: leadData.loadedLaborCost,
          annualEvents: leadData.annualEvents,
          avgMemberValue: leadData.avgMemberValue,
          currentRevenue: leadData.currentRevenue,
          industryType: leadData.industryType,

          // Calculated Values
          totalAnnualHours: calculatedValues.totalAnnualHours,
          annualWaste: calculatedValues.annualWaste,
          potentialFreedHours: calculatedValues.potentialFreedHours,
          laborCostAvoided: calculatedValues.laborCostAvoided,
          newRevenuePotential: calculatedValues.newRevenuePotential,
          totalValueCreated: calculatedValues.totalValueCreated,

          // Pricing Intelligence
          conservativePricing: calculatedValues.pricing.conservative,
          targetPricing: calculatedValues.pricing.target,
          aggressivePricing: calculatedValues.pricing.aggressive,
          premiumPricing: calculatedValues.pricing.premium,

          // Sales Intelligence
          recommendedPhase: calculatedValues.recommendedPhase,
          leadQualityScore: calculatedValues.leadQualityScore,

          // System Fields
          language: detectedLanguage,
        });

        if (result.success && result.leadId) {
          leadId = result.leadId;
        }
      } catch (convexError) {
        console.error('Failed to store lead in Convex:', convexError);
        // Continue even if Convex storage fails - don't block PDF/email delivery
      }
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
    console.log('[Value Report API] Sending emails...', {
      customerEmail: leadData.email,
      pdfFilename: pdfResult.filename,
      language: detectedLanguage,
    });

    const emailResult = await sendValueReportEmails(
      leadData,
      calculatedValues,
      pdfResult.pdf,
      pdfResult.filename
    );

    console.log('[Value Report API] Email result:', {
      overallSuccess: emailResult.overallSuccess,
      customerEmailSuccess: emailResult.customerEmail.success,
      customerEmailError: emailResult.customerEmail.error,
      salesEmailSuccess: emailResult.salesEmail.success,
      salesEmailError: emailResult.salesEmail.error,
    });

    // Update email tracking in Convex if we have a leadId
    if (convexUrl && leadId) {
      try {
        const convex = new ConvexHttpClient(convexUrl);
        await convex.mutation(api.valueCalculatorLeads.updateEmailTracking, {
          leadId: leadId as Id<"valueCalculatorLeads">,
          customerEmailSent: emailResult.customerEmail.success,
          salesEmailSent: emailResult.salesEmail.success,
          pdfGenerated: true,
        });
      } catch (convexError) {
        console.error('Failed to update email tracking in Convex:', convexError);
        // Continue even if tracking update fails
      }
    }

    // Sync to backend CRM (contact + organization creation)
    const CRM_URL = process.env.L4YERCAK3_BACKEND_URL;
    const CRM_API_KEY = process.env.L4YERCAK3_API_KEY;

    if (CRM_URL && CRM_API_KEY) {
      try {
        console.log('[Value Report API] Syncing to CRM:', {
          email: leadData.email,
          organization: leadData.organizationName,
        });

        // Parse name for CRM
        const nameParts = leadData.fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || 'Lead';

        const crmResponse = await fetch(`${CRM_URL}/api/v1/crm/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CRM_API_KEY}`,
            'X-Organization-Id': process.env.L4YERCAK3_ORGANIZATION_ID || '',
          },
          body: JSON.stringify({
            subtype: 'lead',
            firstName,
            lastName,
            email: leadData.email,
            phone: leadData.phone,
            jobTitle: leadData.jobTitle,
            source: 'value-calculator',
            sourceRef: leadId || `temp-${Date.now()}`,
            tags: ['LC-report', 'value-calculator', calculatedValues.leadQualityScore.toLowerCase()],
            notes: `Value Calculator Lead - ${calculatedValues.leadQualityScore} quality. Timeline: ${leadData.timeline}. Total value: $${calculatedValues.totalValueCreated.toLocaleString()}`,
            customFields: {
              signatureAuthority: leadData.signatureAuthority,
              timeline: leadData.timeline,
              recommendedPhase: calculatedValues.recommendedPhase,
              leadQualityScore: calculatedValues.leadQualityScore,
              language: detectedLanguage,
              totalValueCreated: calculatedValues.totalValueCreated,
              laborCostAvoided: calculatedValues.laborCostAvoided,
              newRevenuePotential: calculatedValues.newRevenuePotential,
            },
            organizationInfo: {
              name: leadData.organizationName,
              industry: leadData.industryType,
              // Store comprehensive organization metrics
              size: leadData.organizationSize,
              adminStaffCount: leadData.adminStaffCount,
              manualHoursPerWeek: leadData.manualHoursPerWeek,
              loadedLaborCost: leadData.loadedLaborCost,
              annualEvents: leadData.annualEvents,
              avgMemberValue: leadData.avgMemberValue,
              currentRevenue: leadData.currentRevenue,
              // Calculated values for organization
              metrics: {
                totalAnnualHours: calculatedValues.totalAnnualHours,
                annualWaste: calculatedValues.annualWaste,
                potentialFreedHours: calculatedValues.potentialFreedHours,
                laborCostAvoided: calculatedValues.laborCostAvoided,
                newRevenuePotential: calculatedValues.newRevenuePotential,
                totalValueCreated: calculatedValues.totalValueCreated,
              },
              pricing: {
                conservative: calculatedValues.pricing.conservative,
                target: calculatedValues.pricing.target,
                aggressive: calculatedValues.pricing.aggressive,
                premium: calculatedValues.pricing.premium,
              },
            },
          }),
        });

        const crmResult = await crmResponse.json();

        if (!crmResponse.ok) {
          console.error('[Value Report API] CRM sync failed:', crmResult.error);
        } else {
          console.log('[Value Report API] CRM sync successful:', {
            contactId: crmResult.contactId,
            crmOrganizationId: crmResult.crmOrganizationId,
            isNewContact: crmResult.isNewContact,
          });
        }
      } catch (crmError) {
        console.error('[Value Report API] CRM sync error:', crmError);
        // Continue even if CRM sync fails - don't block the response
      }
    } else {
      console.warn('[Value Report API] CRM not configured - skipping sync');
    }
    
    if (!emailResult.overallSuccess) {
      console.error('Email delivery failed:', {
        customer: emailResult.customerEmail,
        sales: emailResult.salesEmail
      });
      
      // Check if at least customer email was sent
      const customerEmailSent = emailResult.customerEmail.success;

      if (customerEmailSent) {
        // Customer got their email, this is acceptable
        console.warn('Sales email failed but customer email succeeded');
        
        return NextResponse.json({
          success: true,
          message: 'Value report generated and delivered to customer successfully',
          warnings: ['Internal notification delivery failed'],
          data: {
            leadId: leadId || `temp-${Date.now()}`,
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
        leadId: leadId || `temp-${Date.now()}`,
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
          details: error.issues.map((err: ZodIssue) => ({
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