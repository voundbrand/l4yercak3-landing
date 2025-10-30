import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Mutation to store value calculator lead data and calculated results
 * Requirements: 6.3, 5.5
 */
export const storeLead = mutation({
  args: {
    // Contact Information
    fullName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organizationName: v.string(),
    jobTitle: v.string(),
    signatureAuthority: v.optional(v.number()),
    timeline: v.string(),
    
    // Organization Metrics
    organizationSize: v.number(),
    adminStaffCount: v.number(),
    manualHoursPerWeek: v.number(),
    loadedLaborCost: v.number(),
    annualEvents: v.number(),
    avgMemberValue: v.number(),
    currentRevenue: v.optional(v.number()),
    industryType: v.string(),
    
    // Calculated Values
    totalAnnualHours: v.number(),
    annualWaste: v.number(),
    potentialFreedHours: v.number(),
    laborCostAvoided: v.number(),
    newRevenuePotential: v.number(),
    totalValueCreated: v.number(),
    
    // Pricing Intelligence
    conservativePricing: v.object({
      percentage: v.number(),
      annualPrice: v.number(),
      customerKeeps: v.number(),
      roi: v.number(),
    }),
    targetPricing: v.object({
      percentage: v.number(),
      annualPrice: v.number(),
      customerKeeps: v.number(),
      roi: v.number(),
    }),
    aggressivePricing: v.object({
      percentage: v.number(),
      annualPrice: v.number(),
      customerKeeps: v.number(),
      roi: v.number(),
    }),
    premiumPricing: v.object({
      percentage: v.number(),
      annualPrice: v.number(),
      customerKeeps: v.number(),
      roi: v.number(),
    }),
    
    // Sales Intelligence
    recommendedPhase: v.string(),
    leadQualityScore: v.union(v.literal("HIGH"), v.literal("MEDIUM"), v.literal("LOW")),
    
    // System Fields
    language: v.union(v.literal("en"), v.literal("de")),
  },
  handler: async (ctx, args) => {
    try {
      // Validate required fields
      if (!args.email || !args.fullName || !args.organizationName) {
        throw new Error("Missing required fields: email, fullName, or organizationName");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(args.email)) {
        throw new Error("Invalid email format");
      }

      // Validate numeric fields are positive
      const numericFields: (keyof typeof args)[] = [
        'organizationSize', 'adminStaffCount', 'manualHoursPerWeek', 
        'loadedLaborCost', 'annualEvents', 'avgMemberValue',
        'totalAnnualHours', 'annualWaste', 'potentialFreedHours',
        'laborCostAvoided', 'newRevenuePotential', 'totalValueCreated'
      ];
      
      for (const field of numericFields) {
        const value = args[field];
        if (typeof value === 'number' && value < 0) {
          throw new Error(`${field} must be a positive number`);
        }
      }

      // Check for existing lead with same email in last 24 hours to prevent spam
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      const existingLead = await ctx.db
        .query("valueCalculatorLeads")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .filter((q) => q.gt(q.field("submittedAt"), oneDayAgo))
        .first();

      if (existingLead) {
        throw new Error("A lead with this email was already submitted in the last 24 hours");
      }

      // Store the lead data
      const leadId = await ctx.db.insert("valueCalculatorLeads", {
        ...args,
        // Email tracking fields - initially false
        customerEmailSent: false,
        salesEmailSent: false,
        pdfGenerated: false,
        
        // System fields
        submittedAt: Date.now(),
        source: "value-calculator",
      });

      return {
        success: true,
        leadId,
        message: "Lead data stored successfully",
      };
    } catch (error) {
      console.error("Error storing lead data:", error);
      
      // Return structured error response
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        leadId: null,
      };
    }
  },
});

/**
 * Mutation to update email tracking status for a lead
 * Requirements: 6.3, 5.5
 */
export const updateEmailTracking = mutation({
  args: {
    leadId: v.id("valueCalculatorLeads"),
    customerEmailSent: v.optional(v.boolean()),
    salesEmailSent: v.optional(v.boolean()),
    pdfGenerated: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    try {
      const updateData: any = {};
      const now = Date.now();

      if (args.customerEmailSent !== undefined) {
        updateData.customerEmailSent = args.customerEmailSent;
        if (args.customerEmailSent) {
          updateData.customerEmailSentAt = now;
        }
      }

      if (args.salesEmailSent !== undefined) {
        updateData.salesEmailSent = args.salesEmailSent;
        if (args.salesEmailSent) {
          updateData.salesEmailSentAt = now;
        }
      }

      if (args.pdfGenerated !== undefined) {
        updateData.pdfGenerated = args.pdfGenerated;
        if (args.pdfGenerated) {
          updateData.pdfGeneratedAt = now;
        }
      }

      await ctx.db.patch(args.leadId, updateData);

      return {
        success: true,
        message: "Email tracking updated successfully",
      };
    } catch (error) {
      console.error("Error updating email tracking:", error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update email tracking",
      };
    }
  },
});

/**
 * Query to get lead by ID for debugging and verification
 */
export const getLeadById = query({
  args: { leadId: v.id("valueCalculatorLeads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.leadId);
  },
});

/**
 * Query to get recent leads for sales dashboard (optional)
 */
export const getRecentLeads = query({
  args: { 
    limit: v.optional(v.number()),
    qualityFilter: v.optional(v.union(v.literal("HIGH"), v.literal("MEDIUM"), v.literal("LOW"))),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    
    let query = ctx.db
      .query("valueCalculatorLeads")
      .withIndex("by_submission_date")
      .order("desc");

    if (args.qualityFilter) {
      query = query.filter((q) => q.eq(q.field("leadQualityScore"), args.qualityFilter));
    }

    return await query.take(limit);
  },
});

/**
 * Query to get leads by email for duplicate checking
 */
export const getLeadsByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("valueCalculatorLeads")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
  },
});