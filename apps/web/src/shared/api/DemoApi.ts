import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import BaseApiInstance from './BaseApiInstance';
import { EXAMPLE_API } from './apiUtils';

class MentorApi extends BaseApiInstance {
  constructor() {
    super(EXAMPLE_API.DEFAULT_REQUEST_CONFIG);
  }

  protected initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const token = await this.getToken();
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  protected initializeResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
}

export default MentorApi;
