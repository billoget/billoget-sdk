"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetsService = void 0;
class BudgetsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * Create a new budget publicly (returns public URL)
     */
    async createPublic(budgetData) {
        const response = await this.httpClient.post("/api/budgets/public", budgetData);
        return response.data;
    }
    /**
     * Get all budgets with pagination and filters (READ ONLY)
     * Note: Budgets cannot be created/edited via API to maintain data integrity
     */
    async list(query = {}) {
        const params = new URLSearchParams();
        if (query.page)
            params.append("page", query.page.toString());
        if (query.limit)
            params.append("limit", query.limit.toString());
        if (query.status !== undefined)
            params.append("status", query.status.toString());
        if (query.customerId)
            params.append("customerId", query.customerId.toString());
        if (query.search)
            params.append("search", query.search);
        if (query.startDate)
            params.append("startDate", query.startDate);
        if (query.endDate)
            params.append("endDate", query.endDate);
        const url = `/api/public/budgets${params.toString() ? `?${params.toString()}` : ""}`;
        const response = await this.httpClient.get(url);
        return response.data;
    }
    /**
     * Get a specific budget by ID (READ ONLY)
     */
    async get(id) {
        const response = await this.httpClient.get(`/api/public/budgets/${id}`);
        return response.data;
    }
    /**
     * Search budgets by customer name, comments or budget ID
     */
    async search(searchTerm, query = {}) {
        return this.list({
            ...query,
            search: searchTerm,
        });
    }
    /**
     * Get budgets by customer ID
     */
    async getByCustomer(customerId, query = {}) {
        return this.list({
            ...query,
            customerId,
        });
    }
    /**
     * Get budgets by status
     */
    async getByStatus(status, query = {}) {
        return this.list({
            ...query,
            status,
        });
    }
    /**
     * Get budgets within a date range
     */
    async getByDateRange(startDate, endDate, query = {}) {
        return this.list({
            ...query,
            startDate,
            endDate,
        });
    }
    /**
     * Get budgets with pagination (alias for list)
     */
    async paginate(page = 1, limit = 10) {
        return this.list({ page, limit });
    }
}
exports.BudgetsService = BudgetsService;
//# sourceMappingURL=budgets.js.map