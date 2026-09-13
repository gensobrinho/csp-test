import { KANBAN_API, DemoApi } from '@shared/api';
import { BaseRepository } from '../../../shared/utils/BaseRepository';
import type {
  IKanbanRepository,
  TGetDemandsParams,
  TPaginatedDemands,
} from '../types/IKanbanRepository';

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
}
