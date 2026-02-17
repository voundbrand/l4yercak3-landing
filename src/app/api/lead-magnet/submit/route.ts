/**
 * API route for submitting Blueprint lead magnet form
 * Stores lead in Convex, sends Blueprint delivery email, notifies sales
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';
import { generateLeadMagnetCustomerEmail } from '@/lib/email-templates/lead-magnet-customer';
import { generateLeadMagnetSalesEmail } from '@/lib/email-templates/lead-magnet-sales';
import { sendEmailWithRetry, getSenderConfig, getSalesTeamEmail, getReplyToEmail } from '@/lib/email-delivery/resend-client';
import { getBackendCRMClient } from '@/lib/crm-integration/backend-client';
import { getBlueprintDownloadUrl } from '@/lib/blueprint/config';

// Initialize Convex client
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexHttpClient(convexUrl);

// Request validation schema
const LeadMagnetSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  countryCode: z.string().min(1).max(10),
  phone: z.string().min(1).max(50),
  street: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  stateRegion: z.string().max(100).default(''),
  countryRegion: z.string().min(1).max(100),
  zip: z.string().min(1).max(20),
  clientCount: z.string().min(1),
  monthlyRevenue: z.string().min(1),
  teamSize: z.string().min(1),
  language: z.enum(['en', 'de']),
});

/**
 * POST /api/lead-magnet/submit
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = LeadMagnetSchema.parse(body);

    // Store lead in Convex
    const convexResult = await convex.mutation(api.leadMagnetLeads.storeLead, validatedData);

    if (!convexResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: convexResult.error || 'Failed to store lead',
        },
        { status: 400 }
      );
    }

    // Get stage-specific Blueprint download URL
    const downloadUrl = getBlueprintDownloadUrl(convexResult.agencyStage!);

    // Generate email templates
    const customerEmail = generateLeadMagnetCustomerEmail({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      agencyStage: convexResult.agencyStage!,
      language: validatedData.language,
      downloadUrl,
    });

    const salesEmail = generateLeadMagnetSalesEmail({
      ...validatedData,
      agencyStage: convexResult.agencyStage!,
      downloadUrl,
    });

    // Get email configuration
    const senderConfig = getSenderConfig();
    const salesTeamEmail = getSalesTeamEmail();
    const replyToEmail = getReplyToEmail();

    // Send customer email (Blueprint delivery)
    const customerResult = await sendEmailWithRetry({
      from: senderConfig.customerEmail,
      to: validatedData.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      replyTo: replyToEmail,
    });

    // Send sales team notification
    const salesResult = await sendEmailWithRetry({
      from: senderConfig.salesEmail,
      to: salesTeamEmail,
      subject: salesEmail.subject,
      html: salesEmail.html,
      replyTo: replyToEmail,
    });

    // Update email tracking in Convex (fire-and-forget)
    if (convexResult.leadId) {
      convex.mutation(api.leadMagnetLeads.updateEmailTracking, {
        leadId: convexResult.leadId,
        confirmationEmailSent: customerResult.success,
        salesNotificationSent: salesResult.success,
      }).catch((error: unknown) => {
        console.error('Failed to update email tracking:', error);
      });
    }

    // Fire-and-forget CRM sync
    const crmClient = getBackendCRMClient();
    if (crmClient.isEnabled()) {
      crmClient.createContactWithRetry({
        contactInfo: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: `${validatedData.countryCode}${validatedData.phone}`,
          source: 'application',
          notes: `Blueprint lead magnet. Stage: ${convexResult.agencyStage}. Clients: ${validatedData.clientCount}. Revenue: ${validatedData.monthlyRevenue}.`,
        },
        tags: ['blueprint-lead-magnet', convexResult.agencyStage || 'unknown'],
        metadata: {
          agencyStage: convexResult.agencyStage,
          clientCount: validatedData.clientCount,
          monthlyRevenue: validatedData.monthlyRevenue,
          teamSize: validatedData.teamSize,
          address: `${validatedData.city}, ${validatedData.countryRegion}`,
        },
      }).then((result) => {
        if (result.success) {
          console.log(`CRM contact created from blueprint lead: ${result.contactId}`);
        } else {
          console.error(`CRM submission failed: ${result.error}`);
        }
      }).catch((error: unknown) => {
        console.error('CRM submission error:', error);
      });
    }

    // Check if customer email was sent
    if (!customerResult.success) {
      console.error('Customer email failed:', customerResult.error);
      return NextResponse.json(
        {
          success: false,
          error: 'Lead received but email delivery failed',
          details: 'We have your information and will send the Blueprint manually.',
          leadId: convexResult.leadId,
          agencyStage: convexResult.agencyStage,
        },
        { status: 207 }
      );
    }

    // Success
    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: 'Blueprint is on its way',
      data: {
        leadId: convexResult.leadId,
        agencyStage: convexResult.agencyStage,
        downloadUrl,
        emailDelivery: {
          customerMessageId: customerResult.messageId,
          salesMessageId: salesResult.messageId,
          customerEmailSent: customerResult.success,
          salesEmailSent: salesResult.success,
        },
        processingTime: `${processingTime}ms`,
      },
    });
  } catch (error) {
    console.error('Lead magnet submission error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/lead-magnet/submit — Health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Lead magnet submission API',
    timestamp: new Date().toISOString(),
  });
}
