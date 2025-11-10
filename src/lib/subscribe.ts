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

    return {
      success: true,
      data: result,
      id: Date.now().toString(),
    };
  } catch (error) {
    console.error("Subscription error:", error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
      id: Date.now().toString(),
    };
  }
}