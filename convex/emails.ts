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

export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    subscriptionType: v.optional(v.union(
      v.literal("newsletter"), 
      v.literal("private-access"), 
      v.literal("both")
    )),
  },
  handler: async (ctx, args) => {
    const resend = getResendClient();
    
    if (!resend) {
      console.log("Resend not configured, skipping welcome email");
      return { success: false, error: "Email service not configured" };
    }

    try {
      const { data, error } = await resend.emails.send({
        from: "l4yercak3 <onboarding@resend.dev>", // Using Resend's sandbox domain for testing
        to: [args.email],
        subject: "Welcome to l4yercak3 - Early Access Confirmed! 🚀",
        html: `
          <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="font-family: 'Instrument Serif', serif; font-style: italic; font-size: 48px; margin: 0; color: #1a1a1a;">l4yercak3</h1>
            </div>
            
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
              <h2 style="color: #1a1a1a; margin-top: 0;">Welcome to the future! ✨</h2>
              <p style="color: #495057; font-size: 16px; line-height: 1.6;">
                ${args.name ? `Hi ${args.name},` : 'Hello!'}<br><br>
                Thank you for joining l4yercak3's early access program! You're now part of an exclusive group that will be the first to experience our groundbreaking web solutions.
              </p>
            </div>

            <div style="margin-bottom: 32px;">
              <h3 style="color: #1a1a1a;">What's next?</h3>
              <ul style="color: #495057; line-height: 1.8;">
                <li>🎯 <strong>Early Access:</strong> You'll be notified as soon as we launch</li>
                <li>📧 <strong>Exclusive Updates:</strong> Get behind-the-scenes insights and development progress</li>
                <li>🎁 <strong>Special Perks:</strong> Early access pricing and exclusive features</li>
                <li>💬 <strong>Direct Line:</strong> Your feedback will shape our product</li>
              </ul>
            </div>

            <div style="background: #1a1a1a; color: white; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
              <p style="margin: 0; font-style: italic;">
                "We stand at the forefront of a new era, where creativity meets technology to redefine what's possible."
              </p>
            </div>

            <div style="text-align: center; color: #6c757d; font-size: 14px;">
              <p>Stay tuned for exciting updates!</p>
              <p style="margin-top: 24px;">
                Best regards,<br>
                <strong>The l4yercak3 Team</strong>
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
  },
  handler: async (ctx, args) => {
    const resend = getResendClient();
    
    if (!resend) {
      console.log("Resend not configured, skipping notification email");
      return { success: false, error: "Email service not configured" };
    }

    try {
      const { data, error } = await resend.emails.send({
        from: "l4yercak3 Notifications <onboarding@resend.dev>", // Using Resend's sandbox domain for testing
        to: ["notifications@example.com"], // Replace with your notification email
        subject: "🎉 New Early Access Signup - l4yercak3",
        html: `
          <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="font-family: 'Instrument Serif', serif; font-style: italic; font-size: 36px; margin: 0; color: #1a1a1a;">l4yercak3</h1>
              <p style="color: #6c757d; margin: 8px 0 0 0;">New Early Access Signup</p>
            </div>
            
            <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #1a1a1a; margin-top: 0; font-size: 20px;">New Subscriber Details</h2>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${args.email}</p>
              ${args.name ? `<p style="margin: 8px 0;"><strong>Name:</strong> ${args.name}</p>` : ''}
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