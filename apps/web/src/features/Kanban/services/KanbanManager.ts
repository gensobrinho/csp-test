import type {
  IKanbanRepository,
  TGetDemandsParams,
  TPaginatedDemands,
} from '../types/IKanbanRepository';

export class KanbanManager {
  private readonly repository: IKanbanRepository;

  constructor(repository: IKanbanRepository) {
    this.repository = repository;
  }

  getDemands(params: TGetDemandsParams): Promise<TPaginatedDemands> {
    return this.repository.getDemands({
      ...params,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    });
  }
}
