/**
 * Email template for customer confirmation after pilot application
 */

import { getCalAppointmentLink } from '../email-delivery/resend-client';

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  teamSize: string;
  monthlySpend: string;
  currentChallenges: string;
  language: 'en' | 'de';
}

/**
 * Generate customer confirmation email for pilot application
 */
export function generateApplicationCustomerEmail(
  applicationData: ApplicationData
): { subject: string; html: string } {
  const { firstName, language } = applicationData;
  const calLink = getCalAppointmentLink();

  // Get current quarter + year for context
  const getTargetQuarterAndYear = () => {
    const today = new Date();
    const threeMonthsAhead = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    const month = threeMonthsAhead.getMonth();
    const year = threeMonthsAhead.getFullYear();
    const quarter = Math.floor(month / 3) + 1;
    return { quarter: `Q${quarter}`, year: year.toString() };
  };

  const { quarter, year } = getTargetQuarterAndYear();

  if (language === 'de') {
    return {
      subject: `Vielen Dank für Ihre Bewerbung - ${quarter} ${year} Pilot`,
      html: `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bewerbung erhalten</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1f2937;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 32px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
        L4YERCAK3
      </h1>
      <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
        Ihre Bewerbung wurde erhalten
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 32px;">
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        Hallo ${firstName},
      </p>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        Vielen Dank für Ihr Interesse am <strong>L4YERCAK3 ${quarter} ${year} Pilotprogramm</strong>!
      </p>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        Wir haben Ihre Bewerbung erhalten und unser Team wird diese in Kürze prüfen. Wir melden uns innerhalb von <strong>24 Stunden</strong> bei Ihnen.
      </p>

      <!-- CTA Buttons -->
      <div style="margin: 32px 0; padding: 24px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
        <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
          Nächste Schritte:
        </p>

        <!-- Book a Call Button -->
        <a href="${calLink}"
           style="display: inline-block; margin: 0 8px 12px 0; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
          📞 Beratungsgespräch buchen
        </a>

        <!-- Value Calculator Button -->
        <a href="https://l4yercak3.com/do-more-with-less"
           style="display: inline-block; margin: 0 8px 12px 0; padding: 12px 24px; background-color: #ffffff; color: #2563eb; text-decoration: none; border-radius: 6px; border: 2px solid #2563eb; font-weight: 600; font-size: 14px;">
          💰 ROI-Rechner
        </a>
      </div>

      <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 1.6; color: #64748b;">
        Möchten Sie sofort sehen, wie viel Wert L4YERCAK3 für Ihre Organisation schaffen kann? Nutzen Sie unseren <a href="https://l4yercak3.com/do-more-with-less" style="color: #2563eb; text-decoration: none;">interaktiven ROI-Rechner</a> und erhalten Sie einen personalisierten Wertbericht.
      </p>

      <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 8px 0; font-size: 14px; color: #64748b;">
          Bei Fragen können Sie uns gerne kontaktieren:
        </p>
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          📧 <a href="mailto:remington@l4yercak3.com" style="color: #2563eb; text-decoration: none;">remington@l4yercak3.com</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 24px 32px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">
        © ${new Date().getFullYear()} L4YERCAK3. Alle Rechte vorbehalten.
      </p>
      <p style="margin: 0; font-size: 12px; color: #94a3b8;">
        Entwickelt, um Ihnen zu helfen, mehr mit weniger zu erreichen.
      </p>
    </div>
  </div>
</body>
</html>
      `
    };
  }

  // English version
  return {
    subject: `Thank You for Your Application - ${quarter} ${year} Pilot`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1f2937;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 32px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
        L4YERCAK3
      </h1>
      <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
        Your Application Has Been Received
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 32px;">
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        Hi ${firstName},
      </p>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        Thank you for your interest in the <strong>L4YERCAK3 ${quarter} ${year} Pilot Program</strong>!
      </p>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        We've received your application and our team will review it shortly. We'll get back to you within <strong>24 hours</strong>.
      </p>

      <!-- CTA Buttons -->
      <div style="margin: 32px 0; padding: 24px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
        <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
          Next Steps:
        </p>

        <!-- Book a Call Button -->
        <a href="${calLink}"
           style="display: inline-block; margin: 0 8px 12px 0; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
          📞 Book a Discovery Call
        </a>

        <!-- Value Calculator Button -->
        <a href="https://l4yercak3.com/do-more-with-less"
           style="display: inline-block; margin: 0 8px 12px 0; padding: 12px 24px; background-color: #ffffff; color: #2563eb; text-decoration: none; border-radius: 6px; border: 2px solid #2563eb; font-weight: 600; font-size: 14px;">
          💰 Calculate Your ROI
        </a>
      </div>

      <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 1.6; color: #64748b;">
        Want to see exactly how much value L4YERCAK3 can create for your organization? Use our <a href="https://l4yercak3.com/do-more-with-less" style="color: #2563eb; text-decoration: none;">interactive value calculator</a> to get a personalized value report.
      </p>

      <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 8px 0; font-size: 14px; color: #64748b;">
          If you have any questions, feel free to reach out:
        </p>
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          📧 <a href="mailto:remington@l4yercak3.com" style="color: #2563eb; text-decoration: none;">remington@l4yercak3.com</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 24px 32px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">
        © ${new Date().getFullYear()} L4YERCAK3. All rights reserved.
      </p>
      <p style="margin: 0; font-size: 12px; color: #94a3b8;">
        Built to help you do more with less.
      </p>
    </div>
  </div>
</body>
</html>
    `
  };
}
