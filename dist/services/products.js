"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
class ProductsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.basePath = "/api/public/products";
    }
    async list(params) {
        return this.httpClient.get(this.basePath, params);
    }
    async getById(id) {
        return this.httpClient.get(`${this.basePath}/${id}`);
    }
    async create(data) {
        return this.httpClient.post(this.basePath, data);
    }
    async update(id, data) {
        return this.httpClient.put(`${this.basePath}/${id}`, data);
    }
    async delete(id) {
        return this.httpClient.delete(`${this.basePath}/${id}`);
    }
}
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.js.map