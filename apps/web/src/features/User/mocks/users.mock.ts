import type { TAuthUser } from '@features/Auth';

export const usersStore: TAuthUser[] = [
  { id: 'u1', name: 'João Silva', role: 'developer' },
  { id: 'u2', name: 'Maria Souza', role: 'agilist' },
  { id: 'u3', name: 'Pedro Lima', role: 'developer' },
  { id: 'u4', name: 'Ana Costa', role: 'admin' },
  { id: 'u5', name: 'Lucas Rocha', role: 'developer' },
];

export const MOCK_APP_USERS = usersStore;
