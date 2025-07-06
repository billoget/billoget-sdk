export interface BudgetQueryParams {
    page?: number;
    limit?: number;
    status?: string;
    customerId?: string;
    search?: string;
    minTotal?: number;
    maxTotal?: number;
    createdAfter?: string;
    createdBefore?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}
export interface CustomerQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}
export interface WebhookTestRequest {
    event: string;
    data: Record<string, any>;
}
export interface WebhookResponse {
    success: boolean;
    message: string;
    timestamp: string;
}
//# sourceMappingURL=query.d.ts.map