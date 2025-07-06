import { HttpClient } from '../utils/http-client';
import { 
  Customer, 
  CreateCustomerRequest, 
  UpdateCustomerRequest, 
  CustomerQueryParams,
  ApiResponse 
} from '../types';

export class CustomersService {
  private readonly basePath = '/api/public/customers';

  constructor(private httpClient: HttpClient) {}

  async list(params?: CustomerQueryParams): Promise<ApiResponse<Customer[]>> {
    return this.httpClient.get<Customer[]>(this.basePath, params);
  }

  async getById(id: string): Promise<ApiResponse<Customer>> {
    return this.httpClient.get<Customer>(`${this.basePath}/${id}`);
  }

  async create(data: CreateCustomerRequest): Promise<ApiResponse<Customer>> {
    return this.httpClient.post<Customer>(this.basePath, data);
  }

  async update(id: string, data: UpdateCustomerRequest): Promise<ApiResponse<Customer>> {
    return this.httpClient.put<Customer>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`${this.basePath}/${id}`);
  }
} 