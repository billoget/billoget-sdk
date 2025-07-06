import { HttpClient } from "../utils/http-client";
import { WebhookTestRequest, WebhookTestResponse } from "../types/query";
import { ApiResponse } from "../types";

export class WebhooksService {
  private readonly basePath = "/api/public/webhooks";

  constructor(private httpClient: HttpClient) {}

  async test(
    data: WebhookTestRequest
  ): Promise<ApiResponse<WebhookTestResponse>> {
    return this.httpClient.post<WebhookTestResponse>(
      `${this.basePath}/test`,
      data
    );
  }
}
