"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillogetSDK = void 0;
const http_client_1 = require("./utils/http-client");
const budgets_1 = require("./services/budgets");
const customers_1 = require("./services/customers");
const products_1 = require("./services/products");
const webhooks_1 = require("./services/webhooks");
class BillogetSDK {
    constructor(config) {
        this.validateConfig(config);
        this.httpClient = new http_client_1.HttpClient(config);
        // Initialize services
        this.budgets = new budgets_1.BudgetsService(this.httpClient);
        this.customers = new customers_1.CustomersService(this.httpClient);
        this.products = new products_1.ProductsService(this.httpClient);
        this.webhooks = new webhooks_1.WebhooksService(this.httpClient);
    }
    validateConfig(config) {
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
    static getVersion() {
        return "1.0.0";
    }
    /**
     * Create a new instance of BillogetSDK
     */
    static create(config) {
        return new BillogetSDK(config);
    }
}
exports.BillogetSDK = BillogetSDK;
//# sourceMappingURL=billoget-sdk.js.map