const axios = require("axios");

const API_KEY = "bk_live_4wigbuxps_OAIn2HaJYV2YzXNkx68t2j";
const API_BASE_URL = "https://api.billoget.com";

async function testDebugEndpoint() {
  console.log("🔍 Testing debug endpoint...\n");

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/public/debug/api-key-info`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Debug endpoint response:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(
      "❌ Error calling debug endpoint:",
      error.response?.status,
      error.response?.statusText
    );
    console.log(
      "📝 Error details:",
      JSON.stringify(error.response?.data, null, 2)
    );
  }
}

testDebugEndpoint()
  .then(() => {
    console.log("\n🎉 Debug test completed!");
  })
  .catch((error) => {
    console.error("\n💥 Debug test failed:", error);
  });
