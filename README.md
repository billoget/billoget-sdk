# Billoget SDK for Node.js

[![npm version](https://badge.fury.io/js/billoget-sdk.svg)](https://badge.fury.io/js/billoget-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

The official Node.js SDK for the Billoget Public API. Provides complete access to budget management, customer relations, product catalog, approval workflows, and UBS (Unified Budgeting Standard) functionality.

## Features

- 🏗️ **Complete CRUD Operations** - Full management of customers and products
- 📊 **Budget Management** - Read-only access to budgets with comprehensive filtering
- ✅ **Approval Workflows** - Complete budget approval system management
- 🌐 **UBS Support** - Unified Budgeting Standard for public budget access
- 🔄 **Product Variants** - Advanced product management with variants
- 🔐 **Type Safety** - Full TypeScript support with comprehensive type definitions
- 🚀 **Modern API** - Promise-based with async/await support
- 📝 **Comprehensive Documentation** - Detailed examples and API reference

## Installation

```bash
npm install billoget-sdk
```

## Quick Start

```javascript
const { BillogetSDK } = require("billoget-sdk");

// Initialize the SDK
const billoget = new BillogetSDK({
  apiKey: "bk_live_your_api_key_here",
});

// Get all customers
const customers = await billoget.customers.list();

// Create a new customer
const customer = await billoget.customers.create({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phoneNumber: "+1234567890",
});

// Get budgets with filters
const budgets = await billoget.budgets.list({
  status: 0, // Generated
  page: 1,
  limit: 10,
});
```

## Services Overview

The SDK provides access to the following services:

### Core Services

- **`customers`** - Customer management (CRUD operations)
- **`products`** - Product and variant management (CRUD operations)
- **`budgets`** - Budget viewing and filtering (read-only)
- **`webhooks`** - Webhook testing and integration

### Extended Services

- **`budgetApprovals`** - Budget approval workflow management
- **`ubs`** - Public budget access via UBS (Unified Budgeting Standard)

## Detailed Usage

### Customer Management

```javascript
// List customers with pagination and search
const customers = await billoget.customers.list({
  page: 1,
  limit: 20,
  search: "john",
});

// Get a specific customer
const customer = await billoget.customers.get(123);

// Create a new customer
const newCustomer = await billoget.customers.create({
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  phoneNumber: "+1987654321",
  dni: 12345678,
  cuit: "20-12345678-9",
});

// Update customer
const updatedCustomer = await billoget.customers.update(123, {
  email: "newemail@example.com",
  phoneNumber: "+1555000123",
});

// Delete customer
await billoget.customers.delete(123);

// Search customers
const searchResults = await billoget.customers.search("john doe");
```

### Product Management

```javascript
// List products with filters
const products = await billoget.products.list({
  page: 1,
  limit: 10,
  category: "Electronics",
  isActive: true,
  type: "product",
});

// Get a specific product
const product = await billoget.products.get(456);

// Create a new product
const newProduct = await billoget.products.create({
  productCode: "PROD-001",
  description: "Premium Laptop",
  category: "Electronics",
  price: 1299.99,
  stock: 50,
  sku: "LAP-PREM-001",
  type: "product",
  isActive: true,
});

// Create a product with variants
const productWithVariants = await billoget.products.createWithVariants({
  productCode: "SHIRT-001",
  description: "Cotton T-Shirt",
  category: "Clothing",
  price: 25.0,
  variants: [
    {
      name: "Small - Blue",
      price: 25.0,
      stock: 100,
      attributes: { size: "S", color: "Blue" },
    },
    {
      name: "Medium - Red",
      price: 27.0,
      stock: 75,
      attributes: { size: "M", color: "Red" },
    },
  ],
});

// Get product variants
const variants = await billoget.products.getVariants(456);

// Create a new variant
const newVariant = await billoget.products.createVariant({
  productId: 456,
  name: "Large - Green",
  price: 29.0,
  stock: 50,
  attributes: { size: "L", color: "Green" },
});
```

### Budget Management (Read-Only)

```javascript
// List budgets with filters
const budgets = await billoget.budgets.list({
  page: 1,
  limit: 10,
  status: 0, // Generated
  customerId: 123,
  startDate: "2024-01-01",
  endDate: "2024-12-31",
});

// Get a specific budget
const budget = await billoget.budgets.get(789);

// Get budgets by customer
const customerBudgets = await billoget.budgets.getByCustomer(123);

// Get budgets by status
const approvedBudgets = await billoget.budgets.getByStatus(1); // Approved

// Search budgets
const searchResults = await billoget.budgets.search("laptop");
```

### Budget Approval Workflows

```javascript
// Get approval configuration
const config = await billoget.budgetApprovals.getConfig();

// Update approval configuration
await billoget.budgetApprovals.createOrUpdateConfig({
  requiresBudgetApproval: true,
  ownerCanApprove: true,
  adminCanApprove: true,
  approvalThreshold: 1000.0,
});

// Get approvers
const approvers = await billoget.budgetApprovals.getApprovers();

// Assign a new approver
await billoget.budgetApprovals.assignApprover({
  userId: 456,
  notes: "Senior manager for high-value budgets",
});

// Submit budget for approval
const approval = await billoget.budgetApprovals.submitForApproval({
  budgetId: 789,
  requestNotes: "High-value client request",
});

// Process approval
await billoget.budgetApprovals.processApproval(approval.id, {
  action: "approve",
  comments: "Approved by manager",
});

// Get pending approvals
const pendingApprovals = await billoget.budgetApprovals.getPendingApprovals();

// Get approval statistics
const stats = await billoget.budgetApprovals.getApprovalStats();
```

### UBS (Unified Budgeting Standard)

```javascript
// Get public budget by token (no API key required)
const publicBudget = await billoget.ubs.getBudgetByToken("budget_token_here");

// Debug token for troubleshooting
const debugInfo = await billoget.ubs.debugToken("budget_token_here");

// Confirm budget publicly
const confirmation = await billoget.ubs.confirmBudget("budget_token_here");

// Reject budget publicly
const rejection = await billoget.ubs.rejectBudget("budget_token_here");

// Validate token format
const isValid = billoget.ubs.validateTokenFormat("budget_token_here");

// Extract UBS information
const ubsInfo = billoget.ubs.extractUBSInfo(publicBudget);

// Generate shareable URL
const shareUrl = billoget.ubs.generateShareableUrl("budget_token_here");

// Check if budget is expired
const isExpired = billoget.ubs.isBudgetExpired(publicBudget);
```

### Webhook Testing

```javascript
// Test webhook endpoint
const result = await billoget.webhooks.test({
  event: "budget.created",
  data: {
    budgetId: 789,
    customerId: 123,
    total: 1500.0,
  },
});
```

## Configuration Options

```javascript
const billoget = new BillogetSDK({
  apiKey: "bk_live_your_api_key_here",
  baseUrl: "https://api.billoget.com", // Optional, defaults to production
  timeout: 30000, // Optional, request timeout in ms (1000-60000)
  retries: 3, // Optional, number of retries (0-5)
  debug: false, // Optional, enable debug logging
});
```

## Error Handling

```javascript
try {
  const customer = await billoget.customers.get(999);
} catch (error) {
  if (error.response?.status === 404) {
    console.log("Customer not found");
  } else if (error.response?.status === 401) {
    console.log("Invalid API key");
  } else {
    console.log("Error:", error.message);
  }
}
```

## TypeScript Support

The SDK is written in TypeScript and provides comprehensive type definitions:

```typescript
import {
  BillogetSDK,
  Customer,
  Product,
  Budget,
  BudgetApproval,
} from "billoget-sdk";

const billoget = new BillogetSDK({
  apiKey: "bk_live_your_api_key_here",
});

// All methods are fully typed
const customers: PaginatedResponse<Customer> = await billoget.customers.list();
const product: Product = await billoget.products.get(123);
const budget: Budget = await billoget.budgets.get(456);
```

## API Reference

### SDK Instance Methods

- `getVersion()` - Get SDK version
- `getConfig()` - Get current configuration (without API key)
- `getInfo()` - Get comprehensive SDK information
- `testConnection()` - Test API connection and authentication

### Data Types

The SDK includes comprehensive TypeScript definitions for:

- **Customer** - Customer entity with all fields
- **Product** - Product entity with variants support
- **ProductVariant** - Product variant with attributes
- **Budget** - Budget entity with items and UBS fields
- **BudgetItem** - Individual budget line items
- **BudgetApproval** - Approval workflow entities
- **PublicBudget** - Public budget view for UBS
- **ApprovalConfig** - Approval system configuration

## Important Notes

### Budget Management

- **Budgets are read-only** via the API to maintain data integrity
- Budget creation and editing must be done through the main Billoget application
- Use the approval workflow system for budget approvals

### UBS (Unified Budgeting Standard)

- UBS endpoints provide public access to budgets via tokens
- No API key authentication required for UBS endpoints
- Supports budget confirmation and rejection workflows

### Rate Limiting

- API requests are subject to rate limiting
- Rate limit information is included in response headers
- The SDK automatically handles rate limit errors with retries

## Support

- **Documentation**: [https://developers.billoget.com](https://developers.billoget.com)
- **Issues**: [https://github.com/billoget/billoget-sdk/issues](https://github.com/billoget/billoget-sdk/issues)
- **Email**: developers@billoget.com

## License

MIT License - see [LICENSE](LICENSE) file for details.
