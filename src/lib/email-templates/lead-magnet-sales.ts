/**
 * Email template for sales team notification after Blueprint lead magnet submission
 */

import { LeadMagnetData } from './lead-magnet-customer';

export interface LeadMagnetSalesData extends LeadMagnetData {
  countryCode: string;
  phone: string;
  street: string;
  city: string;
  stateRegion: string;
  countryRegion: string;
  zip: string;
  clientCount: string;
  monthlyRevenue: string;
  teamSize: string;
}

const stageColors: Record<string, string> = {
  aspiring: '#94a3b8',
  starter: '#2563eb',
  growing: '#d97706',
  scaling: '#059669',
  established: '#7c3aed',
};

const stageLabels: Record<string, string> = {
  aspiring: 'Aspiring Agency Owner',
  starter: 'Early-Stage Agency',
  growing: 'Growing Agency',
  scaling: 'Scaling Agency',
  established: 'Established Agency',
};

export function generateLeadMagnetSalesEmail(
  data: LeadMagnetSalesData
): { subject: string; html: string } {
  const {
    firstName,
    lastName,
    email,
    countryCode,
    phone,
    street,
    city,
    stateRegion,
    countryRegion,
    zip,
    clientCount,
    monthlyRevenue,
    teamSize,
    agencyStage,
    language,
  } = data;

  const fullName = `${firstName} ${lastName}`;
  const stageColor = stageColors[agencyStage] || '#2563eb';
  const stageLabel = stageLabels[agencyStage] || agencyStage;
  const fullAddress = [street, city, stateRegion, zip, countryRegion].filter(Boolean).join(', ');

  return {
    subject: `Blueprint Lead: ${fullName} — ${stageLabel}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Blueprint Lead</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1f2937;">
  <div style="max-width: 700px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 32px; position: relative;">
      <div style="position: absolute; top: 16px; right: 16px; background-color: ${stageColor}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
        ${stageLabel}
      </div>

      <h1 style="margin: 0 0 8px 0; color: #ffffff; font-size: 24px; font-weight: 600;">
        New Blueprint Lead
      </h1>
      <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 14px;">
        Recurring Revenue Blueprint • Lead Magnet
      </p>
    </div>

    <!-- Lead Information -->
    <div style="padding: 32px;">

      <!-- Contact Details -->
      <div style="margin-bottom: 32px; padding: 24px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
          Contact Information
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 140px;">Name:</td>
            <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Phone:</td>
            <td style="padding: 8px 0;">
              <a href="tel:${countryCode}${phone}" style="color: #2563eb; text-decoration: none;">${countryCode} ${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Language:</td>
            <td style="padding: 8px 0; color: #1f2937;">${language === 'de' ? 'German' : 'English'}</td>
          </tr>
        </table>
      </div>

      <!-- Address -->
      <div style="margin-bottom: 32px; padding: 24px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #d97706;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
          Shipping Address
        </h2>
        <p style="margin: 0; color: #1f2937; line-height: 1.6;">
          ${fullAddress}
        </p>
      </div>

      <!-- Agency Details -->
      <div style="margin-bottom: 32px; padding: 24px; background-color: #f0fdf4; border-radius: 8px; border-left: 4px solid ${stageColor};">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
          Agency Journey
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 140px;">Stage:</td>
            <td style="padding: 8px 0; color: #1f2937; font-weight: 700;">${stageLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Clients:</td>
            <td style="padding: 8px 0; color: #1f2937;">${clientCount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Monthly Revenue:</td>
            <td style="padding: 8px 0; color: #1f2937;">${monthlyRevenue}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Team Size:</td>
            <td style="padding: 8px 0; color: #1f2937;">${teamSize}</td>
          </tr>
        </table>
      </div>

      <!-- Quick Actions -->
      <div style="margin-top: 32px; padding: 24px; background-color: #eff6ff; border-radius: 8px; border: 2px solid #2563eb;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
          Quick Actions
        </h2>
        <a href="mailto:${email}?subject=Re:%20Your%20Recurring%20Revenue%20Blueprint"
           style="display: inline-block; margin-right: 8px; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Reply to ${firstName}
        </a>
      </div>

      <!-- Metadata -->
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #94a3b8;">
          <strong>Source:</strong> Blueprint Lead Magnet (/blueprint)
        </p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">
          <strong>Submitted:</strong> ${new Date().toLocaleString()}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 24px 32px; background-color: #1f2937; text-align: center;">
      <p style="margin: 0; font-size: 13px; color: #9ca3af;">
        L4YERCAK3 Sales CRM — Blueprint Lead Notification
      </p>
    </div>
  </div>
</body>
</html>
    `,
  };
}
