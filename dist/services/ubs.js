"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UBSService = void 0;
/**
 * UBS (Unified Budgeting Standard) Service
 * Provides access to public budget endpoints using tokens
 * These endpoints don't require API key authentication
 */
class UBSService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * Get public budget by ID (without authentication)
     * Note: This endpoint may have limited access
     */
    async getPublicBudget(id) {
        try {
            const response = await this.httpClient.get(`/api/public/budgets/public/${id}`);
            return response.data;
        }
        catch (error) {
            if (error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }
    /**
     * Get budget by public token (recommended method)
     * This is the main way to access budget information publicly
     */
    async getBudgetByToken(token) {
        try {
            const response = await this.httpClient.get(`/api/public/budgets/token/${token}`);
            return response.data;
        }
        catch (error) {
            if (error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }
    /**
     * Debug token endpoint - useful for troubleshooting
     * Returns detailed information about token validation
     */
    async debugToken(token) {
        const response = await this.httpClient.get(`/api/public/budgets/debug/token/${token}`);
        return response.data;
    }
    /**
     * Confirm budget by token
     * Allows public confirmation of a budget
     */
    async confirmBudget(token) {
        const response = await this.httpClient.post(`/api/public/budgets/token/${token}/confirm`);
        return response.data;
    }
    /**
     * Reject budget by token
     * Allows public rejection of a budget
     */
    async rejectBudget(token) {
        const response = await this.httpClient.post(`/api/public/budgets/token/${token}/reject`);
        return response.data;
    }
    /**
     * Validate token format and check if it exists
     * Useful for client-side validation before making API calls
     */
    validateTokenFormat(token) {
        // Basic token format validation
        // Tokens are typically alphanumeric with specific length
        if (!token || typeof token !== "string") {
            return false;
        }
        // Remove whitespace
        token = token.trim();
        // Check if token is not empty and has reasonable length
        if (token.length === 0 || token.length > 100) {
            return false;
        }
        // Check if token contains only valid characters (alphanumeric, hyphens, underscores)
        const validTokenPattern = /^[a-zA-Z0-9_-]+$/;
        return validTokenPattern.test(token);
    }
    /**
     * Extract UBS information from a budget
     * Returns standardized UBS metadata
     */
    extractUBSInfo(budget) {
        return {
            ubs_id: budget.ubs_id,
            ubs_version: budget.ubs_version || "1.0",
            sign_track_id: budget.sign_track_id,
            business_budget_id: budget.business_budget_id,
            isUBSCompliant: !!(budget.ubs_id && budget.ubs_version),
        };
    }
    /**
     * Generate shareable URL for a budget
     * Useful for creating links to share budgets
     */
    generateShareableUrl(token, baseUrl) {
        const base = baseUrl || "https://billoget.com";
        return `${base}/budget/${token}`;
    }
    /**
     * Check if budget is expired based on expiration date
     */
    isBudgetExpired(budget) {
        if (!budget.expirationDate) {
            return false;
        }
        const expirationDate = new Date(budget.expirationDate);
        const now = new Date();
        return expirationDate < now;
    }
    /**
     * Get budget status label in human-readable format
     */
    getBudgetStatusLabel(state) {
        switch (state) {
            case 0:
                return "Generated";
            case 1:
                return "Approved";
            case 2:
                return "Rejected";
            default:
                return "Unknown";
        }
    }
}
exports.UBSService = UBSService;
//# sourceMappingURL=ubs.js.map