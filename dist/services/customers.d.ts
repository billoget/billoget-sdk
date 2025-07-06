import { HttpClient } from "../utils/http-client";
import { Customer, CreateCustomerDto, UpdateCustomerDto, CustomerQuery, PaginatedResponse } from "../types";
export declare class CustomersService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get all customers with pagination and search
     */
    list(query?: CustomerQuery): Promise<PaginatedResponse<Customer>>;
    /**
     * Get a specific customer by ID
     */
    get(id: number): Promise<Customer>;
    /**
     * Create a new customer
     */
    create(data: CreateCustomerDto): Promise<Customer>;
    /**
     * Update an existing customer
     */
    update(id: number, data: UpdateCustomerDto): Promise<Customer>;
    /**
     * Delete a customer
     */
    delete(id: number): Promise<void>;
    /**
     * Search customers by name, email or phone
     */
    search(searchTerm: string, query?: Omit<CustomerQuery, "search">): Promise<PaginatedResponse<Customer>>;
    /**
     * Get customers with pagination (alias for list)
     */
    paginate(page?: number, limit?: number): Promise<PaginatedResponse<Customer>>;
}
//# sourceMappingURL=customers.d.ts.map