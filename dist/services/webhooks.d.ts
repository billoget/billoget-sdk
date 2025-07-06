import { HttpClient } from "../utils/http-client";
import { WebhookTestRequest, WebhookTestResponse } from "../types/query";
import { ApiResponse } from "../types";
export declare class WebhooksService {
    private httpClient;
    private readonly basePath;
    constructor(httpClient: HttpClient);
    test(data: WebhookTestRequest): Promise<ApiResponse<WebhookTestResponse>>;
}
//# sourceMappingURL=webhooks.d.ts.map