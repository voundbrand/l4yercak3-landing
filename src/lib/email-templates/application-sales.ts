/**
 * Email template for sales team notification after pilot application
 */

import { ApplicationData } from './application-customer';

/**
 * Generate sales team notification email for pilot application
 */
export function generateApplicationSalesEmail(
  applicationData: ApplicationData
): { subject: string; html: string } {
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    role,
    teamSize,
    monthlySpend,
    currentChallenges,
    language
  } = applicationData;

  const fullName = `${firstName} ${lastName}`;

  // Get current quarter + year
  const getTargetQuarterAndYear = () => {
    const today = new Date();
    const threeMonthsAhead = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    const month = threeMonthsAhead.getMonth();
    const year = threeMonthsAhead.getFullYear();
    const quarter = Math.floor(month / 3) + 1;
    return { quarter: `Q${quarter}`, year: year.toString() };
  };

  const { quarter, year } = getTargetQuarterAndYear();

  // Determine qualification level based on team size and spend
  const getQualificationLevel = () => {
    const spendValue = monthlySpend.replace(/[^0-9-]/g, '');
    const teamValue = teamSize.replace(/[^0-9-]/g, '');

    if (spendValue.includes('5000+') || teamValue.includes('100+')) {
      return { level: 'HIGH', color: '#059669', emoji: '🔥' };
    } else if (spendValue.includes('2500') || teamValue.includes('50')) {
      return { level: 'MEDIUM', color: '#d97706', emoji: '⭐' };
    }
    return { level: 'STANDARD', color: '#2563eb', emoji: '📋' };
  };

  const qualification = getQualificationLevel();

  return {
    subject: `${qualification.emoji} New ${quarter} ${year} Pilot Application: ${fullName} at ${company}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Pilot Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1f2937;">
  <div style="max-width: 700px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <!-- Header with Qualification Badge -->
    <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 32px; position: relative;">
      <div style="position: absolute; top: 16px; right: 16px; background-color: ${qualification.color}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
        ${qualification.emoji} ${qualification.level} PRIORITY
      </div>

      <h1 style="margin: 0 0 8px 0; color: #ffffff; font-size: 24px; font-weight: 600;">
        New Pilot Application
      </h1>
      <p style="margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 14px;">
        ${quarter} ${year} Program • Submitted via Urgency Pill
      </p>
    </div>

    <!-- Lead Information -->
    <div style="padding: 32px;">

      <!-- Contact Details -->
      <div style="margin-bottom: 32px; padding: 24px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
          👤 Contact Information
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
              <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Language:</td>
            <td style="padding: 8px 0; color: #1f2937;">${language === 'de' ? '🇩🇪 German' : '🇺🇸 English'}</td>
          </tr>
        </table>
      </div>

      <!-- Company Details -->
      <div style="margin-bottom: 32px; padding: 24px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #d97706;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
          🏢 Company Information
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #92400e; width: 140px;">Company:</td>
            <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #92400e;">Role:</td>
            <td style="padding: 8px 0; color: #1f2937;">${role}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #92400e;">Team Size:</td>
            <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${teamSize}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #92400e;">Monthly Spend:</td>
            <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${monthlySpend}</td>
          </tr>
        </table>
      </div>

      <!-- Current Challenges -->
      <div style="margin-bottom: 32px; padding: 24px; background-color: #fef2f2; border-radius: 8px; border-left: 4px solid #dc2626;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
          💡 Current Challenges
        </h2>
        <p style="margin: 0; color: #1f2937; line-height: 1.6; white-space: pre-wrap; font-style: italic;">
"${currentChallenges}"
        </p>
      </div>

      <!-- Quick Actions -->
      <div style="margin-top: 32px; padding: 24px; background-color: #eff6ff; border-radius: 8px; border: 2px solid #2563eb;">
        <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
          ⚡ Quick Actions
        </h2>

        <div style="margin-bottom: 12px;">
          <a href="mailto:${email}?subject=Re:%20L4YERCAK3%20${quarter}%20${year}%20Pilot%20Application"
             style="display: inline-block; margin-right: 8px; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
            📧 Reply to ${firstName}
          </a>

          <a href="https://cal.com/l4yercak3/discovery-call"
             style="display: inline-block; margin-right: 8px; padding: 12px 24px; background-color: #059669; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
            📅 Book Meeting
          </a>
        </div>

        <p style="margin: 16px 0 0 0; font-size: 13px; color: #64748b;">
          <strong>Response Commitment:</strong> Reply within 24 hours for best conversion rates
        </p>
      </div>

      <!-- Metadata -->
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #94a3b8;">
          <strong>Source:</strong> Urgency Pill (Homepage)
        </p>
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #94a3b8;">
          <strong>Submitted:</strong> ${new Date().toLocaleString()}
        </p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">
          <strong>Application ID:</strong> ${Date.now().toString(36)}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 24px 32px; background-color: #1f2937; text-align: center;">
      <p style="margin: 0; font-size: 13px; color: #9ca3af;">
        L4YERCAK3 Sales CRM • Automated Lead Notification
      </p>
    </div>
  </div>
</body>
</html>
    `
  };
}
