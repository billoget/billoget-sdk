import { HttpClient } from "../utils/http-client";
import { Budget, BudgetQuery, PaginatedResponse } from "../types";
export declare class BudgetsService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get all budgets with pagination and filters (READ ONLY)
     * Note: Budgets cannot be created/edited via API to maintain data integrity
     */
    list(query?: BudgetQuery): Promise<PaginatedResponse<Budget>>;
    /**
     * Get a specific budget by ID (READ ONLY)
     */
    get(id: number): Promise<Budget>;
    /**
     * Search budgets by customer name, comments or budget ID
     */
    search(searchTerm: string, query?: Omit<BudgetQuery, "search">): Promise<PaginatedResponse<Budget>>;
    /**
     * Get budgets by customer ID
     */
    getByCustomer(customerId: number, query?: Omit<BudgetQuery, "customerId">): Promise<PaginatedResponse<Budget>>;
    /**
     * Get budgets by status
     */
    getByStatus(status: number, query?: Omit<BudgetQuery, "status">): Promise<PaginatedResponse<Budget>>;
    /**
     * Get budgets within a date range
     */
    getByDateRange(startDate: string, endDate: string, query?: Omit<BudgetQuery, "startDate" | "endDate">): Promise<PaginatedResponse<Budget>>;
    /**
     * Get budgets with pagination (alias for list)
     */
    paginate(page?: number, limit?: number): Promise<PaginatedResponse<Budget>>;
}
//# sourceMappingURL=budgets.d.ts.map