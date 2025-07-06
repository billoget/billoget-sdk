// SDK Configuration
export interface BillogetConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

export interface RequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}
