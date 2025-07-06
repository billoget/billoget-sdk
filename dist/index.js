"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = exports.WebhooksService = exports.ProductsService = exports.CustomersService = exports.BudgetsService = exports.BillogetSDK = void 0;
// Main SDK export
var billoget_sdk_1 = require("./billoget-sdk");
Object.defineProperty(exports, "BillogetSDK", { enumerable: true, get: function () { return billoget_sdk_1.BillogetSDK; } });
// Export types
__exportStar(require("./types"), exports);
__exportStar(require("./types/config"), exports);
__exportStar(require("./types/product"), exports);
__exportStar(require("./types/query"), exports);
// Export services for advanced usage
var budgets_1 = require("./services/budgets");
Object.defineProperty(exports, "BudgetsService", { enumerable: true, get: function () { return budgets_1.BudgetsService; } });
var customers_1 = require("./services/customers");
Object.defineProperty(exports, "CustomersService", { enumerable: true, get: function () { return customers_1.CustomersService; } });
var products_1 = require("./services/products");
Object.defineProperty(exports, "ProductsService", { enumerable: true, get: function () { return products_1.ProductsService; } });
var webhooks_1 = require("./services/webhooks");
Object.defineProperty(exports, "WebhooksService", { enumerable: true, get: function () { return webhooks_1.WebhooksService; } });
// Export utilities
var http_client_1 = require("./utils/http-client");
Object.defineProperty(exports, "HttpClient", { enumerable: true, get: function () { return http_client_1.HttpClient; } });
// Default export
const billoget_sdk_2 = require("./billoget-sdk");
exports.default = billoget_sdk_2.BillogetSDK;
//# sourceMappingURL=index.js.map