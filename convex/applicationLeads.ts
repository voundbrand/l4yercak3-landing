import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Mutation to store pilot application lead data
 * For the "Apply Now" orange pill urgency CTA
 */
export const storeApplication = mutation({
  args: {
    // Personal Information
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),

    // Company Information
    company: v.string(),
    role: v.string(),

    // Business Information
    teamSize: v.string(),
    monthlySpend: v.string(),
    currentChallenges: v.string(),

    // System Fields
    language: v.union(v.literal("en"), v.literal("de")),
  },
  handler: async (ctx, args) => {
    try {
      // Validate required fields
      if (!args.email || !args.firstName || !args.lastName || !args.company) {
        throw new Error("Missing required fields");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(args.email)) {
        throw new Error("Invalid email format");
      }

      // Check for existing application with same email in last 7 days to prevent spam
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const existingApplication = await ctx.db
        .query("applicationLeads")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .filter((q) => q.gt(q.field("submittedAt"), sevenDaysAgo))
        .first();

      if (existingApplication) {
        throw new Error("An application with this email was already submitted in the last 7 days");
      }

      // Store the application data
      const applicationId = await ctx.db.insert("applicationLeads", {
        ...args,

        // Tracking fields
        followUpSent: false,
        status: "new",

        // System fields
        submittedAt: Date.now(),
        source: "urgency-pill-apply-now",
      });

      return {
        success: true,
        applicationId,
        message: "Application submitted successfully",
      };
    } catch (error) {
      console.error("Error storing application data:", error);

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        applicationId: null,
      };
    }
  },
});

/**
 * Mutation to update application status
 */
export const updateApplicationStatus = mutation({
  args: {
    applicationId: v.id("applicationLeads"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("accepted"),
      v.literal("rejected")
    ),
    followUpSent: v.optional(v.boolean()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const updateData: any = {
        status: args.status,
      };

      if (args.followUpSent !== undefined) {
        updateData.followUpSent = args.followUpSent;
        if (args.followUpSent) {
          updateData.followUpSentAt = Date.now();
        }
      }

      if (args.notes !== undefined) {
        updateData.notes = args.notes;
      }

      await ctx.db.patch(args.applicationId, updateData);

      return {
        success: true,
        message: "Application status updated successfully",
      };
    } catch (error) {
      console.error("Error updating application status:", error);

      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update application status",
      };
    }
  },
});

/**
 * Query to get recent applications for sales dashboard
 */
export const getRecentApplications = query({
  args: {
    limit: v.optional(v.number()),
    statusFilter: v.optional(v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("accepted"),
      v.literal("rejected")
    )),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    let query = ctx.db
      .query("applicationLeads")
      .withIndex("by_submission_date")
      .order("desc");

    if (args.statusFilter) {
      query = query.filter((q) => q.eq(q.field("status"), args.statusFilter));
    }

    return await query.take(limit);
  },
});

/**
 * Query to get application by ID
 */
export const getApplicationById = query({
  args: { applicationId: v.id("applicationLeads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.applicationId);
  },
});
