# Changelog

All notable changes to the Billoget SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-01-15

### Added

#### New Public Budget Creation

- **BudgetsService.createPublic()** - Create budgets via public API
  - Returns public URL for budget viewing
  - No authentication required for budget creation
  - Integrates with UBS (Unified Budgeting Standard)
  - Response includes `publicUrl`, `budgetId`, and `publicToken`

#### Enhanced Budget Data

- **Extended Budget Fields** - Additional fields in budget responses:
  - `iva` - Tax amount for the budget
  - `paymentUrl` - Direct payment link
  - `publicToken` - Public access token
  - `comments` - Additional budget comments
  - `ubs_id` - UBS unique identifier
  - `ubs_version` - UBS standard version
  - `sign_track_id` - Digital signature tracking ID
  - `isArchived` - Budget archival status

#### Enhanced Product Information

- **Complete Product Data** - Full product details in budget items:
  - `productCode` - Product identification code
  - `category` - Product category
  - `type` - Product type (PRODUCT/SERVICE)
  - `netContent` - Net content amount
  - `netContentUnit` - Net content unit of measure
  - `isActive` - Product active status

#### Enhanced Business Information

- **Complete Business Data** - Full business details in budget responses:
  - Complete seller business information
  - Budget business information (if different from seller)
  - Enhanced address and contact information
  - Logo and branding details

### Changed

#### API Response Structure

- **PublicBudget Interface** - Updated to include all new fields
- **BudgetItem Interface** - Enhanced with complete product/package data
- **Business Relations** - Full business information in budget responses

#### Type Definitions

- **CreateBudgetRequest** - New type alias for public budget creation
- **Enhanced PublicBudget** - Complete type definitions for all new fields
- **Product Information** - Full product details in budget items

### Technical Improvements

- Enhanced type safety with complete field definitions
- Improved response parsing for new data structures
- Better integration with UBS standard
- Enhanced error handling for public endpoints

### Usage Examples

#### Creating Public Budgets

```javascript
const result = await billoget.budgets.createPublic({
  currency: "USD",
  issueDate: new Date(),
  expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  customerId: 123,
  sellerId: 456,
  minimumPaymentToConfirm: 100.0,
  subtotal: 1000.0,
  total: 1210.0,
  iva: 210.0,
  comments: "Budget for new project",
  items: [
    {
      productId: 789,
      quantity: 2,
      unitPrice: 500.0,
    },
  ],
});

console.log(`Budget created: ${result.publicUrl}`);
// Output: Budget created: https://app.billoget.com/budget/abc123_xyz789
```

#### Accessing Enhanced Budget Data

```javascript
const budget = await billoget.ubs.getBudgetByToken("abc123_xyz789");

console.log(`Budget #${budget.id}`);
console.log(`Tax: ${budget.iva}`);
console.log(`Payment URL: ${budget.paymentUrl}`);
console.log(`UBS ID: ${budget.ubs_id}`);
console.log(`Archived: ${budget.isArchived}`);

