import { action } from "./_generated/server";
import { v } from "convex/values";

// Mock API endpoint for future consumption
// This simulates sending data to an external API service
export const syncToExternalAPI = action({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    subscriptionType: v.union(
      v.literal("newsletter"), 
      v.literal("private-access"), 
      v.literal("both")
    ),
    wantsNewsletter: v.boolean(),
    wantsPrivateAccess: v.boolean(),
    subscribedAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Mock API call - in the future, this would call your actual API
    const mockApiPayload = {
      user: {
        email: args.email,
        name: args.name,
        subscribedAt: new Date(args.subscribedAt).toISOString(),
      },
      preferences: {
        newsletter: args.wantsNewsletter,
        privateAccess: args.wantsPrivateAccess,
        subscriptionType: args.subscriptionType,
      },
      source: "l4yercak3-landing",
      timestamp: new Date().toISOString(),
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Log the payload (in production, this would be sent to your API)
    console.log("Mock API Call - Newsletter/Signup Data:", JSON.stringify(mockApiPayload, null, 2));

    // Mock different API responses
    const mockResponses = [
      { success: true, message: "User synced to newsletter service" },
      { success: true, message: "User synced to CRM system" },
      { success: true, message: "User added to private access list" },
    ];

    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    return {
      success: response.success,
      message: response.message,
      apiPayload: mockApiPayload,
    };
  },
});