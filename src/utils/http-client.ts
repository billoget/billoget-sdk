import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BillogetConfig, RequestConfig } from "../types/config";
import { ApiError, ApiResponse } from "../types";

export class HttpClient {
  private client: AxiosInstance;
  private config: BillogetConfig;

  constructor(config: BillogetConfig) {
    this.config = config;
    this.client = this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: this.config.baseUrl || "https://api.billoget.com/v1",
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

  private setupInterceptors(instance: AxiosInstance): void {
    instance.interceptors.request.use(
      (config) => {
        if (this.config.debug) {
          console.log(
            `[Billoget SDK] ${config.method?.toUpperCase()} ${config.url}`
          );
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message,
          statusCode: error.response?.status || 500,
          error: error.response?.data?.error,
        };
        return Promise.reject(apiError);
      }
    );
  }

  async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      method: config.method,
      url: config.url,
      data: config.data,
      params: config.params,
      headers: config.headers,
    };

    const response: AxiosResponse<ApiResponse<T>> =
      await this.client.request(axiosConfig);
    return response.data;
  }

  async get<T>(
    url: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "GET", url, params });
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "POST", url, data });
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "PUT", url, data });
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>({ method: "DELETE", url });
  }
}
