import { jest } from '@jest/globals';
import type { DemandRepository } from '../../demand.repository.js';

export function createDemandServiceMocks() {
  const demandRepository = {
    findMany: jest.fn<DemandRepository['findMany']>(),
    findById: jest.fn<DemandRepository['findById']>(),
    create: jest.fn<DemandRepository['create']>(),
    update: jest.fn<DemandRepository['update']>(),
    delete: jest.fn<DemandRepository['delete']>(),
    findResponsibleCandidate: jest.fn<DemandRepository['findResponsibleCandidate']>(),
  } as unknown as jest.Mocked<DemandRepository>;

  return { demandRepository };
}
