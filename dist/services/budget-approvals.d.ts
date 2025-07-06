import { HttpClient } from "../utils/http-client";
import { BudgetApproval, ApprovalConfig, BudgetApprover, CreateApprovalConfigDto, SubmitApprovalDto, ProcessApprovalDto, AssignApproverDto, ApprovalQuery, PaginatedResponse } from "../types";
export declare class BudgetApprovalsService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get approval configuration for the business
     */
    getConfig(): Promise<ApprovalConfig>;
    /**
     * Create or update approval configuration
     */
    createOrUpdateConfig(data: CreateApprovalConfigDto): Promise<ApprovalConfig>;
    /**
     * Get all budget approvers for the business
     */
    getApprovers(): Promise<BudgetApprover[]>;
    /**
     * Assign a user as budget approver
     */
    assignApprover(data: AssignApproverDto): Promise<BudgetApprover>;
    /**
     * Remove a budget approver
     */
    removeApprover(approverId: number): Promise<void>;
    /**
     * Submit a budget for approval
     */
    submitForApproval(data: SubmitApprovalDto): Promise<BudgetApproval>;
    /**
     * Process an approval (approve or reject)
     */
    processApproval(approvalId: number, data: ProcessApprovalDto): Promise<BudgetApproval>;
    /**
     * Get pending approvals
     */
    getPendingApprovals(userId?: number): Promise<BudgetApproval[]>;
    /**
     * Get approval history
     */
    getApprovalHistory(budgetId?: number): Promise<BudgetApproval[]>;
    /**
     * Check if user can approve budgets
     */
    canUserApprove(userId?: number): Promise<{
        canApprove: boolean;
    }>;
    /**
     * Get approval statistics
     */
    getApprovalStats(): Promise<{
        pending: number;
        approved: number;
        rejected: number;
        cancelled: number;
        total: number;
    }>;
    /**
     * Get approvals with filters and pagination
     */
    getApprovals(query?: ApprovalQuery): Promise<PaginatedResponse<BudgetApproval>>;
}
//# sourceMappingURL=budget-approvals.d.ts.map