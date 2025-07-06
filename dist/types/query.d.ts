import { ProductType, BudgetState, ApprovalStatus } from "./index";
export interface PaginationQuery {
    page?: number;
    limit?: number;
}
export interface BudgetQuery extends PaginationQuery {
    status?: BudgetState;
    customerId?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
}
export interface CustomerQuery extends PaginationQuery {
    search?: string;
}
export interface ProductQuery extends PaginationQuery {
    category?: string;
    search?: string;
    type?: ProductType;
    isActive?: boolean;
}
export interface ProductVariantQuery extends PaginationQuery {
    productId?: number;
    isActive?: boolean;
}
export interface ApprovalQuery extends PaginationQuery {
    status?: ApprovalStatus;
    budgetId?: number;
    userId?: number;
}
export interface WebhookTestRequest {
    event: string;
    data: Record<string, any>;
}
export interface WebhookTestResponse {
    message: string;
    timestamp: string;
    apiKey: string;
}
//# sourceMappingURL=query.d.ts.map