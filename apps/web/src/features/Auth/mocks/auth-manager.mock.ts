import { jest } from '@jest/globals';
import type { IAuthRepository } from '../types/IAuthRepository';
import type { AuthStorage } from '../services/AuthManager';

export function createAuthManagerMocks() {
  const repository: jest.Mocked<IAuthRepository> = {
    authenticate: jest.fn<IAuthRepository['authenticate']>(),
    getUserInfo: jest.fn<IAuthRepository['getUserInfo']>(),
  };
  const storage: jest.Mocked<AuthStorage> = {
    getItem: jest.fn<AuthStorage['getItem']>(),
    setItem: jest.fn<AuthStorage['setItem']>(),
    removeItem: jest.fn<AuthStorage['removeItem']>(),
  };
  return { repository, storage };
}