import type { TDemand } from './TDemand';
import type { TDemandStatus } from './TDemandStatus';

export type TGetDemandsParams = {
  status?: TDemandStatus;
  page?: number;
  limit?: number;
  search?: string;
};

export type TPaginatedDemands = {
  data: TDemand[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type TUpdateDemandPayload = {
  status: TDemandStatus;
};

export type TCreateDemandPayload = {
  title: string;
  description: string;
  responsibleId: string;
  deadline: string;
};

export type TUpdateDemandDetailsPayload = {
  title: string;
  description: string;
  responsibleId: string;
  deadline: string;
  status?: TDemandStatus;
};

export interface IKanbanRepository {
  getDemands(params: TGetDemandsParams): Promise<TPaginatedDemands>;
  getDemandById(id: string): Promise<TDemand>;
  createDemand(payload: TCreateDemandPayload): Promise<TDemand>;
  updateDemandDetails(id: string, payload: TUpdateDemandDetailsPayload): Promise<TDemand>;
  updateDemand(id: string, payload: TUpdateDemandPayload): Promise<TDemand>;
  deleteDemand(id: string): Promise<void>;
}
