import { BillogetConfig } from "./types/config";
import { HttpClient } from "./utils/http-client";
import { BudgetsService } from "./services/budgets";
import { CustomersService } from "./services/customers";
import { ProductsService } from "./services/products";
import { WebhooksService } from "./services/webhooks";
import { BudgetApprovalsService } from "./services/budget-approvals";
import { UBSService } from "./services/ubs";

export class BillogetSDK {
  private httpClient: HttpClient;
  private config: BillogetConfig;

  // Core services
  public readonly budgets: BudgetsService;
  public readonly customers: CustomersService;
  public readonly products: ProductsService;
  public readonly webhooks: WebhooksService;

  // Extended services
  public readonly budgetApprovals: BudgetApprovalsService;
  public readonly ubs: UBSService;

  constructor(config: BillogetConfig) {
    this.validateConfig(config);

    this.config = config;
    this.httpClient = new HttpClient(config);

    // Initialize core services
    this.budgets = new BudgetsService(this.httpClient);
    this.customers = new CustomersService(this.httpClient);
    this.products = new ProductsService(this.httpClient);
    this.webhooks = new WebhooksService(this.httpClient);

    // Initialize extended services
    this.budgetApprovals = new BudgetApprovalsService(this.httpClient);
    this.ubs = new UBSService(this.httpClient);
  }

  private validateConfig(config: BillogetConfig): void {
    if (!config.apiKey) {
      throw new Error("API key is required");
    }

    if (!config.apiKey.startsWith("bk_")) {
      throw new Error('Invalid API key format. API key must start with "bk_"');
    }

    if (config.timeout && (config.timeout < 1000 || config.timeout > 60000)) {
      throw new Error("Timeout must be between 1000ms and 60000ms");
    }

    if (config.retries && (config.retries < 0 || config.retries > 5)) {
      throw new Error("Retries must be between 0 and 5");
    }
  }

  /**
   * Get SDK version
   */
  static getVersion(): string {
    return "1.1.0";
  }

  /**
   * Create a new SDK instance (alias for constructor)
   */
  static create(config: BillogetConfig): BillogetSDK {
    return new BillogetSDK(config);
  }

  /**
   * Get current configuration (without sensitive data)
   */
  getConfig(): Omit<BillogetConfig, "apiKey"> & { apiKeyPrefix: string } {
    return {
      baseUrl: this.config.baseUrl,
      timeout: this.config.timeout,
      retries: this.config.retries,
      debug: this.config.debug,
      apiKeyPrefix: this.config.apiKey.substring(0, 8) + "...",
    };
  }

  /**
   * Test API connection and authentication
   */
  async testConnection(): Promise<{
    success: boolean;
    message: string;
    timestamp: string;
    version: string;
  }> {
    try {
      const result = await this.webhooks.test({
        event: "connection_test",
        data: {
          sdk_version: BillogetSDK.getVersion(),
          timestamp: new Date().toISOString(),
        },
      });

      return {
        success: true,
        message: "Connection successful",
        timestamp: result.data.timestamp,
        version: BillogetSDK.getVersion(),
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Connection failed",
        timestamp: new Date().toISOString(),
        version: BillogetSDK.getVersion(),
      };
    }
  }

  /**
   * Get comprehensive SDK information
   */
  getInfo(): {
    version: string;
    services: string[];
    config: Omit<BillogetConfig, "apiKey"> & { apiKeyPrefix: string };
  } {
    return {
      version: BillogetSDK.getVersion(),
      services: [
        "budgets",
        "customers",
        "products",
        "webhooks",
        "budgetApprovals",
        "ubs",
      ],
      config: this.getConfig(),
    };
  }
}
