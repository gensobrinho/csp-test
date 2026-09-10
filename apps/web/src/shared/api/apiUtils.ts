import { IApiConfig } from './types/IApiConfig';

export const DEFAULT_CONFIG_EXAMPLE_API: IApiConfig = {
  // baseURL: process.env.EXPO_PUBLIC_EXAMPLE_API_URL as string,
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  timeout: 5000,
};

export const EXAMPLE_API = {
    DEFAULT_REQUEST_CONFIG: DEFAULT_CONFIG_EXAMPLE_API,
    ENTRY_POINTS: {
        GET_TOKEN: '/token',
    }
}