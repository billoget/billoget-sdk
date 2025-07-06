// Base types
export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Budget types
export interface Budget {
  id: string;
  customerId: string;
  status: BudgetStatus;
  total: number;
  subtotal: number;
  tax: number;
  currency: string;
  validUntil: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  items?: BudgetItem[];
  metadata?: Record<string, any>;
}

export interface CreateBudgetRequest {
  customerId: string;
  items: CreateBudgetItem[];
  notes?: string;
  validUntil?: string;
  metadata?: Record<string, any>;
}

export interface UpdateBudgetRequest {
  status?: BudgetStatus;
  notes?: string;
  validUntil?: string;
  items?: CreateBudgetItem[];
}

export interface CreateBudgetItem {
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface BudgetItem extends CreateBudgetItem {
  id: string;
  total: number;
}

export type BudgetStatus = "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";

// Customer types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  taxId?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  taxId?: string;
  metadata?: Record<string, any>;
}

export interface UpdateCustomerRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  taxId?: string;
  metadata?: Record<string, any>;
}

// Re-export query types
export * from "./query";
