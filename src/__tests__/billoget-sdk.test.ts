import { BillogetSDK } from "../billoget-sdk";
import { BillogetConfig } from "../types/config";

describe("BillogetSDK", () => {
  const config = {
    apiKey: "bk_test_1234567890abcdef",
    debug: true,
  };

  describe("Constructor and validation", () => {
    it("should create an instance with valid config", () => {
      const sdk = new BillogetSDK(config);
      expect(sdk).toBeInstanceOf(BillogetSDK);
    });

    it("should throw error for missing API key", () => {
      expect(() => {
        new BillogetSDK({ apiKey: "" });
      }).toThrow("API key is required");
    });

    it("should throw error for invalid API key format", () => {
      expect(() => {
        new BillogetSDK({ apiKey: "invalid_key" });
      }).toThrow('Invalid API key format. API key must start with "bk_"');
    });

    it("should throw error for invalid timeout", () => {
      expect(() => {
        new BillogetSDK({ ...config, timeout: 500 });
      }).toThrow("Timeout must be between 1000ms and 60000ms");
    });

    it("should throw error for invalid retries", () => {
      expect(() => {
        new BillogetSDK({ ...config, retries: 10 });
      }).toThrow("Retries must be between 0 and 5");
    });
  });

  describe("Services initialization", () => {
    let sdk: BillogetSDK;

    beforeEach(() => {
      sdk = new BillogetSDK(config);
    });

    it("should initialize all core services", () => {
      expect(sdk.budgets).toBeDefined();
      expect(sdk.customers).toBeDefined();
      expect(sdk.products).toBeDefined();
      expect(sdk.webhooks).toBeDefined();
    });

    it("should initialize all extended services", () => {
      expect(sdk.budgetApprovals).toBeDefined();
      expect(sdk.ubs).toBeDefined();
    });
  });

  describe("Static methods", () => {
    it("should return correct version", () => {
      expect(BillogetSDK.getVersion()).toBe("1.1.0");
    });

    it("should create instance via static method", () => {
      const sdk = BillogetSDK.create(config);
      expect(sdk).toBeInstanceOf(BillogetSDK);
    });
  });

  describe("Instance methods", () => {
    let sdk: BillogetSDK;

    beforeEach(() => {
      sdk = new BillogetSDK(config);
    });

    it("should return config without API key", () => {
      const sdkConfig = sdk.getConfig();
      expect(sdkConfig.apiKeyPrefix).toBe("bk_test_...");
      expect(sdkConfig.debug).toBe(true);
      expect((sdkConfig as any).apiKey).toBeUndefined();
    });

    it("should return comprehensive SDK info", () => {
      const info = sdk.getInfo();
      expect(info.version).toBe("1.1.0");
      expect(info.services).toEqual([
        "budgets",
        "customers",
        "products",
        "webhooks",
        "budgetApprovals",
        "ubs",
      ]);
      expect(info.config.apiKeyPrefix).toBe("bk_test_...");
    });
  });
});
