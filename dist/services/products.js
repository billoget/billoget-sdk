"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
class ProductsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.basePath = "/api/public/products";
    }
    /**
     * Get all products with pagination and filters
     */
    async list(query = {}) {
        const params = new URLSearchParams();
        if (query.page)
            params.append("page", query.page.toString());
        if (query.limit)
            params.append("limit", query.limit.toString());
        if (query.category)
            params.append("category", query.category);
        if (query.search)
            params.append("search", query.search);
        if (query.type)
            params.append("type", query.type);
        if (query.isActive !== undefined)
            params.append("isActive", query.isActive.toString());
        const url = `${this.basePath}${params.toString() ? `?${params.toString()}` : ""}`;
        const response = await this.httpClient.get(url);
        return response.data;
    }
    /**
     * Get a specific product by ID
     */
    async get(id) {
        const response = await this.httpClient.get(`${this.basePath}/${id}`);
        return response.data;
    }
    /**
     * Create a new product
     */
    async create(data) {
        const response = await this.httpClient.post(this.basePath, data);
        return response.data;
    }
    /**
     * Create a product with variants
     */
    async createWithVariants(data) {
        const response = await this.httpClient.post(`${this.basePath}/with-variants`, data);
        return response.data;
    }
    /**
     * Update an existing product
     */
    async update(id, data) {
        const response = await this.httpClient.put(`${this.basePath}/${id}`, data);
        return response.data;
    }
    /**
     * Delete a product
     */
    async delete(id) {
        await this.httpClient.delete(`${this.basePath}/${id}`);
    }
    /**
     * Search products by name, description, SKU or category
     */
    async search(searchTerm, query = {}) {
        return this.list({
            ...query,
            search: searchTerm,
        });
    }
    /**
     * Get products by category
     */
    async getByCategory(category, query = {}) {
        return this.list({
            ...query,
            category,
        });
    }
    /**
     * Get products with pagination (alias for list)
     */
    async paginate(page = 1, limit = 10) {
        return this.list({ page, limit });
    }
    // Product Variants methods
    /**
     * Get all variants for a product
     */
    async getVariants(productId, query = {}) {
        const params = new URLSearchParams();
        if (query.page)
            params.append("page", query.page.toString());
        if (query.limit)
            params.append("limit", query.limit.toString());
        if (query.isActive !== undefined)
            params.append("isActive", query.isActive.toString());
        const url = `${this.basePath}/${productId}/variants${params.toString() ? `?${params.toString()}` : ""}`;
        const response = await this.httpClient.get(url);
        return response.data;
    }
    /**
     * Get active variants for a product
     */
    async getActiveVariants(productId, query = {}) {
        return this.getVariants(productId, {
            ...query,
            isActive: true,
        });
    }
    /**
     * Get a specific product variant by ID
     */
    async getVariant(variantId) {
        const response = await this.httpClient.get(`/api/public/product-variants/${variantId}`);
        return response.data;
    }
    /**
     * Create a new product variant
     */
    async createVariant(data) {
        const response = await this.httpClient.post("/api/public/product-variants", data);
        return response.data;
    }
    /**
     * Update an existing product variant
     */
    async updateVariant(variantId, data) {
        const response = await this.httpClient.put(`/api/public/product-variants/${variantId}`, data);
        return response.data;
    }
    /**
     * Delete a product variant
     */
    async deleteVariant(variantId) {
        await this.httpClient.delete(`/api/public/product-variants/${variantId}`);
    }
}
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.js.map