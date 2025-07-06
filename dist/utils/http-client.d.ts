import { BillogetConfig, RequestConfig } from "../types/config";
import { ApiResponse } from "../types";
export declare class HttpClient {
    private client;
    private config;
    constructor(config: BillogetConfig);
    private createAxiosInstance;
    private setupInterceptors;
    request<T>(config: RequestConfig): Promise<ApiResponse<T>>;
    get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
    post<T>(url: string, data?: any): Promise<ApiResponse<T>>;
    put<T>(url: string, data?: any): Promise<ApiResponse<T>>;
    delete<T>(url: string): Promise<ApiResponse<T>>;
}
//# sourceMappingURL=http-client.d.ts.map