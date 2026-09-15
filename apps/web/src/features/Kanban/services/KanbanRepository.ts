import { KANBAN_API, DemoApi } from '@shared/api';
import { BaseRepository } from '../../../shared/utils/BaseRepository';
import type {
  IKanbanRepository,
  TCreateDemandPayload,
  TGetDemandsParams,
  TPaginatedDemands,
  TUpdateDemandDetailsPayload,
  TUpdateDemandPayload,
} from '../types/IKanbanRepository';
import type { TDemand } from '../types/TDemand';

export class KanbanRepository extends BaseRepository implements IKanbanRepository {
  private readonly api: DemoApi;

  constructor(api: DemoApi) {
    super();
    this.api = api;
  }

  async getDemands(params: TGetDemandsParams): Promise<TPaginatedDemands> {
    const url = this.addQueryParams(KANBAN_API.ENTRY_POINTS.GET_DEMANDS, {
      status: params.status,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      search: params.search || undefined,
    });
    const response = await this.api.get<TPaginatedDemands>(url);
    return response.data;
  }

  async getDemandById(id: string): Promise<TDemand> {
    const response = await this.api.get<TDemand>(
      `${KANBAN_API.ENTRY_POINTS.GET_DEMANDS}/${id}`,
    );
    return response.data;
  }

  async createDemand(payload: TCreateDemandPayload): Promise<TDemand> {
    const response = await this.api.post<TDemand>(
      KANBAN_API.ENTRY_POINTS.CREATE_DEMAND,
      payload,
    );
    return response.data;
  }

  async updateDemandDetails(
    id: string,
    payload: TUpdateDemandDetailsPayload,
  ): Promise<TDemand> {
    const response = await this.api.put<TDemand>(
      `${KANBAN_API.ENTRY_POINTS.UPDATE_DEMAND}/${id}`,
      payload,
    );
    return response.data;
  }

  async updateDemand(id: string, payload: TUpdateDemandPayload): Promise<TDemand> {
    const response = await this.api.patch<TDemand>(
      `${KANBAN_API.ENTRY_POINTS.UPDATE_DEMAND}/${id}`,
      payload,
    );
    return response.data;
  }

  async deleteDemand(id: string): Promise<void> {
    await this.api.delete(`${KANBAN_API.ENTRY_POINTS.DELETE_DEMAND}/${id}`);
  }
}
