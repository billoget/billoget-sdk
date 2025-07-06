const { BillogetSDK } = require("billoget-sdk");

// Initialize SDK
const billoget = new BillogetSDK({
  apiKey: "bk_test_your_api_key_here",
  baseUrl: "https://api.billoget.com",
  debug: true,
});

async function main() {
  try {
    console.log("🚀 Billoget SDK Example");
    console.log("SDK Version:", BillogetSDK.getVersion());

    // Create a customer
    console.log("\n📋 Creating customer...");
    const customer = await billoget.customers.create({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1-555-123-4567",
      address: "123 Main Street",
      city: "New York",
      country: "USA",
    });
    console.log("✅ Customer created:", customer.data);

    // Create a product
    console.log("\n📦 Creating product...");
    const product = await billoget.products.create({
      name: "Premium Marketing Package",
      description: "Comprehensive marketing solution",
      price: 2500.0,
      sku: "MKT-PREM-001",
      category: "services",
      isActive: true,
    });
    console.log("✅ Product created:", product.data);

    // Create a budget
    console.log("\n💰 Creating budget...");
    const budget = await billoget.budgets.create({
      customerId: customer.data.id,
      items: [
        {
          productId: product.data.id,
          description: "Premium Marketing Package",
          quantity: 1,
          unitPrice: 2500.0,
        },
      ],
      notes: "Q1 2024 Marketing Budget",
      validUntil: "2024-03-31T23:59:59Z",
    });
    console.log("✅ Budget created:", budget.data);

    // List budgets
    console.log("\n📊 Listing budgets...");
    const budgets = await billoget.budgets.list({
      page: 1,
      limit: 5,
      status: "PENDING",
    });
    console.log("✅ Budgets found:", budgets.data.length);
    console.log("Pagination:", budgets.pagination);

    // Test webhook
    console.log("\n🔗 Testing webhook...");
    const webhookTest = await billoget.webhooks.test({
      event: "budget.created",
      data: {
        id: budget.data.id,
        customerId: customer.data.id,
        total: 2500.0,
        status: "PENDING",
      },
    });
    console.log("✅ Webhook test:", webhookTest.data);
  } catch (error) {
    console.error("❌ Error:", {
      message: error.message,
      statusCode: error.statusCode,
      error: error.error,
    });
  }
}

// Run the example
main().catch(console.error);
