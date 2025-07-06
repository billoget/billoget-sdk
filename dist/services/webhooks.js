"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksService = void 0;
class WebhooksService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.basePath = "/api/public/webhooks";
    }
    async test(data) {
        return this.httpClient.post(`${this.basePath}/test`, data);
    }
}
exports.WebhooksService = WebhooksService;
//# sourceMappingURL=webhooks.js.map