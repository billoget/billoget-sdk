import { HttpClient } from '../utils/http-client';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest, CustomerQueryParams, ApiResponse } from '../types';
export declare class CustomersService {
    private httpClient;
    private readonly basePath;
    constructor(httpClient: HttpClient);
    list(params?: CustomerQueryParams): Promise<ApiResponse<Customer[]>>;
    getById(id: string): Promise<ApiResponse<Customer>>;
    create(data: CreateCustomerRequest): Promise<ApiResponse<Customer>>;
    update(id: string, data: UpdateCustomerRequest): Promise<ApiResponse<Customer>>;
    delete(id: string): Promise<ApiResponse<void>>;
}
//# sourceMappingURL=customers.d.ts.map