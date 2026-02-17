import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Compute agency stage from form dropdown values.
 * Uses highest tier across all three dimensions.
 */
function computeAgencyStage(
  clientCount: string,
  monthlyRevenue: string,
  teamSize: string
): "aspiring" | "starter" | "growing" | "scaling" | "established" {
  const tierMap: Record<string, number> = {
    aspiring: 0,
    starter: 1,
    growing: 2,
    scaling: 3,
    established: 4,
  };

  // Client count tiers
  const clientTier = (() => {
    if (clientCount === "0") return "aspiring";
    if (clientCount === "1-3") return "starter";
    if (clientCount === "4-10") return "growing";
    if (clientCount === "11-25") return "scaling";
    return "established"; // 25+
  })();

  // Monthly revenue tiers
  const revenueTier = (() => {
    if (monthlyRevenue === "pre-revenue") return "aspiring";
    if (monthlyRevenue === "under-5k") return "starter";
    if (monthlyRevenue === "5k-10k") return "growing";
    if (monthlyRevenue === "10k-25k") return "scaling";
    return "established"; // 25k+
  })();

  // Team size tiers
  const teamTier = (() => {
    if (teamSize === "solo") return "aspiring";
    if (teamSize === "2-3") return "starter";
    if (teamSize === "4-7") return "growing";
    if (teamSize === "8-15") return "scaling";
    return "established"; // 15+
  })();

  // Return highest tier
  const tiers = [clientTier, revenueTier, teamTier];
  let highest = "aspiring" as keyof typeof tierMap;
  for (const tier of tiers) {
    if (tierMap[tier] > tierMap[highest]) {
      highest = tier;
    }
  }

  return highest as "aspiring" | "starter" | "growing" | "scaling" | "established";
}

/**
 * Store a lead magnet lead
 */
export const storeLead = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    countryCode: v.string(),
    phone: v.string(),
    street: v.string(),
    city: v.string(),
    stateRegion: v.string(),
    countryRegion: v.string(),
    zip: v.string(),
    clientCount: v.string(),
    monthlyRevenue: v.string(),
    teamSize: v.string(),
    language: v.union(v.literal("en"), v.literal("de")),
  },
  handler: async (ctx, args) => {
    try {
      const getErrorMessage = (key: string): string => {
        const messages: Record<string, { en: string; de: string }> = {
          missingFields: {
            en: "Missing required fields",
            de: "Erforderliche Felder fehlen",
          },
          invalidEmail: {
            en: "Invalid email format",
            de: "Ungültiges E-Mail-Format",
          },
          duplicateLead: {
            en: "You already requested the Blueprint in the last 24 hours",
            de: "Du hast den Blueprint bereits in den letzten 24 Stunden angefordert",
          },
        };
        return messages[key][args.language];
      };

      // Validate required fields
      if (!args.email || !args.firstName || !args.lastName) {
        throw new Error(getErrorMessage("missingFields"));
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(args.email)) {
        throw new Error(getErrorMessage("invalidEmail"));
      }

      // Deduplicate: same email within 24h
      const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
      const existingLead = await ctx.db
        .query("leadMagnetLeads")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .filter((q) => q.gt(q.field("submittedAt"), twentyFourHoursAgo))
        .first();

      if (existingLead) {
        throw new Error(getErrorMessage("duplicateLead"));
      }

      // Compute agency stage
      const agencyStage = computeAgencyStage(
        args.clientCount,
        args.monthlyRevenue,
        args.teamSize
      );

      // Insert lead
      const leadId = await ctx.db.insert("leadMagnetLeads", {
        ...args,
        agencyStage,
        confirmationEmailSent: false,
        salesNotificationSent: false,
        submittedAt: Date.now(),
        source: "blueprint-lead-magnet",
      });

      return {
        success: true,
        leadId,
        agencyStage,
        message:
          args.language === "de"
            ? "Blueprint wird zugestellt"
            : "Blueprint is on its way",
      };
    } catch (error) {
      console.error("Error storing lead magnet lead:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        leadId: null,
        agencyStage: null,
      };
    }
  },
});

/**
 * Update email tracking flags
 */
export const updateEmailTracking = mutation({
  args: {
    leadId: v.id("leadMagnetLeads"),
    confirmationEmailSent: v.optional(v.boolean()),
    salesNotificationSent: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const updateData: Record<string, unknown> = {};

    if (args.confirmationEmailSent !== undefined) {
      updateData.confirmationEmailSent = args.confirmationEmailSent;
      if (args.confirmationEmailSent) {
        updateData.confirmationEmailSentAt = Date.now();
      }
    }

    if (args.salesNotificationSent !== undefined) {
      updateData.salesNotificationSent = args.salesNotificationSent;
      if (args.salesNotificationSent) {
        updateData.salesNotificationSentAt = Date.now();
      }
    }

    await ctx.db.patch(args.leadId, updateData);
    return { success: true };
  },
});

/**
 * Get recent leads for internal use
 */
export const getRecentLeads = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    return await ctx.db
      .query("leadMagnetLeads")
      .withIndex("by_submission_date")
      .order("desc")
      .take(limit);
  },
});
