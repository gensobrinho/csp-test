import { jest } from '@jest/globals';
import type { IHashAdapter } from '../../../../adapters/types.js';
import type { UserRepository } from '../../user.repository.js';

export function createUserServiceMocks() {
  const userRepository = {
    findAll: jest.fn<UserRepository['findAll']>(),
    findById: jest.fn<UserRepository['findById']>(),
    findByUsername: jest.fn<UserRepository['findByUsername']>(),
    create: jest.fn<UserRepository['create']>(),
    update: jest.fn<UserRepository['update']>(),
    delete: jest.fn<UserRepository['delete']>(),
  } as unknown as jest.Mocked<UserRepository>;

  const hashAdapter: jest.Mocked<IHashAdapter> = {
    hash: jest.fn<IHashAdapter['hash']>(),
    compare: jest.fn<IHashAdapter['compare']>(),
  };

  return { userRepository, hashAdapter };
}
