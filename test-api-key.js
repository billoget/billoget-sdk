const { BillogetSDK } = require("./dist/index.js");

// Usar la API key que creaste
const API_KEY = "bk_live_4wigbuxps_OAIn2HaJYV2YzXNkx68t2j";

async function testApiKey() {
  console.log("🔍 Testing API Key with Billoget SDK...\n");

  try {
    // Crear instancia del SDK
    const billoget = new BillogetSDK({
      apiKey: API_KEY,
      debug: true,
    });

    console.log("✅ SDK initialized successfully");
    console.log(`📊 SDK Version: ${BillogetSDK.getVersion()}`);
    console.log(`🔑 API Key: ${API_KEY.substring(0, 15)}...`);
    console.log();

    // Test 1: Obtener budgets (requiere READ_BUDGETS scope)
    console.log("🧪 Test 1: Getting budgets...");
    try {
      const budgets = await billoget.budgets.list({
        page: 1,
        limit: 5,
      });
      console.log("✅ Budgets retrieved successfully");
      console.log(`📋 Found ${budgets.data.length} budgets`);
      console.log("📊 Pagination:", budgets.pagination);
    } catch (error) {
      console.error("❌ Error getting budgets:", error.message);
      if (error.response) {
        console.error("📝 Response details:", error.response.data);
      }
    }
    console.log();

    // Test 2: Obtener customers (requiere READ_CUSTOMERS scope)
    console.log("🧪 Test 2: Getting customers...");
    try {
      const customers = await billoget.customers.list({
        page: 1,
        limit: 5,
      });
      console.log("✅ Customers retrieved successfully");
      console.log(`👥 Found ${customers.data.length} customers`);
      console.log("📊 Pagination:", customers.pagination);
    } catch (error) {
      console.error("❌ Error getting customers:", error.message);
      if (error.response) {
        console.error("📝 Response details:", error.response.data);
      }
    }
    console.log();

    // Test 3: Obtener products (requiere READ_PRODUCTS scope)
    console.log("🧪 Test 3: Getting products...");
    try {
      const products = await billoget.products.list({
        page: 1,
        limit: 5,
      });
      console.log("✅ Products retrieved successfully");
      console.log(`🛍️ Found ${products.data.length} products`);
      console.log("📊 Pagination:", products.pagination);
    } catch (error) {
      console.error("❌ Error getting products:", error.message);
      if (error.response) {
        console.error("📝 Response details:", error.response.data);
      }
    }
    console.log();

    // Test 4: Test webhook (requiere WEBHOOKS scope - debería fallar)
    console.log(
      "🧪 Test 4: Testing webhook (should fail - no WEBHOOKS scope)..."
    );
    try {
      const webhook = await billoget.webhooks.test({
        event: "budget.created",
        data: { id: 123, message: "Test webhook" },
      });
      console.log("⚠️  Webhook test succeeded unexpectedly:", webhook);
    } catch (error) {
      console.log("✅ Webhook test failed as expected (no WEBHOOKS scope)");
      console.log("📝 Error:", error.message);
    }
  } catch (error) {
    console.error("❌ SDK initialization failed:", error.message);
  }
}

// Ejecutar el test
testApiKey()
  .then(() => {
    console.log("\n🎉 API Key test completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 API Key test failed:", error);
    process.exit(1);
  });
