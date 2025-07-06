"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
class HttpClient {
    constructor(config) {
        this.config = config;
        this.client = this.createAxiosInstance();
    }
    createAxiosInstance() {
        const instance = axios_1.default.create({
            baseURL: this.config.baseUrl || "https://api.billoget.com",
            timeout: this.config.timeout || 30000,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.config.apiKey}`,
                "User-Agent": "billoget-sdk/1.0.0",
            },
        });
        this.setupInterceptors(instance);
        return instance;
    }
    setupInterceptors(instance) {
        instance.interceptors.request.use((config) => {
            if (this.config.debug) {
                console.log(`[Billoget SDK] ${config.method?.toUpperCase()} ${config.url}`);
            }
            return config;
        }, (error) => Promise.reject(error));
        instance.interceptors.response.use((response) => response, (error) => {
            const apiError = {
                message: error.response?.data?.message || error.message,
                statusCode: error.response?.status || 500,
                error: error.response?.data?.error,
            };
            return Promise.reject(apiError);
        });
    }
    async request(config) {
        const axiosConfig = {
            method: config.method,
            url: config.url,
            data: config.data,
            params: config.params,
            headers: config.headers,
        };
        const response = await this.client.request(axiosConfig);
        return response.data;
    }
    async get(url, params) {
        return this.request({ method: "GET", url, params });
    }
    async post(url, data) {
        return this.request({ method: "POST", url, data });
    }
    async put(url, data) {
        return this.request({ method: "PUT", url, data });
    }
    async delete(url) {
        return this.request({ method: "DELETE", url });
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=http-client.js.map