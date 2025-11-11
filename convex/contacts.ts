import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const subscribe = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    subscriptionType: v.union(
      v.literal("newsletter"),
      v.literal("private-access"),
      v.literal("both")
    ),
    language: v.optional(v.union(v.literal("en"), v.literal("de"))),
  },
  handler: async (ctx, args) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Please enter a valid email address");
    }

    const email = args.email.trim().toLowerCase();
    const name = args.name?.trim();
    const { subscriptionType } = args;
    const language = args.language || "en"; // Default to English if not provided

    // Determine preferences based on subscription type
    const wantsNewsletter = subscriptionType === "newsletter" || subscriptionType === "both";
    const wantsPrivateAccess = subscriptionType === "private-access" || subscriptionType === "both";

    // Check if email already exists
    const existing = await ctx.db
      .query("emailList")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (existing) {
      if (existing.status === "unsubscribed") {
        // Reactivate subscription with new preferences
        await ctx.db.patch(existing._id, {
          status: "active",
          subscribedAt: Date.now(),
          subscriptionType,
          wantsNewsletter,
          wantsPrivateAccess,
          language,
          ...(name && { name }),
        });
      } else {
        // Update existing subscription preferences
        await ctx.db.patch(existing._id, {
          subscriptionType,
          wantsNewsletter,
          wantsPrivateAccess,
          language,
          ...(name && { name }),
        });
      }

      // Send appropriate emails based on subscription type
      try {
        await ctx.scheduler.runAfter(0, api.emails.sendWelcomeEmail, {
          email,
          name,
          subscriptionType,
          language,
        });
        await ctx.scheduler.runAfter(0, api.emails.sendNotificationEmail, {
          email,
          name,
          subscriptionType,
          language,
        });
      } catch (error) {
        console.error("Failed to send emails:", error);
      }

      return {
        message: getSuccessMessage(subscriptionType, true),
        crmSyncScheduled: false, // Already exists, no new sync needed
        emailsScheduled: true,
      };
    }

    // Create new subscription
    const subscribedAt = Date.now();
    await ctx.db.insert("emailList", {
      email,
      subscribedAt,
      status: "active",
      source: "landing-page",
      subscriptionType,
      wantsNewsletter,
      wantsPrivateAccess,
      language,
      ...(name && { name }),
    });

    // Sync to CRM via action and schedule emails
    // Note: Using scheduler with delay 0 to run immediately in background
    try {
      console.log(`[Subscribe] Scheduling immediate CRM sync for ${email}`);
      const scheduledId = await ctx.scheduler.runAfter(0, api.contacts.syncToCRM, {
        email,
        name,
        subscriptionType,
      });
      console.log(`[Subscribe] CRM sync scheduled with ID: ${scheduledId} for ${email}`);

      console.log(`[Subscribe] Scheduling welcome emails for ${email}`);
      await ctx.scheduler.runAfter(0, api.emails.sendWelcomeEmail, {
        email,
        name,
        subscriptionType,
        language,
      });
      await ctx.scheduler.runAfter(0, api.emails.sendNotificationEmail, {
        email,
        name,
        subscriptionType,
        language,
      });
      console.log(`[Subscribe] Welcome emails scheduled successfully for ${email}`);
    } catch (error) {
      console.error(`[Subscribe] Failed to schedule CRM sync or emails for ${email}:`, error);
    }

    return {
      message: getSuccessMessage(subscriptionType, false),
      crmSyncScheduled: true,
      emailsScheduled: true,
    };
  },
});

function getSuccessMessage(subscriptionType: string, isExisting: boolean): string {
  const prefix = isExisting ? "Updated! " : "🎉 ";
  
  switch (subscriptionType) {
    case "newsletter":
      return `${prefix}You're subscribed to our newsletter. Stay tuned for updates!`;
    case "private-access":
      return `${prefix}You're on the private access list. We'll notify you when it's ready!`;
    case "both":
      return `${prefix}You're all set! Newsletter + private access. Check your email!`;
    default:
      return `${prefix}Thanks for subscribing!`;
  }
}

export const getSubscriptions = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("emailList")
      .filter((q) => q.eq(q.field("status"), "active"))
      .order("desc")
      .collect();
  },
});

/**
 * Sync newsletter subscription to backend CRM
 * This is an action that makes HTTP calls to external CRM
 */
export const syncToCRM = action({
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
    const CRM_URL = process.env.BACKEND_CRM_URL;
    const CRM_API_KEY = process.env.BACKEND_CRM_API_KEY;

    const logPrefix = `[CRM Sync ${args.email}]`;

    console.log(`${logPrefix} ⚡ Starting CRM sync action... (timestamp: ${Date.now()})`);
    console.log(`${logPrefix} CRM_URL: ${CRM_URL ? 'SET (' + CRM_URL + ')' : '❌ NOT SET'}`);
    console.log(`${logPrefix} CRM_API_KEY: ${CRM_API_KEY ? '✅ SET (length: ' + CRM_API_KEY.length + ')' : '❌ NOT SET'}`);

    // Skip if CRM not configured
    if (!CRM_URL || !CRM_API_KEY) {
      const message = "⚠️ CRM integration not configured - skipping sync";
      console.error(`${logPrefix} ${message}`);
      console.error(`${logPrefix} Missing: ${!CRM_URL ? 'BACKEND_CRM_URL ' : ''}${!CRM_API_KEY ? 'BACKEND_CRM_API_KEY' : ''}`);
      return { success: false, error: "CRM not configured", logged: message };
    }

    console.log(`${logPrefix} ✅ CRM configuration validated, proceeding with API call...`);

    try {
      // Parse name - if no name provided, use email-based fallback
      let firstName: string;
      let lastName: string;

      if (args.name && args.name.trim()) {
        // If name is provided, split it
        const nameParts = args.name.trim().split(' ');
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ') || 'Subscriber';
      } else {
        // If no name, use email username with better formatting
        const emailUsername = args.email.split('@')[0];
        // Capitalize first letter of email username
        firstName = emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
        lastName = 'Newsletter Subscriber';
      }

      const response = await fetch(`${CRM_URL}/api/v1/crm/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CRM_API_KEY}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: args.email,
          source: "newsletter",
          notes: `Subscribed to: ${args.subscriptionType || 'newsletter'}`,
          tags: ['newsletter', args.subscriptionType || 'general'].filter(Boolean),
          subscriptionType: args.subscriptionType,
          subscribedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = `❌ CRM API error: ${result.error}`;
        console.error(`${logPrefix} ${errorMessage}`);
        return { success: false, error: result.error, logged: errorMessage };
      }

      const successMessage = `✅ Contact synced to CRM: ${result.contactId}`;
      console.log(`${logPrefix} ${successMessage}`);
      return {
        success: true,
        contactId: result.contactId,
        logged: successMessage,
        firstName,
        lastName
      };
    } catch (error) {
      const errorMessage = `❌ Failed to sync to CRM: ${error instanceof Error ? error.message : String(error)}`;
      console.error(`${logPrefix} ${errorMessage}`);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        logged: errorMessage
      };
    }
  },
});

// Helper query to get email by address
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("emailList")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});