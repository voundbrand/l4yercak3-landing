import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

// Initialize Resend with API key from environment variables
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not found in environment variables. Email functionality will be disabled.");
    return null;
  }
  return new Resend(apiKey);
};

// Email content templates
const getWelcomeEmailContent = (language: string) => {
  if (language === 'de') {
    return {
      subject: "Willkommen! 🍰",
      greeting: "Willkommen!",
      thanks: "Danke fürs Anmelden. Du bist jetzt auf der l4yercak3-Newsletter-Liste.",
      whatToExpect: "Was du erwarten kannst:",
      expectText: "Wir teilen Updates darüber, was wir bauen, Lektionen aus der Zusammenarbeit mit Unternehmen zur Entwirrung ihrer Workflows und Einblicke, wie KI tatsächlich nützlich wird (nicht nur Hype).",
      whileYoureHere: "Während du hier bist:",
      calculatorText: "Neugierig, was deine Backoffice-Arbeit tatsächlich kostet? Schau dir unseren <a href=\"https://www.l4yercak3.com/go-to-market\" style=\"color: #0066cc; text-decoration: underline;\">Go to Market Rechner</a> an – er zeigt dir, wie viel Zeit (und Geld) dein Team für administrative Arbeit aufwendet und was sie stattdessen tun könnten.",
      capacity: "Im Moment sind wir ausgelastet und arbeiten direkt mit unseren aktuellen Kunden. Wir nehmen vor Ende Q1 2026 noch drei weitere Unternehmen auf, danach öffnen wir uns breiter.",
      hearFromUs: "Du hörst von uns, wenn wir etwas Neues liefern, etwas Teilenswertes lernen oder neue Plätze öffnen.",
      noSpam: "Kein Spam. Keine ständigen Promotions. Nur nützliche Updates, wenn wir welche haben.",
      thanksInterest: "Danke für dein Interesse!",
      signature: "Remington Splettstoesser<br>Founder @l4yercak3"
    };
  }

  // English (default)
  return {
    subject: "Welcome! 🍰",
    greeting: "Welcome!",
    thanks: "Thanks for signing up. You're now on the l4yercak3 newsletter.",
    whatToExpect: "What to expect:",
    expectText: "We'll share updates on what we're building, lessons from working with businesses to untangle their workflows, and insights on making AI actually useful (not just hype).",
    whileYoureHere: "While you're here:",
    calculatorText: "Curious what your back-office work is actually costing you? Check out our <a href=\"https://www.l4yercak3.com/go-to-market\" style=\"color: #0066cc; text-decoration: underline;\">Go to Market calculator</a> – it shows you how much time (and money) your team spends on admin work, and what they could be doing instead.",
    capacity: "Right now we're at capacity, working hands-on with our current customers. We're taking on three more businesses before Q1 2026 ends, then opening up more broadly after that.",
    hearFromUs: "You'll hear from us when we ship something new, learn something worth sharing, or open up new spots.",
    noSpam: "No spam. No constant promotions. Just useful updates when we have them.",
    thanksInterest: "Thanks for your interest!",
    signature: "Remington Splettstoesser<br>Founder @l4yercak3"
  };
};

