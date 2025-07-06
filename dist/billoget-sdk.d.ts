import { BillogetConfig } from "./types/config";
import { BudgetsService } from "./services/budgets";
import { CustomersService } from "./services/customers";
import { ProductsService } from "./services/products";
import { WebhooksService } from "./services/webhooks";
import { BudgetApprovalsService } from "./services/budget-approvals";
import { UBSService } from "./services/ubs";
export declare class BillogetSDK {
    private httpClient;
    private config;
    readonly budgets: BudgetsService;
    readonly customers: CustomersService;
    readonly products: ProductsService;
    readonly webhooks: WebhooksService;
    readonly budgetApprovals: BudgetApprovalsService;
    readonly ubs: UBSService;
    constructor(config: BillogetConfig);
    private validateConfig;
    /**
     * Get SDK version
     */
    static getVersion(): string;
    /**
     * Create a new SDK instance (alias for constructor)
     */
    static create(config: BillogetConfig): BillogetSDK;
    /**
     * Get current configuration (without sensitive data)
     */
    getConfig(): Omit<BillogetConfig, "apiKey"> & {
        apiKeyPrefix: string;
    };
    /**
     * Test API connection and authentication
     */
    testConnection(): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
        version: string;
    }>;
    /**
     * Get comprehensive SDK information
     */
    getInfo(): {
        version: string;
        services: string[];
        config: Omit<BillogetConfig, "apiKey"> & {
            apiKeyPrefix: string;
        };
    };
}
//# sourceMappingURL=billoget-sdk.d.ts.map