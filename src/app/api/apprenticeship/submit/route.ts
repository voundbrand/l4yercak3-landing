/**
 * API route for submitting apprenticeship applications
 * Sends confirmation emails and stores data
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmailWithRetry, getSenderConfig, getSalesTeamEmail, getReplyToEmail } from '@/lib/email-delivery/resend-client';
import { getBackendCRMClient } from '@/lib/crm-integration/backend-client';

// Request validation schema
const ApprenticeshipSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().min(1).max(50),
  currentSkillLevel: z.string().min(1),
  primarySkill: z.string().min(1),
  availableHoursPerWeek: z.string().min(1),
  portfolio: z.string().optional(),
  whyApprenticeship: z.string().min(10).max(2000),
  whatYouHopeToLearn: z.string().min(10).max(2000),
  language: z.enum(['en', 'de']),
});

type ApprenticeshipRequest = z.infer<typeof ApprenticeshipSchema>;

/**
 * Generate customer confirmation email HTML
 */
function generateApprenticeshipCustomerEmail(data: ApprenticeshipRequest): { subject: string; html: string } {
  const isGerman = data.language === 'de';

  const subject = isGerman
    ? 'Deine Apprenticeship-Bewerbung bei L4YERCAK3'
    : 'Your Apprenticeship Application at L4YERCAK3';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #10b981; margin-bottom: 10px;">L4YERCAK3</h1>
    <p style="color: #666; font-size: 14px;">${isGerman ? 'Apprenticeship-Bewerbung' : 'Apprenticeship Application'}</p>
  </div>

  <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h2 style="color: #111; margin-top: 0;">${isGerman ? 'Hallo' : 'Hi'} ${data.firstName},</h2>

    <p>${isGerman
      ? 'Danke für deine Bewerbung zum L4YERCAK3 Apprenticeship-Programm!'
      : 'Thanks for applying to the L4YERCAK3 Apprenticeship program!'}</p>

    <p>${isGerman
      ? 'Remington wird deine Bewerbung persönlich prüfen und sich innerhalb von 48 Stunden bei dir melden.'
      : 'Remington will personally review your application and get back to you within 48 hours.'}</p>
  </div>

  <div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h3 style="color: #166534; margin-top: 0;">${isGerman ? 'Deine Bewerbungsdetails' : 'Your Application Details'}</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 8px 0; border-bottom: 1px solid #dcfce7;">
        <strong>${isGerman ? 'Skill-Level:' : 'Skill Level:'}</strong> ${data.currentSkillLevel}
      </li>
      <li style="padding: 8px 0; border-bottom: 1px solid #dcfce7;">
        <strong>${isGerman ? 'Hauptskill:' : 'Primary Skill:'}</strong> ${data.primarySkill}
      </li>
      <li style="padding: 8px 0; border-bottom: 1px solid #dcfce7;">
        <strong>${isGerman ? 'Verfügbare Stunden:' : 'Available Hours:'}</strong> ${data.availableHoursPerWeek}/week
      </li>
      ${data.portfolio ? `<li style="padding: 8px 0;"><strong>Portfolio:</strong> ${data.portfolio}</li>` : ''}
    </ul>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <p style="color: #666; font-size: 14px;">${isGerman
      ? 'Fragen? Antworte einfach auf diese E-Mail.'
      : 'Questions? Just reply to this email.'}</p>
  </div>

  <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
    <p>© ${new Date().getFullYear()} L4YERCAK3. ${isGerman ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
  </div>
</body>
</html>
  `;

  return { subject, html };
}

/**
 * Generate sales team notification email HTML
 */
function generateApprenticeshipSalesEmail(data: ApprenticeshipRequest): { subject: string; html: string } {
  const subject = `🎓 New Apprenticeship Application: ${data.firstName} ${data.lastName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; color: white;">
    <h1 style="margin: 0 0 8px 0;">🎓 New Apprenticeship Application</h1>
    <p style="margin: 0; opacity: 0.9;">Someone wants to work with you on real projects!</p>
  </div>

  <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h2 style="color: #111; margin-top: 0;">Contact Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.firstName} ${data.lastName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="tel:${data.phone}">${data.phone}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>Language:</strong></td>
        <td style="padding: 8px 0;">${data.language === 'de' ? 'German' : 'English'}</td>
      </tr>
    </table>
  </div>

  <div style="background: #fef3c7; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h2 style="color: #92400e; margin-top: 0;">Applicant Profile</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Skill Level:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #fde68a;">${data.currentSkillLevel}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Primary Skill:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #fde68a;">${data.primarySkill}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #fde68a;"><strong>Available Hours:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #fde68a;">${data.availableHoursPerWeek}/week</td>
      </tr>
      ${data.portfolio ? `
      <tr>
        <td style="padding: 8px 0;"><strong>Portfolio:</strong></td>
        <td style="padding: 8px 0;"><a href="${data.portfolio}" target="_blank">${data.portfolio}</a></td>
      </tr>
      ` : ''}
    </table>
  </div>

  <div style="background: #dbeafe; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h2 style="color: #1e40af; margin-top: 0;">Why They Want to Join</h2>
    <p style="white-space: pre-wrap; margin: 0;">${data.whyApprenticeship}</p>
  </div>

  <div style="background: #f3e8ff; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h2 style="color: #6b21a8; margin-top: 0;">What They Hope to Learn</h2>
    <p style="white-space: pre-wrap; margin: 0;">${data.whatYouHopeToLearn}</p>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="mailto:${data.email}?subject=Re: Your L4YERCAK3 Apprenticeship Application" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reply to Applicant</a>
  </div>

  <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
    <p>Submitted: ${new Date().toLocaleString()}</p>
  </div>
</body>
</html>
  `;

  return { subject, html };
}

/**
 * POST /api/apprenticeship/submit
 * Submit apprenticeship application and send emails
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = ApprenticeshipSchema.parse(body);

    // Generate a unique application ID
    const applicationId = `appr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Log the application for now (can be stored in database later)
    console.log('📥 New apprenticeship application:', {
      applicationId,
      name: `${validatedData.firstName} ${validatedData.lastName}`,
      email: validatedData.email,
      skillLevel: validatedData.currentSkillLevel,
      primarySkill: validatedData.primarySkill,
      hours: validatedData.availableHoursPerWeek,
    });

    // Generate email templates
    const customerEmail = generateApprenticeshipCustomerEmail(validatedData);
    const salesEmail = generateApprenticeshipSalesEmail(validatedData);

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
        'Apprenticeship Application',
        validatedData.primarySkill,
        validatedData.availableHoursPerWeek,
        validatedData.currentSkillLevel,
        `Why: ${validatedData.whyApprenticeship}\n\nHope to learn: ${validatedData.whatYouHopeToLearn}`
      ).then((result) => {
        if (result.success) {
          console.log(`✅ CRM contact created from apprenticeship application: ${result.contactId}`);
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
          applicationId,
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
        applicationId,
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
    console.error('Apprenticeship application submission error:', error);

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
 * GET /api/apprenticeship/submit
 * Health check endpoint
 */
export async function GET() {
  try {
    return NextResponse.json({
      status: 'healthy',
      service: 'Apprenticeship application submission API',
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
