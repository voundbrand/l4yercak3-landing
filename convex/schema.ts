import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  emailList: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    subscribedAt: v.number(),
    status: v.union(v.literal("active"), v.literal("unsubscribed")),
    source: v.string(),
    subscriptionType: v.union(
      v.literal("newsletter"), 
      v.literal("private-access"), 
      v.literal("both")
    ),
    // Track individual preferences for future API consumption
    wantsNewsletter: v.boolean(),
    wantsPrivateAccess: v.boolean(),
  }),

  valueCalculatorLeads: defineTable({
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
    
    // Email Tracking
    customerEmailSent: v.boolean(),
    customerEmailSentAt: v.optional(v.number()),
    salesEmailSent: v.boolean(),
    salesEmailSentAt: v.optional(v.number()),
    pdfGenerated: v.boolean(),
    pdfGeneratedAt: v.optional(v.number()),
    
    // System Fields
    language: v.union(v.literal("en"), v.literal("de")),
    submittedAt: v.number(),
    source: v.string(), // "value-calculator"
  })
    .index("by_email", ["email"])
    .index("by_submission_date", ["submittedAt"])
    .index("by_lead_quality", ["leadQualityScore"])
    .index("by_organization", ["organizationName"])
    .index("by_email_tracking", ["customerEmailSent", "salesEmailSent"]),
});