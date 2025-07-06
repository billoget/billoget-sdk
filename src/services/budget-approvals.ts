import { HttpClient } from "../utils/http-client";
import {
  BudgetApproval,
  ApprovalConfig,
  BudgetApprover,
  CreateApprovalConfigDto,
  SubmitApprovalDto,
  ProcessApprovalDto,
  AssignApproverDto,
  ApprovalQuery,
  PaginatedResponse,
} from "../types";

export class BudgetApprovalsService {
  constructor(private httpClient: HttpClient) {}

  // Configuration methods

  /**
   * Get approval configuration for the business
   */
  async getConfig(): Promise<ApprovalConfig> {
    const response = await this.httpClient.get<ApprovalConfig>(
      "/api/public/budget-approvals/config"
    );
    return response.data;
  }

  /**
   * Create or update approval configuration
   */
  async createOrUpdateConfig(
    data: CreateApprovalConfigDto
  ): Promise<ApprovalConfig> {
    const response = await this.httpClient.post<ApprovalConfig>(
      "/api/public/budget-approvals/config",
      data
    );
    return response.data;
  }

  // Approvers management

  /**
   * Get all budget approvers for the business
   */
  async getApprovers(): Promise<BudgetApprover[]> {
    const response = await this.httpClient.get<BudgetApprover[]>(
      "/api/public/budget-approvals/approvers"
    );
    return response.data;
  }

  /**
   * Assign a user as budget approver
   */
  async assignApprover(data: AssignApproverDto): Promise<BudgetApprover> {
    const response = await this.httpClient.post<BudgetApprover>(
      "/api/public/budget-approvals/approvers",
      data
    );
    return response.data;
  }

  /**
   * Remove a budget approver
   */
  async removeApprover(approverId: number): Promise<void> {
    await this.httpClient.delete<void>(
      `/api/public/budget-approvals/approvers/${approverId}`
    );
  }

  // Approval workflow methods

  /**
   * Submit a budget for approval
   */
  async submitForApproval(data: SubmitApprovalDto): Promise<BudgetApproval> {
    const response = await this.httpClient.post<BudgetApproval>(
      "/api/public/budget-approvals/submit",
      data
    );
    return response.data;
  }

  /**
   * Process an approval (approve or reject)
   */
  async processApproval(
    approvalId: number,
    data: ProcessApprovalDto
  ): Promise<BudgetApproval> {
    const response = await this.httpClient.post<BudgetApproval>(
      `/api/public/budget-approvals/${approvalId}/process`,
      data
    );
    return response.data;
  }

  // Query methods

  /**
   * Get pending approvals
   */
  async getPendingApprovals(userId?: number): Promise<BudgetApproval[]> {
    const url = userId
      ? `/api/public/budget-approvals/pending?userId=${userId}`
      : "/api/public/budget-approvals/pending";
    const response = await this.httpClient.get<BudgetApproval[]>(url);
    return response.data;
  }

  /**
   * Get approval history
   */
  async getApprovalHistory(budgetId?: number): Promise<BudgetApproval[]> {
    const url = budgetId
      ? `/api/public/budget-approvals/history?budgetId=${budgetId}`
      : "/api/public/budget-approvals/history";
    const response = await this.httpClient.get<BudgetApproval[]>(url);
    return response.data;
  }

  /**
   * Check if user can approve budgets
   */
  async canUserApprove(userId?: number): Promise<{ canApprove: boolean }> {
    const url = userId
      ? `/api/public/budget-approvals/can-approve?userId=${userId}`
      : "/api/public/budget-approvals/can-approve";
    const response = await this.httpClient.get<{ canApprove: boolean }>(url);
    return response.data;
  }

  /**
   * Get approval statistics
   */
  async getApprovalStats(): Promise<{
    pending: number;
    approved: number;
    rejected: number;
    cancelled: number;
    total: number;
  }> {
    const response = await this.httpClient.get<{
      pending: number;
      approved: number;
      rejected: number;
      cancelled: number;
      total: number;
    }>("/api/public/budget-approvals/stats");
    return response.data;
  }

  /**
   * Get approvals with filters and pagination
   */
  async getApprovals(
    query: ApprovalQuery = {}
  ): Promise<PaginatedResponse<BudgetApproval>> {
    const params = new URLSearchParams();

    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.status) params.append("status", query.status);
    if (query.budgetId) params.append("budgetId", query.budgetId.toString());
    if (query.userId) params.append("userId", query.userId.toString());

    const url = `/api/public/budget-approvals${params.toString() ? `?${params.toString()}` : ""}`;
    const response =
      await this.httpClient.get<PaginatedResponse<BudgetApproval>>(url);
    return response.data;
  }
}
