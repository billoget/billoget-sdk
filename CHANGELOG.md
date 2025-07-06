# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-15

### Added

- **Initial SDK Release** 🚀
  - Complete TypeScript SDK for Billoget Public API
  - Full support for Budgets, Customers, Products, and Webhooks APIs
  - Built-in authentication with API key management
  - Comprehensive error handling and retry logic
  - Clean architecture following SOLID principles

- **Core Features**
  - `BillogetSDK` main class with service initialization
  - `BudgetsService` for budget management (CRUD operations)
  - `CustomersService` for customer management (CRUD operations)
  - `ProductsService` for product catalog management (CRUD operations)
  - `WebhooksService` for webhook testing and integration
  - `HttpClient` with automatic authentication and error handling

- **TypeScript Support**
  - Complete type definitions for all API endpoints
  - Interfaces for requests, responses, and configuration
  - Generic types for API responses and pagination
  - Type-safe query parameters and filters

- **Developer Experience**
  - Comprehensive documentation with examples
  - Unit tests with Jest for all core functionality
  - ESLint and Prettier configuration for code quality
  - Automated build process with TypeScript compilation

- **API Coverage**
  - **Budgets API**: List, get, create, update, delete budgets
  - **Customers API**: List, get, create, update, delete customers
  - **Products API**: List, get, create, update, delete products
  - **Webhooks API**: Test webhook endpoints

- **Configuration Options**
  - Configurable base URL for different environments
  - Timeout and retry settings
  - Debug logging for development
  - API key validation and security

### Technical Implementation

- **Architecture**: Modular design with separate services and utilities
- **HTTP Client**: Axios-based with interceptors for auth and error handling
- **Error Handling**: Structured error responses with status codes
- **Testing**: Jest test suite with mocking for HTTP requests
- **Build**: TypeScript compilation with declaration files
- **Code Quality**: ESLint, Prettier, and strict TypeScript configuration

### Security

- API key validation with proper format checking
- Secure header management for authentication
- No sensitive data logging in production mode
- Rate limiting awareness with proper error handling

### Performance

- Efficient HTTP client with connection reuse
- Configurable timeout and retry mechanisms
- Minimal dependencies for reduced bundle size
- Tree-shakeable exports for optimal bundling
