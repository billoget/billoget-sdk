"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillogetSDK = void 0;
const http_client_1 = require("./utils/http-client");
const budgets_1 = require("./services/budgets");
const customers_1 = require("./services/customers");
const products_1 = require("./services/products");
const webhooks_1 = require("./services/webhooks");
const budget_approvals_1 = require("./services/budget-approvals");
const ubs_1 = require("./services/ubs");
class BillogetSDK {
    constructor(config) {
        this.validateConfig(config);
        this.config = config;
        this.httpClient = new http_client_1.HttpClient(config);
        // Initialize core services
        this.budgets = new budgets_1.BudgetsService(this.httpClient);
        this.customers = new customers_1.CustomersService(this.httpClient);
        this.products = new products_1.ProductsService(this.httpClient);
        this.webhooks = new webhooks_1.WebhooksService(this.httpClient);
        // Initialize extended services
        this.budgetApprovals = new budget_approvals_1.BudgetApprovalsService(this.httpClient);
        this.ubs = new ubs_1.UBSService(this.httpClient);
    }
    validateConfig(config) {
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
    static getVersion() {
        return "1.1.0";
    }
    /**
     * Create a new SDK instance (alias for constructor)
     */
    static create(config) {
        return new BillogetSDK(config);
    }
    /**
     * Get current configuration (without sensitive data)
     */
    getConfig() {
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
    async testConnection() {
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
        }
        catch (error) {
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
    getInfo() {
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
exports.BillogetSDK = BillogetSDK;
//# sourceMappingURL=billoget-sdk.js.map