export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    subscriptionType: v.optional(v.union(
      v.literal("newsletter"),
      v.literal("private-access"),
      v.literal("both")
    )),
    language: v.optional(v.union(v.literal("en"), v.literal("de"))),
  },
  handler: async (ctx, args) => {
    const resend = getResendClient();

    if (!resend) {
      console.log("Resend not configured, skipping welcome email");
      return { success: false, error: "Email service not configured" };
    }

    const fromEmail = process.env.SALES_EMAIL || "onboarding@resend.dev";
    const language = args.language || "en";
    const content = getWelcomeEmailContent(language);

    // Note: Domain mail.l4yercak3.com is verified, so we can send to any email address
    // No sandbox restrictions apply with a verified domain

    try {
      const { data, error} = await resend.emails.send({
        from: `l4yercak3 <${fromEmail}>`,
        to: [args.email],
        subject: content.subject,
        html: `
          <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="font-family: 'Instrument Serif', serif; font-style: italic; font-size: 48px; margin: 0; color: #1a1a1a;">l4yercak3</h1>
            </div>

            <h2 style="font-size: 24px; margin-bottom: 16px;">${content.greeting}</h2>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              ${content.thanks}
            </p>

            <h3 style="font-size: 18px; margin-bottom: 12px; font-weight: 600;">${content.whatToExpect}</h3>
            <p style="font-size: 15px; line-height: 1.6; color: #495057; margin-bottom: 24px;">
              ${content.expectText}
            </p>

            <h3 style="font-size: 18px; margin-bottom: 12px; font-weight: 600;">${content.whileYoureHere}</h3>
            <p style="font-size: 15px; line-height: 1.6; color: #495057; margin-bottom: 16px;">
              ${content.calculatorText}
            </p>

            <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <p style="font-size: 15px; line-height: 1.6; color: #495057; margin: 0;">
                ${content.capacity}
              </p>
            </div>

            <p style="font-size: 15px; line-height: 1.6; color: #495057; margin-bottom: 16px;">
              ${content.hearFromUs}
            </p>

            <p style="font-size: 15px; line-height: 1.6; color: #6c757d; font-style: italic; margin-bottom: 32px;">
              ${content.noSpam}
            </p>

            <div style="border-top: 1px solid #e9ecef; padding-top: 24px; margin-top: 32px;">
              <p style="font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
                ${content.thanksInterest}
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0;">
                ${content.signature}
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        throw new Error(`Failed to send welcome email: ${error.message}`);
      }

      return { success: true, messageId: data?.id };
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email");
    }
  },
});

export const sendNotificationEmail = action({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    subscriptionType: v.optional(v.union(
      v.literal("newsletter"),
      v.literal("private-access"),
      v.literal("both")
    )),
    language: v.optional(v.union(v.literal("en"), v.literal("de"))),
  },
  handler: async (ctx, args) => {
    const resend = getResendClient();

    if (!resend) {
      console.log("Resend not configured, skipping notification email");
      return { success: false, error: "Email service not configured" };
    }

    const fromEmail = process.env.SALES_EMAIL || "onboarding@resend.dev";
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "itsmetherealremington@gmail.com";
    const language = args.language || "en";
    const languageFlag = language === "de" ? "🇩🇪" : "🇺🇸";

    try {
      const { data, error } = await resend.emails.send({
        from: `l4yercak3 Notifications <${fromEmail}>`,
        to: [notificationEmail],
        subject: "🎉 New Newsletter Signup - l4yercak3",
        html: `
          <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="font-family: 'Instrument Serif', serif; font-style: italic; font-size: 36px; margin: 0; color: #1a1a1a;">l4yercak3</h1>
              <p style="color: #6c757d; margin: 8px 0 0 0;">New Newsletter Signup</p>
            </div>

            <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #1a1a1a; margin-top: 0; font-size: 20px;">New Subscriber Details</h2>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${args.email}</p>
              ${args.name ? `<p style="margin: 8px 0;"><strong>Name:</strong> ${args.name}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Language:</strong> ${languageFlag} ${language.toUpperCase()}</p>
              <p style="margin: 8px 0;"><strong>Signed up:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 8px 0;"><strong>Source:</strong> Landing Page</p>
            </div>

            <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border-radius: 12px; padding: 20px; text-align: center;">
              <p style="margin: 0; font-weight: 500;">
                🚀 Another person is excited about l4yercak3!
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        throw new Error(`Failed to send notification email: ${error.message}`);
      }

      return { success: true, messageId: data?.id };
    } catch (error) {
      console.error("Error sending notification email:", error);
      // Don't throw here - notification failure shouldn't break user experience
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  },
});