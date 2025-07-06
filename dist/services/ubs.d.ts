import { HttpClient } from "../utils/http-client";
import { PublicBudget } from "../types";
/**
 * UBS (Unified Budgeting Standard) Service
 * Provides access to public budget endpoints using tokens
 * These endpoints don't require API key authentication
 */
export declare class UBSService {
    private httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get public budget by ID (without authentication)
     * Note: This endpoint may have limited access
     */
    getPublicBudget(id: number): Promise<PublicBudget | null>;
    /**
     * Get budget by public token (recommended method)
     * This is the main way to access budget information publicly
     */
    getBudgetByToken(token: string): Promise<PublicBudget | null>;
    /**
     * Debug token endpoint - useful for troubleshooting
     * Returns detailed information about token validation
     */
    debugToken(token: string): Promise<{
        token: string;
        budget?: {
            id: number;
            expired: boolean;
            hasCustomer: boolean;
            hasSeller: boolean;
            state: number;
            publicToken: string;
        };
        error?: string;
        debug: {
            timestamp: string;
            nodeEnv: string;
        };
    }>;
    /**
     * Confirm budget by token
     * Allows public confirmation of a budget
     */
    confirmBudget(token: string): Promise<{
        message: string;
        budget?: PublicBudget;
        paymentUrl?: string;
    }>;
    /**
     * Reject budget by token
     * Allows public rejection of a budget
     */
    rejectBudget(token: string): Promise<{
        message: string;
        budget?: PublicBudget;
    }>;
    /**
     * Validate token format and check if it exists
     * Useful for client-side validation before making API calls
     */
    validateTokenFormat(token: string): boolean;
    /**
     * Extract UBS information from a budget
     * Returns standardized UBS metadata
     */
    extractUBSInfo(budget: PublicBudget): {
        ubs_id?: string;
        ubs_version?: string;
        sign_track_id?: string;
        business_budget_id?: number;
        isUBSCompliant: boolean;
    };
    /**
     * Generate shareable URL for a budget
     * Useful for creating links to share budgets
     */
    generateShareableUrl(token: string, baseUrl?: string): string;
    /**
     * Check if budget is expired based on expiration date
     */
    isBudgetExpired(budget: PublicBudget): boolean;
    /**
     * Get budget status label in human-readable format
     */
    getBudgetStatusLabel(state: number): string;
}
//# sourceMappingURL=ubs.d.ts.map