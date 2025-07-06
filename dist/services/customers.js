"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
class CustomersService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.basePath = '/api/public/customers';
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
exports.CustomersService = CustomersService;
//# sourceMappingURL=customers.js.map