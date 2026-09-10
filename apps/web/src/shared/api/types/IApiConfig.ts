export interface IApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}
