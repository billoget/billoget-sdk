# Billoget SDK for Node.js

[![npm version](https://badge.fury.io/js/billoget-sdk.svg)](https://badge.fury.io/js/billoget-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official Node.js SDK for the Billoget Public API. Build powerful integrations with budget and customer management features.

## Features

- 🚀 **Full TypeScript Support** - Complete type definitions for all API endpoints
- 🛡️ **Built-in Authentication** - Secure API key management
- 📊 **Complete API Coverage** - Budgets, Customers, Products, and Webhooks
- 🔄 **Automatic Retries** - Configurable retry logic for failed requests
- 🎯 **Clean Architecture** - Following SOLID principles and clean code practices
- 📝 **Comprehensive Documentation** - Detailed guides and examples

## Installation

```bash
npm install billoget-sdk
```

## Quick Start

```javascript
import { BillogetSDK } from "billoget-sdk";

// Initialize the SDK
const billoget = new BillogetSDK({
  apiKey: "bk_live_your_api_key_here",
  baseUrl: "https://api.billoget.com", // Optional, defaults to production
  debug: false, // Optional, enable debug logging
});

// Create a customer
const customer = await billoget.customers.create({
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
});

// Create a budget
const budget = await billoget.budgets.create({
  customerId: customer.data.id,
  items: [
    {
      productId: "product_123",
      description: "Premium Service",
      quantity: 2,
      unitPrice: 100.0,
    },
  ],
  notes: "Q1 Budget for John Doe",
});

console.log("Budget created:", budget.data);
```

## API Reference

### Configuration

```typescript
interface BillogetConfig {
  apiKey: string; // Your Billoget API key (required)
  baseUrl?: string; // API base URL (optional)
  timeout?: number; // Request timeout in ms (default: 30000)
  retries?: number; // Number of retries (default: 3)
  debug?: boolean; // Enable debug logging (default: false)
}
```

### Budgets

```javascript
// List budgets with pagination
const budgets = await billoget.budgets.list({
  page: 1,
  limit: 10,
  status: "PENDING",
});

// Get budget by ID
const budget = await billoget.budgets.getById("budget_123");

// Create budget
const newBudget = await billoget.budgets.create({
  customerId: "customer_456",
  items: [
    {
      productId: "product_789",
      description: "Marketing Package",
      quantity: 1,
      unitPrice: 500.0,
    },
  ],
  validUntil: "2024-12-31T23:59:59Z",
});

// Update budget
const updatedBudget = await billoget.budgets.update("budget_123", {
  status: "APPROVED",
  notes: "Approved by manager",
});

// Delete budget
await billoget.budgets.delete("budget_123");
```

### Customers

```javascript
// List customers
const customers = await billoget.customers.list({
  page: 1,
  limit: 10,
  search: "john",
});

// Get customer by ID
const customer = await billoget.customers.getById("customer_456");

// Create customer
const newCustomer = await billoget.customers.create({
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+1987654321",
  address: "123 Main St",
  city: "New York",
  country: "USA",
});

// Update customer
const updatedCustomer = await billoget.customers.update("customer_456", {
  name: "Jane Doe",
  phone: "+1555123456",
});

// Delete customer
await billoget.customers.delete("customer_456");
```

### Products

```javascript
// List products
const products = await billoget.products.list({
  page: 1,
  limit: 10,
  category: "services",
  isActive: true,
});

// Get product by ID
const product = await billoget.products.getById("product_789");

// Create product
const newProduct = await billoget.products.create({
  name: "Premium Marketing Package",
  description: "Comprehensive marketing solution",
  price: 2500.0,
  sku: "MKT-PREM-001",
  category: "services",
});

// Update product
const updatedProduct = await billoget.products.update("product_789", {
  name: "Premium Marketing Package Pro",
  price: 2999.0,
});

// Delete product
await billoget.products.delete("product_789");
```

### Webhooks

```javascript
// Test webhook
const webhookTest = await billoget.webhooks.test({
  event: "budget.created",
  data: {
    id: "budget_123",
    customerId: "customer_456",
    total: 1500.0,
  },
});
```

## Error Handling

The SDK provides structured error handling:

```javascript
try {
  const budget = await billoget.budgets.getById("invalid_id");
} catch (error) {
  console.error("API Error:", {
    message: error.message,
    statusCode: error.statusCode,
    error: error.error,
  });
}
```

## TypeScript Support

The SDK is built with TypeScript and provides complete type definitions:

```typescript
import { BillogetSDK, Budget, Customer, Product } from "billoget-sdk";

const billoget = new BillogetSDK({ apiKey: "your_api_key" });

// All responses are properly typed
const budget: Budget = await billoget.budgets.getById("budget_123");
const customer: Customer = await billoget.customers.getById("customer_456");
const product: Product = await billoget.products.getById("product_789");
```

## Advanced Usage

### Custom HTTP Client

```javascript
import { HttpClient, BillogetConfig } from 'billoget-sdk';

const config: BillogetConfig = {
  apiKey: 'your_api_key',
  timeout: 60000,
  retries: 5,
  debug: true
};

const httpClient = new HttpClient(config);
```

### Direct Service Usage

```javascript
import { BudgetsService, HttpClient } from "billoget-sdk";

const httpClient = new HttpClient({ apiKey: "your_api_key" });
const budgetsService = new BudgetsService(httpClient);

const budgets = await budgetsService.list();
```

## Requirements

- Node.js 14.0.0 or higher
- TypeScript 4.0.0 or higher (for TypeScript projects)

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/billoget/billoget-sdk/blob/main/CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](https://developers.billoget.com)
- 🐛 [Issues](https://github.com/billoget/billoget-sdk/issues)
- 💬 [Discussions](https://github.com/billoget/billoget-sdk/discussions)
- 📧 [Support](mailto:developers@billoget.com)

## Links

- [Billoget Website](https://billoget.com)
- [Developer Portal](https://developers.billoget.com)
- [API Documentation](https://developers.billoget.com/docs)
- [GitHub Repository](https://github.com/billoget/billoget-sdk)
