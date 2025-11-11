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

    // Note: Browser console logging is handled in the client component (form-newsletter.tsx)
    // This server action runs on the server where window/console.log aren't visible to users

    return {
      success: true,
      data: result.message,
      id: Date.now().toString(),
    };
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