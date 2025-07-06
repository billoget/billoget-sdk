import { HttpClient } from "../utils/http-client";
import {
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerQuery,
  ApiResponse,
  PaginatedResponse,
} from "../types";

export class CustomersService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get all customers with pagination and search
   */
  async list(query: CustomerQuery = {}): Promise<PaginatedResponse<Customer>> {
    const params = new URLSearchParams();

    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.search) params.append("search", query.search);

    const url = `/api/public/customers${params.toString() ? `?${params.toString()}` : ""}`;
    const response =
      await this.httpClient.get<PaginatedResponse<Customer>>(url);
    return response.data;
  }

  /**
   * Get a specific customer by ID
   */
  async get(id: number): Promise<Customer> {
    const response = await this.httpClient.get<Customer>(
      `/api/public/customers/${id}`
    );
    return response.data;
  }

  /**
   * Create a new customer
   */
  async create(data: CreateCustomerDto): Promise<Customer> {
    const response = await this.httpClient.post<Customer>(
      "/api/public/customers",
      data
    );
    return response.data;
  }

  /**
   * Update an existing customer
   */
  async update(id: number, data: UpdateCustomerDto): Promise<Customer> {
    const response = await this.httpClient.put<Customer>(
      `/api/public/customers/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Delete a customer
   */
  async delete(id: number): Promise<void> {
    await this.httpClient.delete<void>(`/api/public/customers/${id}`);
  }

  /**
   * Search customers by name, email or phone
   */
  async search(
    searchTerm: string,
    query: Omit<CustomerQuery, "search"> = {}
  ): Promise<PaginatedResponse<Customer>> {
    return this.list({
      ...query,
      search: searchTerm,
    });
  }

  /**
   * Get customers with pagination (alias for list)
   */
  async paginate(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Customer>> {
    return this.list({ page, limit });
  }
}
