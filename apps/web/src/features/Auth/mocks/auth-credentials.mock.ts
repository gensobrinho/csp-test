import type { TAuthUser } from '../types/TAuthUser';

interface MockAccount {
  username: string;
  password: string;
  token: string;
  user: TAuthUser;
}

// Credenciais fictícias usadas exclusivamente pela simulação local.
export const MOCK_ACCOUNTS: readonly MockAccount[] = [
  {
    username: 'admin', password: 'CSP123!', token: 'mock-token-admin',
    user: { id: '1', name: 'Admin', role: 'admin' },
  },
  {
    username: 'agilista', password: 'CSP123!', token: 'mock-token-agilist',
    user: { id: '2', name: 'Agilista', role: 'agilist' },
  },
  {
    username: 'dev', password: 'CSP123!', token: 'mock-token-developer',
    user: { id: '3', name: 'Dev', role: 'developer' },
  },
];