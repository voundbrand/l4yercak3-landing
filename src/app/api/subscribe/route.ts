import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, subscriptionType, name, language } = body;

    // Create Convex client inside the request handler to ensure fresh env vars
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
      throw new Error("Convex URL not configured");
    }

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    const result = await convex.mutation(api.contacts.subscribe, {
      email,
      subscriptionType,
      ...(name && { name }),
      ...(language && { language }),
    });

    return NextResponse.json({
      success: true,
      message: result.message,
      crmSyncScheduled: result.crmSyncScheduled,
      emailsScheduled: result.emailsScheduled,
      id: Date.now().toString(),
    });
  } catch (error) {
    console.error("[Subscribe API] Error:", error);

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
