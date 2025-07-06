import { HttpClient } from "../utils/http-client";
import { Budget, CreateBudgetRequest, UpdateBudgetRequest, BudgetQueryParams, ApiResponse } from "../types";
export declare class BudgetsService {
    private httpClient;
    private readonly basePath;
    constructor(httpClient: HttpClient);
    list(params?: BudgetQueryParams): Promise<ApiResponse<Budget[]>>;
    getById(id: string): Promise<ApiResponse<Budget>>;
    create(data: CreateBudgetRequest): Promise<ApiResponse<Budget>>;
    update(id: string, data: UpdateBudgetRequest): Promise<ApiResponse<Budget>>;
    delete(id: string): Promise<ApiResponse<void>>;
}
//# sourceMappingURL=budgets.d.ts.map