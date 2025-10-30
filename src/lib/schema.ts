import { z } from "zod";

export const subscriptionTypeSchema = z.enum(["newsletter", "private-access", "both"]);

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
  subscriptionType: subscriptionTypeSchema,
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
export type SubscriptionType = z.infer<typeof subscriptionTypeSchema>;