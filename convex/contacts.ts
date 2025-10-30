import { mutation, query } from "./_generated/server";
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
          ...(name && { name }),
        });
      } else {
        // Update existing subscription preferences
        await ctx.db.patch(existing._id, {
          subscriptionType,
          wantsNewsletter,
          wantsPrivateAccess,
          ...(name && { name }),
        });
      }

      // Send appropriate emails based on subscription type
      try {
        await ctx.scheduler.runAfter(0, api.emails.sendWelcomeEmail, {
          email,
          name,
          subscriptionType,
        });
        await ctx.scheduler.runAfter(0, api.emails.sendNotificationEmail, {
          email,
          name,
          subscriptionType,
        });
      } catch (error) {
        console.error("Failed to send emails:", error);
      }

      return getSuccessMessage(subscriptionType, true);
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
      ...(name && { name }),
    });

    // Sync to external API (mock for now)
    try {
      await ctx.scheduler.runAfter(0, api.api.syncToExternalAPI, {
        email,
        name,
        subscriptionType,
        wantsNewsletter,
        wantsPrivateAccess,
        subscribedAt,
      });
    } catch (error) {
      console.error("Failed to sync to external API:", error);
    }

    // Send welcome and notification emails
    try {
      await ctx.scheduler.runAfter(0, api.emails.sendWelcomeEmail, {
        email,
        name,
        subscriptionType,
      });
      await ctx.scheduler.runAfter(0, api.emails.sendNotificationEmail, {
        email,
        name,
        subscriptionType,
      });
    } catch (error) {
      console.error("Failed to send emails:", error);
    }

    return getSuccessMessage(subscriptionType, false);
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