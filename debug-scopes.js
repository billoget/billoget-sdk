const axios = require("axios");

const API_KEY = "bk_live_4wigbuxps_OAIn2HaJYV2YzXNkx68t2j";
const API_BASE_URL = "https://api.billoget.com";

async function debugScopes() {
  console.log("🔍 Debugging API Key scopes...\n");

  try {
    // Hacer una petición a un endpoint que no existe para ver el error detallado
    const response = await axios.get(
      `${API_BASE_URL}/api/public/debug-scopes`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.log(
      "❌ Error (expected):",
      error.response?.status,
      error.response?.statusText
    );
    console.log("📝 Error details:", error.response?.data);

    // Si el error menciona scopes, podemos ver qué scopes tiene
    if (error.response?.data?.message?.includes("scope")) {
      console.log("\n🔍 Scope information found in error message");
    }
  }

  console.log(
    "\n🧪 Testing different endpoints to understand scope validation...\n"
  );

  // Test budgets endpoint
  try {
    await axios.get(`${API_BASE_URL}/api/public/budgets?limit=1`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    console.log("✅ Budgets endpoint: SUCCESS");
  } catch (error) {
    console.log(
      "❌ Budgets endpoint:",
      error.response?.data?.message || error.message
    );
  }

  // Test customers endpoint
  try {
    await axios.get(`${API_BASE_URL}/api/public/customers?limit=1`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    console.log("✅ Customers endpoint: SUCCESS");
  } catch (error) {
    console.log(
      "❌ Customers endpoint:",
      error.response?.data?.message || error.message
    );
  }

  // Test products endpoint
  try {
    await axios.get(`${API_BASE_URL}/api/public/products?limit=1`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    console.log("✅ Products endpoint: SUCCESS");
  } catch (error) {
    console.log(
      "❌ Products endpoint:",
      error.response?.data?.message || error.message
    );
  }
}

debugScopes()
  .then(() => {
    console.log("\n🎉 Debug completed!");
  })
  .catch((error) => {
    console.error("\n💥 Debug failed:", error);
  });
