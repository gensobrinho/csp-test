import { getApiErrorBody, getApiErrorId } from '../../../shared/api/apiError';
import TEXTS from '@shared/i18n';
import type {
  IKanbanRepository,
  TCreateDemandPayload,
  TGetDemandsParams,
  TPaginatedDemands,
  TUpdateDemandDetailsPayload,
  TUpdateDemandPayload,
} from '../types/IKanbanRepository';
import type { TDemand } from '../types/TDemand';
import type { TDemandStatus } from '../types/TDemandStatus';
import { LOCKED_DEMAND_STATUS } from '../types/TDemandStatus';

export class KanbanError extends Error {
  readonly code: 'lockedStatus' | 'unknown';

  constructor(code: KanbanError['code'], message?: string) {
    super(message ?? code);
    this.name = 'KanbanError';
    this.code = code;
  }
}

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

  getDemandById(id: string): Promise<TDemand> {
    return this.repository.getDemandById(id);
  }

  createDemand(payload: TCreateDemandPayload): Promise<TDemand> {
    return this.repository.createDemand(payload);
  }

  updateDemandDetails(
    id: string,
    payload: TUpdateDemandDetailsPayload,
  ): Promise<TDemand> {
    return this.repository.updateDemandDetails(id, payload);
  }

  deleteDemand(id: string): Promise<void> {
    return this.repository.deleteDemand(id);
  }

  async updateDemand(
    id: string,
    payload: TUpdateDemandPayload,
    currentStatus?: TDemandStatus,
  ): Promise<TDemand> {
    if (
      currentStatus === LOCKED_DEMAND_STATUS
      && payload.status !== LOCKED_DEMAND_STATUS
    ) {
      throw new KanbanError('lockedStatus');
    }

    try {
      return await this.repository.updateDemand(id, payload);
    } catch (error: unknown) {
      if (error instanceof KanbanError) {
        throw error;
      }
      if (getApiErrorId(error) === 'locked_status') {
        throw new KanbanError('lockedStatus');
      }

      const apiError = getApiErrorBody(error);
      throw new KanbanError(
        'unknown',
        apiError?.message ?? apiError?.id ?? TEXTS.kanban.errors.moveFailed,
      );
    }
  }
}
