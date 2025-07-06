import { BillogetConfig } from "./types/config";
import { BudgetsService } from "./services/budgets";
import { CustomersService } from "./services/customers";
import { ProductsService } from "./services/products";
import { WebhooksService } from "./services/webhooks";
export declare class BillogetSDK {
    readonly budgets: BudgetsService;
    readonly customers: CustomersService;
    readonly products: ProductsService;
    readonly webhooks: WebhooksService;
    private httpClient;
    constructor(config: BillogetConfig);
    private validateConfig;
    /**
     * Get SDK version
     */
    static getVersion(): string;
    /**
     * Create a new instance of BillogetSDK
     */
    static create(config: BillogetConfig): BillogetSDK;
}
//# sourceMappingURL=billoget-sdk.d.ts.map