// Access complete product information
budget.items?.forEach((item) => {
  console.log(`Product: ${item.product?.productCode} - ${item.product?.description}`);
  console.log(`Category: ${item.product?.category}`);
  console.log(`Type: ${item.product?.type}`);
});
```

### Migration Guide

#### From 1.1.0 to 1.2.0

**New Public Budget Creation:**

```javascript
// ✅ New in 1.2.0
const result = await billoget.budgets.createPublic(budgetData);
console.log(`Share this URL: ${result.publicUrl}`);
```

**Enhanced Budget Data Access:**

```javascript
// ✅ Enhanced in 1.2.0 - More fields available
const budget = await billoget.ubs.getBudgetByToken("token");
console.log(`Tax: ${budget.iva}`); // New field
console.log(`Payment: ${budget.paymentUrl}`); // New field
console.log(`UBS ID: ${budget.ubs_id}`); // New field
console.log(`Archived: ${budget.isArchived}`); // New field
```

**Complete Product Information:**

```javascript
// ✅ Enhanced in 1.2.0 - Complete product data
budget.items?.forEach((item) => {
  const product = item.product;
  console.log(`Code: ${product?.productCode}`); // New field
  console.log(`Category: ${product?.category}`); // New field
  console.log(`Type: ${product?.type}`); // New field
  console.log(`Net Content: ${product?.netContent} ${product?.netContentUnit}`); // New fields
});
```

## [1.1.0] - 2025-07-06

### Added

#### New Services

- **BudgetApprovalsService** - Complete budget approval workflow management
  - Configuration management (get/update approval settings)
  - Approver management (assign/remove budget approvers)
  - Approval workflow (submit for approval, approve/reject budgets)
  - Query methods (pending approvals, approval history, statistics)

- **UBSService** - Unified Budgeting Standard for public budget access
  - Public budget access via tokens (no API key required)
  - Budget confirmation and rejection workflows
  - Token validation and debugging utilities
  - UBS metadata extraction and compliance checking
  - Shareable URL generation

#### Enhanced Types System

- **Product Management**
  - Added `ProductVariant` interface with full attribute support
  - Added `CreateProductWithVariantsDto` for creating products with variants
  - Added `ProductType` enum (PRODUCT, SERVICE)
  - Enhanced product properties: `productCode`, `netContent`, `barcode`, `imageUrl`

- **Customer Management**
  - Added `dni` and `cuit` fields for tax identification
  - Enhanced customer data validation and structure

- **Budget Management**
  - Added `BudgetState` enum (GENERATED, APPROVED, REJECTED)
  - Added UBS fields: `ubs_id`, `ubs_version`, `sign_track_id`, `business_budget_id`
  - Added `BudgetItem` interface with product/package relationships
  - Added `PublicBudget` interface for public access

- **Approval System**
  - Added `BudgetApproval`, `ApprovalConfig`, `BudgetApprover` interfaces
  - Added approval status and action enums
  - Added comprehensive DTOs for approval workflows

#### Enhanced Services

- **ProductsService**
  - Added product variant management methods
  - Added `createWithVariants()` for creating products with variants
  - Added variant-specific CRUD operations
  - Added filtering by product type and active status

- **CustomersService**
  - Enhanced with new customer fields (dni, cuit)
  - Improved search and filtering capabilities
  - Added pagination support

- **BudgetsService** (Read-Only)
  - Enhanced filtering by status, customer, date range
  - Added comprehensive search capabilities
  - Added UBS field support
  - Maintained read-only nature for data integrity

#### SDK Enhancements

- Added `getConfig()` method to retrieve configuration (without API key)
- Added `getInfo()` method for comprehensive SDK information
- Added `testConnection()` method for API connectivity testing
- Enhanced configuration validation with timeout and retry limits
- Updated version to 1.1.0

### Changed

#### Breaking Changes

- **Budget Management**: Budgets are now explicitly read-only via API
  - Removed create, update, and delete methods from BudgetsService
  - Budget management must be done through the main Billoget application
  - This ensures data integrity and proper business logic enforcement

#### API Updates

- Updated all service methods to handle new response structures
- Enhanced error handling and response parsing
- Improved TypeScript type safety across all services

#### Documentation

- Completely updated README with comprehensive examples
- Added detailed usage guides for all new services
- Enhanced API reference documentation
- Added TypeScript usage examples

### Technical Improvements

- Enhanced HttpClient response handling
- Improved error messages and validation
- Better TypeScript type definitions
- Comprehensive test coverage for new features

### Migration Guide

#### From 1.0.0 to 1.1.0

**Budget Service Changes:**

```javascript
// ❌ No longer available (1.0.0)
await billoget.budgets.create(budgetData);
await billoget.budgets.update(id, updateData);
await billoget.budgets.delete(id);

// ✅ Use read-only methods (1.1.0)
const budgets = await billoget.budgets.list();
const budget = await billoget.budgets.get(id);
```

**New Services Usage:**

```javascript
// ✅ New in 1.1.0
const approvals = await billoget.budgetApprovals.getPendingApprovals();
const publicBudget = await billoget.ubs.getBudgetByToken("token");
const variants = await billoget.products.getVariants(productId);
```

**Enhanced Customer/Product Creation:**

```javascript
// ✅ Enhanced in 1.1.0
const customer = await billoget.customers.create({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  dni: 12345678, // New field
  cuit: "20-12345678-9", // New field
});

const product = await billoget.products.createWithVariants({
  productCode: "PROD-001", // Enhanced structure
  description: "Product Name",
  category: "Category",
  price: 100.0,
  variants: [
    // New capability
    {
      name: "Variant 1",
      price: 100.0,
      attributes: { size: "M", color: "Blue" },
    },
  ],
});
```

## [1.0.0] - 2025-07-06

### Added

- Initial release of Billoget SDK for Node.js
- Core services: Budgets, Customers, Products, Webhooks
- Full TypeScript support
- Comprehensive error handling
- Rate limiting support
- HTTP client with retry logic
- Complete API coverage for public endpoints

### Features

- **BudgetsService** - Full CRUD operations for budget management
- **CustomersService** - Complete customer management
- **ProductsService** - Product catalog management
- **WebhooksService** - Webhook testing and integration
- **TypeScript** - Full type definitions and IntelliSense support
- **Error Handling** - Structured error responses with HTTP status codes
- **Configuration** - Flexible SDK configuration options

### Documentation

- Comprehensive README with examples
- API reference documentation
- TypeScript usage guides
- Error handling examples

[1.1.0]: https://github.com/billoget/billoget-sdk/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/billoget/billoget-sdk/releases/tag/v1.0.0
