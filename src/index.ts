// Main SDK export
export { BillogetSDK } from "./billoget-sdk";

// Export types
export * from "./types";
export * from "./types/config";
export * from "./types/product";
export * from "./types/query";

// Export services for advanced usage
export { BudgetsService } from "./services/budgets";
export { CustomersService } from "./services/customers";
export { ProductsService } from "./services/products";
export { WebhooksService } from "./services/webhooks";

// Export utilities
export { HttpClient } from "./utils/http-client";

// Default export
import { BillogetSDK } from "./billoget-sdk";
export default BillogetSDK;
