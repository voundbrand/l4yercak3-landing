const { ConvexHttpClient } = require("convex/browser");

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function test() {
  try {
    console.log("Testing CRM sync action directly...");

    const result = await convex.action("contacts:syncToCRM", {
      email: "test-crm-" + Date.now() + "@example.com",
      name: "Test CRM User",
      subscriptionType: "both",
    });

    console.log("\n✅ CRM sync action result:");
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error("\n❌ Error:", error);
  }

  process.exit(0);
}

test();
