/**
 * Email template for Blueprint delivery after lead magnet form submission
 */

export interface LeadMagnetData {
  firstName: string;
  lastName: string;
  email: string;
  agencyStage: string;
  language: 'en' | 'de';
  downloadUrl: string;
}

const SKOOL_URL = 'https://www.skool.com/der-hebel-1168/about';

const stageLabels: Record<string, { en: string; de: string }> = {
  aspiring: { en: 'Aspiring Agency Owner', de: 'Angehender Agenturinhaber' },
  starter: { en: 'Early-Stage Agency', de: 'Agentur im Aufbau' },
  growing: { en: 'Growing Agency', de: 'Wachsende Agentur' },
  scaling: { en: 'Scaling Agency', de: 'Skalierende Agentur' },
  established: { en: 'Established Agency', de: 'Etablierte Agentur' },
};

export function generateLeadMagnetCustomerEmail(
  data: LeadMagnetData
): { subject: string; html: string } {
  const { firstName, agencyStage, language, downloadUrl } = data;
  const stageLabel = stageLabels[agencyStage]?.[language] || agencyStage;

  if (language === 'de') {
    return {
      subject: 'Dein Recurring Revenue Blueprint ist bereit',
      html: `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dein Blueprint</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1f2937;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 40px 32px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
        L4YERCAK3
      </h1>
      <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
        The Recurring Revenue Blueprint
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 32px;">
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        Hallo ${firstName},
      </p>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        Dein <strong>Recurring Revenue Blueprint</strong> ist bereit. Klicke auf den Button unten, um ihn herunterzuladen.
      </p>

      <!-- Download CTA -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="${downloadUrl}"
           style="display: inline-block; padding: 16px 40px; background-color: #1f2937; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
          BLUEPRINT HERUNTERLADEN
        </a>
      </div>

      <!-- Stage Message -->
      <div style="margin: 32px 0; padding: 20px; background-color: #f0fdf4; border-radius: 8px; border-left: 4px solid #22c55e;">
        <p style="margin: 0; font-size: 15px; color: #1f2937;">
          Basierend auf deinen Antworten bist du in der Phase: <strong>${stageLabel}</strong>
        </p>
      </div>

      <!-- What's Inside -->
      <h2 style="margin: 32px 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
        Was drin steckt:
      </h2>
      <ul style="margin: 0 0 24px 0; padding-left: 20px; font-size: 15px; line-height: 2; color: #374151;">
        <li>Der Engpass-Diagnose-Check</li>
        <li>Das Client Packaging Framework (Bronze/Silber/Gold)</li>
        <li>Das 2-Stunden-Onboarding-System</li>
        <li>Das ROI Pitch Script</li>
        <li>6 Funnel-Templates nach Branche</li>
        <li>Die Skalierungs-Mathematik (5, 10, 20 Kunden)</li>
      </ul>

      <!-- Community CTA -->
      <div style="margin: 32px 0; padding: 24px; background-color: #f8fafc; border-radius: 8px; text-align: center;">
        <p style="margin: 0 0 16px 0; font-size: 15px; color: #374151;">
          Tritt der kostenlosen Community bei — Templates, Strategien und echte Zahlen von 1.000+ Agency Buildern.
        </p>
        <a href="${SKOOL_URL}"
           style="display: inline-block; padding: 12px 28px; background-color: #ffffff; color: #1f2937; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; border: 2px solid #1f2937;">
          Community beitreten
        </a>
      </div>

      <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Bei Fragen: <a href="mailto:remington@l4yercak3.com" style="color: #2563eb; text-decoration: none;">remington@l4yercak3.com</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 24px 32px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; font-size: 13px; color: #64748b;">
        &copy; ${new Date().getFullYear()} L4YERCAK3. Alle Rechte vorbehalten.
      </p>
    </div>
  </div>
</body>
</html>
      `,
    };
  }

  // English version
  return {
    subject: 'Your Recurring Revenue Blueprint is Ready',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Blueprint</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1f2937;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 40px 32px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
        L4YERCAK3
      </h1>
      <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
        The Recurring Revenue Blueprint
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 32px;">
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        Hi ${firstName},
      </p>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
        Your <strong>Recurring Revenue Blueprint</strong> is ready. Click the button below to download it.
      </p>

      <!-- Download CTA -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="${downloadUrl}"
           style="display: inline-block; padding: 16px 40px; background-color: #1f2937; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
          DOWNLOAD BLUEPRINT
        </a>
      </div>

      <!-- Stage Message -->
      <div style="margin: 32px 0; padding: 20px; background-color: #f0fdf4; border-radius: 8px; border-left: 4px solid #22c55e;">
        <p style="margin: 0; font-size: 15px; color: #1f2937;">
          Based on your answers, you are at the <strong>${stageLabel}</strong> stage.
        </p>
      </div>

      <!-- What's Inside -->
      <h2 style="margin: 32px 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
        What's inside:
      </h2>
      <ul style="margin: 0 0 24px 0; padding-left: 20px; font-size: 15px; line-height: 2; color: #374151;">
        <li>The Bottleneck Diagnostic</li>
        <li>The Client Packaging Framework (Bronze/Silver/Gold)</li>
        <li>The 2-Hour Client Onboarding System</li>
        <li>The ROI Pitch Script</li>
        <li>6 Funnel Templates by Vertical</li>
        <li>The Scaling Math (5, 10, 20 clients)</li>
      </ul>

      <!-- Community CTA -->
      <div style="margin: 32px 0; padding: 24px; background-color: #f8fafc; border-radius: 8px; text-align: center;">
        <p style="margin: 0 0 16px 0; font-size: 15px; color: #374151;">
          Join the free community — templates, strategies, and real numbers from 1,000+ agency builders.
        </p>
        <a href="${SKOOL_URL}"
           style="display: inline-block; padding: 12px 28px; background-color: #ffffff; color: #1f2937; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; border: 2px solid #1f2937;">
          Join the Community
        </a>
      </div>

      <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Questions? <a href="mailto:remington@l4yercak3.com" style="color: #2563eb; text-decoration: none;">remington@l4yercak3.com</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 24px 32px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; font-size: 13px; color: #64748b;">
        &copy; ${new Date().getFullYear()} L4YERCAK3. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
    `,
  };
}
