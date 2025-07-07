import { HttpClient } from "../utils/http-client";
import {
  Budget,
  BudgetQuery,
  PaginatedResponse,
  CreateBudgetRequest,
} from "../types";

export class BudgetsService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Create a new budget publicly (returns public URL)
   */
  async createPublic(budgetData: CreateBudgetRequest): Promise<{
    success: boolean;
    message: string;
    publicUrl: string;
    budgetId: number;
    publicToken: string;
  }> {
    const response = await this.httpClient.post<{
      success: boolean;
      message: string;
      publicUrl: string;
      budgetId: number;
      publicToken: string;
    }>("/api/budgets/public", budgetData);
    return response.data;
  }

  /**
   * Get all budgets with pagination and filters (READ ONLY)
   * Note: Budgets cannot be created/edited via API to maintain data integrity
   */
  async list(query: BudgetQuery = {}): Promise<PaginatedResponse<Budget>> {
    const params = new URLSearchParams();

    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.status !== undefined)
      params.append("status", query.status.toString());
    if (query.customerId)
      params.append("customerId", query.customerId.toString());
    if (query.search) params.append("search", query.search);
    if (query.startDate) params.append("startDate", query.startDate);
    if (query.endDate) params.append("endDate", query.endDate);

    const url = `/api/public/budgets${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await this.httpClient.get<PaginatedResponse<Budget>>(url);
    return response.data;
  }

  /**
   * Get a specific budget by ID (READ ONLY)
   */
  async get(id: number): Promise<Budget> {
    const response = await this.httpClient.get<Budget>(
      `/api/public/budgets/${id}`
    );
    return response.data;
  }

  /**
   * Search budgets by customer name, comments or budget ID
   */
  async search(
    searchTerm: string,
    query: Omit<BudgetQuery, "search"> = {}
  ): Promise<PaginatedResponse<Budget>> {
    return this.list({
      ...query,
      search: searchTerm,
    });
  }

  /**
   * Get budgets by customer ID
   */
  async getByCustomer(
    customerId: number,
    query: Omit<BudgetQuery, "customerId"> = {}
  ): Promise<PaginatedResponse<Budget>> {
    return this.list({
      ...query,
      customerId,
    });
  }

  /**
   * Get budgets by status
   */
  async getByStatus(
    status: number,
    query: Omit<BudgetQuery, "status"> = {}
  ): Promise<PaginatedResponse<Budget>> {
    return this.list({
      ...query,
      status,
    });
  }

  /**
   * Get budgets within a date range
   */
  async getByDateRange(
    startDate: string,
    endDate: string,
    query: Omit<BudgetQuery, "startDate" | "endDate"> = {}
  ): Promise<PaginatedResponse<Budget>> {
    return this.list({
      ...query,
      startDate,
      endDate,
    });
  }

  /**
   * Get budgets with pagination (alias for list)
   */
  async paginate(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Budget>> {
    return this.list({ page, limit });
  }

  // Note: Create, update, and delete methods are intentionally omitted
  // Budgets should only be managed through the main Billoget application
  // to maintain data integrity and business logic
}
