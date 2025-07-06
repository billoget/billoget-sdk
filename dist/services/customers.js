"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
class CustomersService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * Get all customers with pagination and search
     */
    async list(query = {}) {
        const params = new URLSearchParams();
        if (query.page)
            params.append("page", query.page.toString());
        if (query.limit)
            params.append("limit", query.limit.toString());
        if (query.search)
            params.append("search", query.search);
        const url = `/api/public/customers${params.toString() ? `?${params.toString()}` : ""}`;
        const response = await this.httpClient.get(url);
        return response.data;
    }
    /**
     * Get a specific customer by ID
     */
    async get(id) {
        const response = await this.httpClient.get(`/api/public/customers/${id}`);
        return response.data;
    }
    /**
     * Create a new customer
     */
    async create(data) {
        const response = await this.httpClient.post("/api/public/customers", data);
        return response.data;
    }
    /**
     * Update an existing customer
     */
    async update(id, data) {
        const response = await this.httpClient.put(`/api/public/customers/${id}`, data);
        return response.data;
    }
    /**
     * Delete a customer
     */
    async delete(id) {
        await this.httpClient.delete(`/api/public/customers/${id}`);
    }
    /**
     * Search customers by name, email or phone
     */
    async search(searchTerm, query = {}) {
        return this.list({
            ...query,
            search: searchTerm,
        });
    }
    /**
     * Get customers with pagination (alias for list)
     */
    async paginate(page = 1, limit = 10) {
        return this.list({ page, limit });
    }
}
exports.CustomersService = CustomersService;
//# sourceMappingURL=customers.js.map