import { BillogetConfig } from "./types/config";
import { HttpClient } from "./utils/http-client";
import { BudgetsService } from "./services/budgets";
import { CustomersService } from "./services/customers";
import { ProductsService } from "./services/products";
import { WebhooksService } from "./services/webhooks";

export class BillogetSDK {
  public readonly budgets: BudgetsService;
  public readonly customers: CustomersService;
  public readonly products: ProductsService;
  public readonly webhooks: WebhooksService;

  private httpClient: HttpClient;

  constructor(config: BillogetConfig) {
    this.validateConfig(config);
    this.httpClient = new HttpClient(config);

    // Initialize services
    this.budgets = new BudgetsService(this.httpClient);
    this.customers = new CustomersService(this.httpClient);
    this.products = new ProductsService(this.httpClient);
    this.webhooks = new WebhooksService(this.httpClient);
  }

  private validateConfig(config: BillogetConfig): void {
    if (!config.apiKey) {
      throw new Error("API key is required");
    }

    if (!config.apiKey.startsWith("bk_")) {
      throw new Error('Invalid API key format. Must start with "bk_"');
    }
  }

  /**
   * Get SDK version
   */
  static getVersion(): string {
    return "1.0.0";
  }

  /**
   * Create a new instance of BillogetSDK
   */
  static create(config: BillogetConfig): BillogetSDK {
    return new BillogetSDK(config);
  }
}
