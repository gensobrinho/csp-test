import { jest } from '@jest/globals';
import type { IHashAdapter, IJwtAdapter } from '../../../../adapters/types.js';
import type { AuthRepository } from '../../auth.repository.js';

export function createAuthServiceMocks() {
  const authRepository = {
    findByUsername: jest.fn<AuthRepository['findByUsername']>(),
    findById: jest.fn<AuthRepository['findById']>(),
  } as unknown as jest.Mocked<AuthRepository>;

  const hashAdapter: jest.Mocked<IHashAdapter> = {
    hash: jest.fn<IHashAdapter['hash']>(),
    compare: jest.fn<IHashAdapter['compare']>(),
  };

  const jwtAdapter: jest.Mocked<IJwtAdapter> = {
    sign: jest.fn<IJwtAdapter['sign']>(),
    verify: jest.fn<IJwtAdapter['verify']>(),
  };

  return { authRepository, hashAdapter, jwtAdapter };
}
