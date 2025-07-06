const { BillogetSDK } = require("../dist/index.js");

// Initialize SDK
const billoget = new BillogetSDK({
  apiKey: "bk_live_your_api_key_here",
  debug: true,
});

async function demonstrateAdvancedFeatures() {
  console.log("🚀 Billoget SDK v1.1.0 - Advanced Features Demo\n");

  try {
    // Test connection
    console.log("📡 Testing connection...");
    const connectionTest = await billoget.testConnection();
    console.log("✅ Connection:", connectionTest.success ? "OK" : "Failed");
    console.log();

    // Get SDK info
    console.log("ℹ️  SDK Information:");
    const info = billoget.getInfo();
    console.log(`   Version: ${info.version}`);
    console.log(`   Services: ${info.services.join(", ")}`);
    console.log();

    // === CUSTOMER MANAGEMENT WITH NEW FIELDS ===
    console.log("👥 Customer Management with Enhanced Fields");

    // Create customer with new fields
    const newCustomer = await billoget.customers.create({
      firstName: "Ana",
      lastName: "García",
      email: "ana.garcia@example.com",
      phoneNumber: "+54911234567",
      dni: 12345678,
      cuit: "27-12345678-9",
    });
    console.log("✅ Created customer with DNI/CUIT:", newCustomer.id);

    // Search customers
    const customers = await billoget.customers.search("ana");
    console.log(`🔍 Found ${customers.data.length} customers matching "ana"`);
    console.log();

    // === PRODUCT MANAGEMENT WITH VARIANTS ===
    console.log("📦 Product Management with Variants");

    // Create product with variants
    const productWithVariants = await billoget.products.createWithVariants({
      productCode: "TSHIRT-001",
      description: "Premium Cotton T-Shirt",
      category: "Clothing",
      price: 25.0,
      stock: 100,
      type: "product",
      variants: [
        {
          name: "Small - Blue",
          price: 25.0,
          stock: 30,
          sku: "TSHIRT-001-S-BL",
          attributes: { size: "S", color: "Blue" },
        },
        {
          name: "Medium - Red",
          price: 27.0,
          stock: 25,
          sku: "TSHIRT-001-M-RD",
          attributes: { size: "M", color: "Red" },
        },
        {
          name: "Large - Green",
          price: 29.0,
          stock: 20,
          sku: "TSHIRT-001-L-GR",
          attributes: { size: "L", color: "Green" },
        },
      ],
    });
    console.log("✅ Created product with variants:", productWithVariants.id);

    // Get product variants
    const variants = await billoget.products.getVariants(
      productWithVariants.id
    );
    console.log(`📊 Product has ${variants.data.length} variants`);

    // Get active variants only
    const activeVariants = await billoget.products.getActiveVariants(
      productWithVariants.id
    );
    console.log(`✅ Active variants: ${activeVariants.data.length}`);
    console.log();

    // === BUDGET MANAGEMENT (READ-ONLY) ===
    console.log("💰 Budget Management (Read-Only)");

    // Get budgets with filters
    const budgets = await billoget.budgets.list({
      page: 1,
      limit: 5,
      status: 0, // Generated
    });
    console.log(`📋 Found ${budgets.data.length} generated budgets`);

    if (budgets.data.length > 0) {
      const budget = budgets.data[0];
      console.log(`   Budget ID: ${budget.id}`);
      console.log(`   Total: ${budget.currency} ${budget.total}`);
      console.log(
        `   State: ${budget.state} (${getStatusLabel(budget.state)})`
      );

      // Check UBS compliance
      if (budget.ubs_id) {
        console.log(`   UBS ID: ${budget.ubs_id}`);
        console.log(`   UBS Version: ${budget.ubs_version}`);
        console.log("   ✅ UBS Compliant");
      }
    }

    // Get budgets by customer
    if (newCustomer.id) {
      const customerBudgets = await billoget.budgets.getByCustomer(
        newCustomer.id
      );
      console.log(`👤 Customer has ${customerBudgets.data.length} budgets`);
    }
    console.log();

    // === BUDGET APPROVAL WORKFLOWS ===
    console.log("✅ Budget Approval Workflows");

    // Get approval configuration
    try {
      const approvalConfig = await billoget.budgetApprovals.getConfig();
      console.log("📋 Approval Configuration:");
      console.log(
        `   Requires Approval: ${approvalConfig.requiresBudgetApproval}`
      );
      console.log(`   Owner Can Approve: ${approvalConfig.ownerCanApprove}`);
      console.log(`   Admin Can Approve: ${approvalConfig.adminCanApprove}`);
      if (approvalConfig.approvalThreshold) {
        console.log(`   Threshold: ${approvalConfig.approvalThreshold}`);
      }
    } catch (error) {
      console.log("⚠️  Approval system not configured yet");
    }

    // Get approval statistics
    try {
      const stats = await billoget.budgetApprovals.getApprovalStats();
      console.log("📊 Approval Statistics:");
      console.log(`   Pending: ${stats.pending}`);
      console.log(`   Approved: ${stats.approved}`);
      console.log(`   Rejected: ${stats.rejected}`);
      console.log(`   Total: ${stats.total}`);
    } catch (error) {
      console.log("⚠️  Could not fetch approval statistics");
    }

    // Get pending approvals
    try {
      const pendingApprovals =
        await billoget.budgetApprovals.getPendingApprovals();
      console.log(`⏳ Pending approvals: ${pendingApprovals.length}`);
    } catch (error) {
      console.log("⚠️  Could not fetch pending approvals");
    }
    console.log();

    // === UBS (UNIFIED BUDGETING STANDARD) ===
    console.log("🌐 UBS - Unified Budgeting Standard");

    // Demonstrate token validation
    const validToken = "sample_budget_token_123";
    const isValidFormat = billoget.ubs.validateTokenFormat(validToken);
    console.log(
      `🔍 Token format validation: ${isValidFormat ? "Valid" : "Invalid"}`
    );

    // Generate shareable URL
    const shareableUrl = billoget.ubs.generateShareableUrl(validToken);
    console.log(`🔗 Shareable URL: ${shareableUrl}`);

    // Try to get public budget (will likely fail without valid token)
    try {
      const publicBudget = await billoget.ubs.getBudgetByToken(validToken);
      if (publicBudget) {
        console.log("✅ Public budget retrieved successfully");

        // Extract UBS information
        const ubsInfo = billoget.ubs.extractUBSInfo(publicBudget);
        console.log("📋 UBS Information:");
        console.log(`   UBS ID: ${ubsInfo.ubs_id || "Not set"}`);
        console.log(`   Version: ${ubsInfo.ubs_version}`);
        console.log(`   Compliant: ${ubsInfo.isUBSCompliant}`);

        // Check if expired
        const isExpired = billoget.ubs.isBudgetExpired(publicBudget);
        console.log(`   Expired: ${isExpired}`);
      }
    } catch (error) {
      console.log(
        "⚠️  Could not retrieve public budget (expected with sample token)"
      );
    }
    console.log();

    // === WEBHOOK TESTING ===
    console.log("🔗 Webhook Testing");

    try {
      const webhookResult = await billoget.webhooks.test({
        event: "sdk.demo",
        data: {
          timestamp: new Date().toISOString(),
          features: ["customers", "products", "budgets", "approvals", "ubs"],
          version: "1.1.0",
        },
      });
      console.log("✅ Webhook test successful");
      console.log(`   Response: ${webhookResult.data.message}`);
    } catch (error) {
      console.log("⚠️  Webhook test failed:", error.message);
    }
    console.log();

    console.log("🎉 Advanced features demonstration completed!");
    console.log("\n📚 Key improvements in v1.1.0:");
    console.log("   • Enhanced customer data with DNI/CUIT");
    console.log("   • Product variants support");
    console.log("   • Budget approval workflows");
    console.log("   • UBS (Unified Budgeting Standard)");
    console.log("   • Read-only budget management for data integrity");
    console.log("   • Comprehensive TypeScript support");
  } catch (error) {
    console.error("❌ Error during demonstration:", error.message);
    if (error.response) {
      console.error("   Status:", error.response.status);
      console.error("   Data:", error.response.data);
    }
  }
}

function getStatusLabel(state) {
  switch (state) {
    case 0:
      return "Generated";
    case 1:
      return "Approved";
    case 2:
      return "Rejected";
    default:
      return "Unknown";
  }
}

// Run the demonstration
demonstrateAdvancedFeatures()
  .then(() => {
    console.log("\n✨ Demo completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Demo failed:", error);
    process.exit(1);
  });
