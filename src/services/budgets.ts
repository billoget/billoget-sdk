import { HttpClient } from "../utils/http-client";
import {
  Budget,
  CreateBudgetRequest,
  UpdateBudgetRequest,
  BudgetQueryParams,
  ApiResponse,
} from "../types";

export class BudgetsService {
  private readonly basePath = "/api/public/budgets";

  constructor(private httpClient: HttpClient) {}

  async list(params?: BudgetQueryParams): Promise<ApiResponse<Budget[]>> {
    return this.httpClient.get<Budget[]>(this.basePath, params);
  }

  async getById(id: string): Promise<ApiResponse<Budget>> {
    return this.httpClient.get<Budget>(`${this.basePath}/${id}`);
  }

  async create(data: CreateBudgetRequest): Promise<ApiResponse<Budget>> {
    return this.httpClient.post<Budget>(this.basePath, data);
  }

  async update(
    id: string,
    data: UpdateBudgetRequest
  ): Promise<ApiResponse<Budget>> {
    return this.httpClient.put<Budget>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`${this.basePath}/${id}`);
  }
}
