/**
 * API route for submitting pilot applications
 * Stores application in Convex and sends confirmation emails
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';
import { generateApplicationCustomerEmail, ApplicationData } from '@/lib/email-templates/application-customer';
import { generateApplicationSalesEmail } from '@/lib/email-templates/application-sales';
import { sendEmailWithRetry, getSenderConfig, getSalesTeamEmail, getReplyToEmail } from '@/lib/email-delivery/resend-client';
import { getBackendCRMClient } from '@/lib/crm-integration/backend-client';

// Initialize Convex client
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexHttpClient(convexUrl);

// Request validation schema
const ApplicationSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().min(1).max(50),
  company: z.string().min(1).max(200),
  role: z.string().min(1).max(200),
  teamSize: z.string().min(1),
  monthlySpend: z.string().min(1),
  currentChallenges: z.string().min(10).max(2000),
  language: z.enum(['en', 'de']),
});

type ApplicationRequest = z.infer<typeof ApplicationSchema>;

/**
 * POST /api/application/submit
 * Submit pilot application and send emails
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = ApplicationSchema.parse(body);

    // Store application in Convex
    const convexResult = await convex.mutation(api.applicationLeads.storeApplication, validatedData);

    if (!convexResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: convexResult.error || 'Failed to store application',
        },
        { status: 400 }
      );
    }

    // Prepare email data
    const applicationData: ApplicationData = {
      ...validatedData,
    };

    // Generate email templates
    const customerEmail = generateApplicationCustomerEmail(applicationData);
    const salesEmail = generateApplicationSalesEmail(applicationData);

    // Get email configuration
    const senderConfig = getSenderConfig();
    const salesTeamEmail = getSalesTeamEmail();
    const replyToEmail = getReplyToEmail();

    // Send customer confirmation email
    const customerResult = await sendEmailWithRetry({
      from: senderConfig.pilotEmail,
      to: validatedData.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      replyTo: replyToEmail,
    });

    // Send sales team notification email
    const salesResult = await sendEmailWithRetry({
      from: senderConfig.pilotEmail,
      to: salesTeamEmail,
      subject: salesEmail.subject,
      html: salesEmail.html,
      replyTo: replyToEmail,
    });

    // Submit to backend CRM (fire-and-forget)
    const crmClient = getBackendCRMClient();
    if (crmClient.isEnabled()) {
      crmClient.createContactFromApplication(
        validatedData.firstName,
        validatedData.lastName,
        validatedData.email,
        validatedData.phone,
        validatedData.company,
        validatedData.role,
        validatedData.teamSize,
        validatedData.monthlySpend,
        validatedData.currentChallenges
      ).then((result) => {
        if (result.success) {
          console.log(`✅ CRM contact created from application: ${result.contactId}`);
          if (result.organizationId) {
            console.log(`✅ CRM organization created/linked: ${result.organizationId}`);
          }
        } else {
          console.error(`❌ CRM submission failed: ${result.error}`);
        }
      }).catch((error) => {
        console.error('❌ CRM submission error:', error);
      });
    }

    // Check if at least customer email was sent
    if (!customerResult.success) {
      console.error('Customer email failed:', customerResult.error);

      // Application was stored but email failed
      return NextResponse.json(
        {
          success: false,
          error: 'Application received but email delivery failed',
          details: 'We have your application and will contact you directly.',
          applicationId: convexResult.applicationId,
        },
        { status: 207 } // Multi-status
      );
    }

    // Success response
    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        applicationId: convexResult.applicationId,
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
    console.error('Application submission error:', error);

    // Handle validation errors
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

    // Handle other errors
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
 * GET /api/application/submit
 * Health check endpoint
 */
export async function GET() {
  try {
    return NextResponse.json({
      status: 'healthy',
      service: 'Application submission API',
      timestamp: new Date().toISOString(),
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
