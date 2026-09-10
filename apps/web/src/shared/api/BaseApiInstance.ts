import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IApiConfig } from './types/IApiConfig';

abstract class BaseApiInstance {
  protected axiosInstance: AxiosInstance;

  constructor({ baseURL, timeout = 1000, headers = {} }: IApiConfig) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      headers,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  protected abstract initializeRequestInterceptor(): void;

  protected abstract initializeResponseInterceptor(): void;

  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public get<T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

export default BaseApiInstance;
