"use server";

import { api } from "../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import type { ActionResult } from "./utils";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function subscribe(
  email: string,
  subscriptionType: "newsletter" | "private-access" | "both",
  name?: string,
  language?: "en" | "de"
): Promise<ActionResult<string>> {
  try {
    const result = await convex.mutation(api.contacts.subscribe, {
      email,
      subscriptionType,
      ...(name && { name }),
      ...(language && { language }),
    });

    // Log to browser console for production debugging
    if (typeof window !== 'undefined') {
      console.log('[Newsletter Subscribe]', {
        email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Mask email for privacy
        subscriptionType,
        language,
        crmSyncScheduled: result.crmSyncScheduled,
        emailsScheduled: result.emailsScheduled,
        timestamp: new Date().toISOString(),
      });

      // Add a success indicator in console
      console.log('%c✓ Newsletter subscription successful', 'color: #10b981; font-weight: bold');
    }

    return {
      success: true,
      data: result.message,
      id: Date.now().toString(),
    };
  } catch (error) {
    console.error("Subscription error:", error);

    // Log error to browser console for debugging
    if (typeof window !== 'undefined') {
      console.error('%c✗ Newsletter subscription failed', 'color: #ef4444; font-weight: bold', error);
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
      id: Date.now().toString(),
    };
  }
}