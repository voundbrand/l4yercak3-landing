"use server";

import { api } from "../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import type { ActionResult } from "./utils";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Custom return type for subscribe action (flattened for server action serialization)
export type SubscribeResult =
  | { success: true; message: string; crmSyncScheduled: boolean; emailsScheduled: boolean; id: string }
  | { success: false; message: string; id: string };

export async function subscribe(
  email: string,
  subscriptionType: "newsletter" | "private-access" | "both",
  name?: string,
  language?: "en" | "de"
): Promise<SubscribeResult> {
  try {
    const result = await convex.mutation(api.contacts.subscribe, {
      email,
      subscriptionType,
      ...(name && { name }),
      ...(language && { language }),
    });

    // Server-side logging to verify what we got from Convex
    console.log("[Subscribe Server Action] Convex result:", JSON.stringify(result));

    // Note: Browser console logging is handled in the client component (form-newsletter.tsx)
    // Explicit serialization for Next.js server action

    const response = {
      success: true as const,
      message: String(result.message),
      crmSyncScheduled: Boolean(result.crmSyncScheduled),
      emailsScheduled: Boolean(result.emailsScheduled),
      id: String(Date.now()),
    };

    console.log("[Subscribe Server Action] Returning:", JSON.stringify(response));

    return response;
  } catch (error) {
    // Server-side error logging (shows in server console, not browser)
    console.error("Subscription error:", error);

    // Note: Browser console error logging is handled in the client component (form-newsletter.tsx)

    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
      id: Date.now().toString(),
    };
  }
}