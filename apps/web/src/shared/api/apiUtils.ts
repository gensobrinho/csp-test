import { IApiConfig } from './types/IApiConfig';

export const DEFAULT_CONFIG_EXAMPLE_API: IApiConfig = {
  baseURL: import.meta.env.VITE_API_URL ?? '',
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
  },
};

export const AUTH_API = {
  ENTRY_POINTS: {
    POST_LOGIN: '/auth/login',
    GET_USER_INFO: '/auth/me',
  },
} as const;

export const KANBAN_API = {
  ENTRY_POINTS: {
    GET_DEMANDS: '/demands',
    CREATE_DEMAND: '/demands',
    UPDATE_DEMAND: '/demands',
    DELETE_DEMAND: '/demands',
  },
} as const;

export const USER_API = {
  ENTRY_POINTS: {
    GET_USERS: '/users',
    CREATE_USER: '/users',
    UPDATE_USER: '/users',
    DELETE_USER: '/users',
  },
} as const;