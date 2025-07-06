import { ProductType, BudgetState, ApprovalStatus } from "./index";

// Base pagination interface
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

// Budget query parameters
export interface BudgetQuery extends PaginationQuery {
  status?: BudgetState;
  customerId?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}

// Customer query parameters
export interface CustomerQuery extends PaginationQuery {
  search?: string;
}

// Product query parameters
export interface ProductQuery extends PaginationQuery {
  category?: string;
  search?: string;
  type?: ProductType;
  isActive?: boolean;
}

// Product variant query parameters
export interface ProductVariantQuery extends PaginationQuery {
  productId?: number;
  isActive?: boolean;
}

// Budget approval query parameters
export interface ApprovalQuery extends PaginationQuery {
  status?: ApprovalStatus;
  budgetId?: number;
  userId?: number;
}

// Webhook test request
export interface WebhookTestRequest {
  event: string;
  data: Record<string, any>;
}

// Webhook test response
export interface WebhookTestResponse {
  message: string;
  timestamp: string;
  apiKey: string;
}
