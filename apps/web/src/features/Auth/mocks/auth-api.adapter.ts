import type { AxiosAdapter, AxiosResponse } from 'axios';
import { AUTH_API } from '@shared/api';
import { MOCK_ACCOUNTS } from './auth-credentials.mock';
import { AuthError } from '../types/AuthError';

const MOCK_REQUEST_DELAY_MS = 300;

export const authMockAdapter: AxiosAdapter = async (config) => {
  await new Promise<void>((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));
  let data: unknown;

  if (config.method === 'post' && config.url === AUTH_API.ENTRY_POINTS.POST_LOGIN) {
    const body: unknown = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    if (!body || typeof body !== 'object' || !('username' in body) || !('password' in body)) {
      throw new AuthError('invalidCredentials');
    }
    const account = MOCK_ACCOUNTS.find(
      (item) => item.username === body.username && item.password === body.password,
    );
    if (!account) {
      throw new AuthError('invalidCredentials');
    }
    data = { accessToken: account.token };
  } else if (config.method === 'get' && config.url === AUTH_API.ENTRY_POINTS.GET_USER_INFO) {
    const authorization = config.headers.get('Authorization');
    const account = MOCK_ACCOUNTS.find((item) => authorization === `Bearer ${item.token}`);
    if (!account) {
      throw new AuthError('invalidSession');
    }
    data = { ...account.user };
  } else {
    throw new AuthError('unknown');
  }

  const response: AxiosResponse<unknown> = {
    data, status: 200, statusText: 'OK', headers: {}, config,
  };
  return response;
};