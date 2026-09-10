import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import BaseApiInstance from './BaseApiInstance';
import { EXAMPLE_API } from './apiUtils';

class DemoApi extends BaseApiInstance {
  constructor() {
    super(EXAMPLE_API.DEFAULT_REQUEST_CONFIG);
  }

  protected initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = sessionStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  protected initializeResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      (error) => Promise.reject(error),
    );
  }
}

export default DemoApi;
