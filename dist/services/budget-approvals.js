"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetApprovalsService = void 0;
class BudgetApprovalsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    // Configuration methods
    /**
     * Get approval configuration for the business
     */
    async getConfig() {
        const response = await this.httpClient.get("/api/public/budget-approvals/config");
        return response.data;
    }
    /**
     * Create or update approval configuration
     */
    async createOrUpdateConfig(data) {
        const response = await this.httpClient.post("/api/public/budget-approvals/config", data);
        return response.data;
    }
    // Approvers management
    /**
     * Get all budget approvers for the business
     */
    async getApprovers() {
        const response = await this.httpClient.get("/api/public/budget-approvals/approvers");
        return response.data;
    }
    /**
     * Assign a user as budget approver
     */
    async assignApprover(data) {
        const response = await this.httpClient.post("/api/public/budget-approvals/approvers", data);
        return response.data;
    }
    /**
     * Remove a budget approver
     */
    async removeApprover(approverId) {
        await this.httpClient.delete(`/api/public/budget-approvals/approvers/${approverId}`);
    }
    // Approval workflow methods
    /**
     * Submit a budget for approval
     */
    async submitForApproval(data) {
        const response = await this.httpClient.post("/api/public/budget-approvals/submit", data);
        return response.data;
    }
    /**
     * Process an approval (approve or reject)
     */
    async processApproval(approvalId, data) {
        const response = await this.httpClient.post(`/api/public/budget-approvals/${approvalId}/process`, data);
        return response.data;
    }
    // Query methods
    /**
     * Get pending approvals
     */
    async getPendingApprovals(userId) {
        const url = userId
            ? `/api/public/budget-approvals/pending?userId=${userId}`
            : "/api/public/budget-approvals/pending";
        const response = await this.httpClient.get(url);
        return response.data;
    }
    /**
     * Get approval history
     */
    async getApprovalHistory(budgetId) {
        const url = budgetId
            ? `/api/public/budget-approvals/history?budgetId=${budgetId}`
            : "/api/public/budget-approvals/history";
        const response = await this.httpClient.get(url);
        return response.data;
    }
    /**
     * Check if user can approve budgets
     */
    async canUserApprove(userId) {
        const url = userId
            ? `/api/public/budget-approvals/can-approve?userId=${userId}`
            : "/api/public/budget-approvals/can-approve";
        const response = await this.httpClient.get(url);
        return response.data;
    }
    /**
     * Get approval statistics
     */
    async getApprovalStats() {
        const response = await this.httpClient.get("/api/public/budget-approvals/stats");
        return response.data;
    }
    /**
     * Get approvals with filters and pagination
     */
    async getApprovals(query = {}) {
        const params = new URLSearchParams();
        if (query.page)
            params.append("page", query.page.toString());
        if (query.limit)
            params.append("limit", query.limit.toString());
        if (query.status)
            params.append("status", query.status);
        if (query.budgetId)
            params.append("budgetId", query.budgetId.toString());
        if (query.userId)
            params.append("userId", query.userId.toString());
        const url = `/api/public/budget-approvals${params.toString() ? `?${params.toString()}` : ""}`;
        const response = await this.httpClient.get(url);
        return response.data;
    }
}
exports.BudgetApprovalsService = BudgetApprovalsService;
//# sourceMappingURL=budget-approvals.js.map