const { ConvexHttpClient } = require("convex/browser");

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function test() {
  try {
    console.log("Testing Convex mutation...");

    const result = await convex.mutation("contacts:subscribe", {
      email: "test-" + Date.now() + "@example.com",
      subscriptionType: "both",
      name: "Test User",
      language: "en",
    });

    console.log("\n✅ Convex mutation result:");
    console.log(JSON.stringify(result, null, 2));

    console.log("\n📊 Result structure:");
    console.log("- message:", result?.message);
    console.log("- crmSyncScheduled:", result?.crmSyncScheduled);
    console.log("- emailsScheduled:", result?.emailsScheduled);

  } catch (error) {
    console.error("\n❌ Error:", error);
  }

  process.exit(0);
}

test();
