import type { DemandWithResponsible } from '../../demand.repository.js';
import type {
  CreateDemandInput,
  DemandDto,
  UpdateDemandInput,
  UpdateDemandStatusInput,
} from '../../demand.model.js';

export const DEMAND_ENTITY: DemandWithResponsible = {
  id: 'demand-1',
  title: 'Implement login',
  description: 'Add authentication flow',
  deadline: new Date('2024-06-15T00:00:00.000Z'),
  status: 'not_started',
  responsibleId: 'user-dev-1',
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  updatedAt: new Date('2024-01-01T00:00:00.000Z'),
  responsible: {
    id: 'user-dev-1',
    name: 'Bruno Dev',
  },
};

export const DEMAND_DTO: DemandDto = {
  id: 'demand-1',
  title: 'Implement login',
  description: 'Add authentication flow',
  responsibleId: 'user-dev-1',
  responsibleName: 'Bruno Dev',
  deadline: '2024-06-15',
  status: 'not_started',
};

export const CREATE_DEMAND_INPUT: CreateDemandInput = {
  title: 'Implement login',
  description: 'Add authentication flow',
  responsibleId: 'user-dev-1',
  deadline: '2024-06-15',
};

export const UPDATE_DEMAND_INPUT: UpdateDemandInput = {
  title: 'Implement login updated',
  description: 'Updated description',
  responsibleId: 'user-dev-1',
  deadline: '2024-07-01',
  status: 'in_progress',
};

export const UPDATE_DEMAND_STATUS_INPUT: UpdateDemandStatusInput = {
  status: 'in_progress',
};

export const RESPONSIBLE_CANDIDATE = {
  id: 'user-dev-1',
  role: 'developer',
};
