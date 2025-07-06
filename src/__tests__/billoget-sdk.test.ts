import { BillogetSDK } from "../billoget-sdk";
import { BillogetConfig } from "../types/config";

describe("BillogetSDK", () => {
  const validConfig: BillogetConfig = {
    apiKey: "bk_test_123456789",
    baseUrl: "https://api.test.billoget.com",
    debug: true,
  };

  describe("constructor", () => {
    it("should create SDK instance with valid config", () => {
      const sdk = new BillogetSDK(validConfig);

      expect(sdk).toBeInstanceOf(BillogetSDK);
      expect(sdk.budgets).toBeDefined();
      expect(sdk.customers).toBeDefined();
      expect(sdk.products).toBeDefined();
      expect(sdk.webhooks).toBeDefined();
    });

    it("should throw error with missing API key", () => {
      const invalidConfig = { ...validConfig, apiKey: "" };

      expect(() => new BillogetSDK(invalidConfig)).toThrow(
        "API key is required"
      );
    });

    it("should throw error with invalid API key format", () => {
      const invalidConfig = { ...validConfig, apiKey: "invalid_key" };

      expect(() => new BillogetSDK(invalidConfig)).toThrow(
        "Invalid API key format"
      );
    });
  });

  describe("static methods", () => {
    it("should return version", () => {
      expect(BillogetSDK.getVersion()).toBe("1.0.0");
    });

    it("should create instance using static method", () => {
      const sdk = BillogetSDK.create(validConfig);

      expect(sdk).toBeInstanceOf(BillogetSDK);
    });
  });
});
