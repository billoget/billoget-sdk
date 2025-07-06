import { HttpClient } from "../utils/http-client";
import { WebhookTestRequest, WebhookResponse } from "../types/query";
import { ApiResponse } from "../types";

export class WebhooksService {
  private readonly basePath = "/api/public/webhooks";

  constructor(private httpClient: HttpClient) {}

  async test(data: WebhookTestRequest): Promise<ApiResponse<WebhookResponse>> {
    return this.httpClient.post<WebhookResponse>(`${this.basePath}/test`, data);
  }
}
