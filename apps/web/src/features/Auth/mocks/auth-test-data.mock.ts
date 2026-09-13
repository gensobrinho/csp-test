import type { TAuthUser } from '../types/TAuthUser';

export const AUTH_TEST_USER: TAuthUser = {
  id: '1', name: 'Ana Admin', role: 'admin',
};
export const AUTH_TEST_TOKEN = 'mock-token-admin';
export const AUTH_TEST_CREDENTIALS = { username: 'admin', password: 'CSP123!' };