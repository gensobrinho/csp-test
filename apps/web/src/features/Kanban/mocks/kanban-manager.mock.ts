import { jest } from '@jest/globals';
import type { IKanbanRepository } from '../types/IKanbanRepository';

export function createKanbanManagerMocks() {
  const repository: jest.Mocked<IKanbanRepository> = {
    getDemands: jest.fn<IKanbanRepository['getDemands']>(),
    getDemandById: jest.fn<IKanbanRepository['getDemandById']>(),
    createDemand: jest.fn<IKanbanRepository['createDemand']>(),
    updateDemandDetails: jest.fn<IKanbanRepository['updateDemandDetails']>(),
    updateDemand: jest.fn<IKanbanRepository['updateDemand']>(),
    deleteDemand: jest.fn<IKanbanRepository['deleteDemand']>(),
  };
  return { repository };
}
