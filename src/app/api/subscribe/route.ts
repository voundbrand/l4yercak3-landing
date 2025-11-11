import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, subscriptionType, name, language } = body;

    console.log("[Subscribe API] Request received:", { email, subscriptionType, name, language });
    console.log("[Subscribe API] Convex URL:", process.env.NEXT_PUBLIC_CONVEX_URL);

    // Create Convex client inside the request handler to ensure fresh env vars
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
      console.error("[Subscribe API] ERROR: NEXT_PUBLIC_CONVEX_URL is not set!");
      throw new Error("Convex URL not configured");
    }

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    console.log("[Subscribe API] Convex client created successfully");
    console.log("[Subscribe API] API path:", "api.contacts.subscribe");

    const result = await convex.mutation(api.contacts.subscribe, {
      email,
      subscriptionType,
      ...(name && { name }),
      ...(language && { language }),
    });

    console.log("[Subscribe API] Raw Convex result type:", typeof result);
    console.log("[Subscribe API] Raw Convex result:", result);
    console.log("[Subscribe API] Convex result JSON:", JSON.stringify(result, null, 2));

    // API routes serialize properly - return the full result
    const response = {
      success: true as const,
      message: result?.message || "Subscription successful",
      crmSyncScheduled: result?.crmSyncScheduled ?? false,
      emailsScheduled: result?.emailsScheduled ?? false,
      id: Date.now().toString(),
    };

    console.log("[Subscribe API] Returning response:", JSON.stringify(response, null, 2));

    return NextResponse.json(response);
  } catch (error) {
    console.error("[Subscribe API] Error caught:", error);
    console.error("[Subscribe API] Error type:", typeof error);
    console.error("[Subscribe API] Error message:", error instanceof Error ? error.message : String(error));
    console.error("[Subscribe API] Error stack:", error instanceof Error ? error.stack : "No stack trace");

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
        id: Date.now().toString(),
      },
      { status: 500 }
    );
  }
}
