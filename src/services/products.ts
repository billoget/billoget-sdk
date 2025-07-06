import { HttpClient } from "../utils/http-client";
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductQueryParams,
} from "../types/product";
import { ApiResponse } from "../types";

export class ProductsService {
  private readonly basePath = "/api/public/products";

  constructor(private httpClient: HttpClient) {}

  async list(params?: ProductQueryParams): Promise<ApiResponse<Product[]>> {
    return this.httpClient.get<Product[]>(this.basePath, params);
  }

  async getById(id: string): Promise<ApiResponse<Product>> {
    return this.httpClient.get<Product>(`${this.basePath}/${id}`);
  }

  async create(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    return this.httpClient.post<Product>(this.basePath, data);
  }

  async update(
    id: string,
    data: UpdateProductRequest
  ): Promise<ApiResponse<Product>> {
    return this.httpClient.put<Product>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`${this.basePath}/${id}`);
  }
}
