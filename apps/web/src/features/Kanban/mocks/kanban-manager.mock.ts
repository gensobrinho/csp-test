import { jest } from '@jest/globals';
import type { IKanbanRepository } from '../types/IKanbanRepository';

export function createKanbanManagerMocks() {
  const repository: jest.Mocked<IKanbanRepository> = {
    getDemands: jest.fn<IKanbanRepository['getDemands']>(),
    getDemandById: jest.fn<IKanbanRepository['getDemandById']>(),
    updateDemand: jest.fn<IKanbanRepository['updateDemand']>(),
  };
  return { repository };
}
