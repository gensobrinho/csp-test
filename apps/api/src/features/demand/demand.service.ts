import type { DemandStatus, Role } from '@prisma/client';
import { AppError } from '../../utils/AppError.js';
import {
  buildPaginatedResult,
  parsePagination,
  paginationSkip,
  type PaginatedResult,
} from '../../utils/pagination.js';
import type {
  CreateDemandInput,
  DemandDto,
  UpdateDemandInput,
  UpdateDemandStatusInput,
} from './demand.model.js';
import type { DemandRepository, DemandWithResponsible } from './demand.repository.js';

const LOCKED_STATUS: DemandStatus = 'in_production';

function formatDeadline(deadline: Date): string {
  return deadline.toISOString().slice(0, 10);
}

function toDemandDto(demand: DemandWithResponsible): DemandDto {
  return {
    id: demand.id,
    title: demand.title,
    description: demand.description,
    responsibleId: demand.responsibleId,
    responsibleName: demand.responsible.name,
    deadline: formatDeadline(demand.deadline),
    status: demand.status,
  };
}

function parseDeadline(value: string): Date {
  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    throw new AppError(400, 'invalid_deadline', 'Prazo inválido');
  }

  return date;
}

export class DemandService {
  constructor(private readonly demandRepository: DemandRepository) {}

  async getDemands(params: {
    status?: string;
    search?: string;
    page?: string | number;
    limit?: string | number;
  }): Promise<PaginatedResult<DemandDto>> {
    const { page, limit } = parsePagination(params.page, params.limit);
    const status = this.parseStatus(params.status);

    const { items, total } = await this.demandRepository.findMany({
      status,
      search: params.search,
      skip: paginationSkip(page, limit),
      take: limit,
    });

    return buildPaginatedResult(items.map(toDemandDto), total, page, limit);
  }

  async getDemandById(id: string): Promise<DemandDto> {
    const demand = await this.demandRepository.findById(id);

    if (!demand) {
      throw new AppError(404, 'demand_not_found', 'Demanda não encontrada');
    }

    return toDemandDto(demand);
  }

  async createDemand(input: CreateDemandInput, role: Role): Promise<DemandDto> {
    this.assertCanCreate(role);
    await this.assertResponsibleExists(input.responsibleId);

    const demand = await this.demandRepository.create({
      title: input.title.trim(),
      description: input.description.trim(),
      responsibleId: input.responsibleId,
      deadline: parseDeadline(input.deadline),
    });

    return toDemandDto(demand);
  }

  async updateDemand(
    id: string,
    input: UpdateDemandInput,
    role: Role,
  ): Promise<DemandDto> {
    this.assertCanEdit(role);

    const existing = await this.demandRepository.findById(id);

    if (!existing) {
      throw new AppError(404, 'demand_not_found', 'Demanda não encontrada');
    }

    await this.assertResponsibleExists(input.responsibleId);

    const demand = await this.demandRepository.update(id, {
      title: input.title.trim(),
      description: input.description.trim(),
      responsibleId: input.responsibleId,
      deadline: parseDeadline(input.deadline),
      status: input.status,
    });

    return toDemandDto(demand);
  }

  async updateDemandStatus(
    id: string,
    input: UpdateDemandStatusInput,
    role: Role,
  ): Promise<DemandDto> {
    this.assertCanMove(role);

    const existing = await this.demandRepository.findById(id);

    if (!existing) {
      throw new AppError(404, 'demand_not_found', 'Demanda não encontrada');
    }

    if (existing.status === LOCKED_STATUS && input.status !== LOCKED_STATUS) {
      throw new AppError(
        400,
        'locked_status',
        'Demandas em produção não podem mudar de status',
      );
    }

    const demand = await this.demandRepository.update(id, { status: input.status });
    return toDemandDto(demand);
  }

  async deleteDemand(id: string, role: Role): Promise<void> {
    this.assertCanDelete(role);

    const existing = await this.demandRepository.findById(id);

    if (!existing) {
      throw new AppError(404, 'demand_not_found', 'Demanda não encontrada');
    }

    await this.demandRepository.delete(id);
  }

  private parseStatus(status?: string): DemandStatus | undefined {
    if (!status) {
      return undefined;
    }

    const allowed: DemandStatus[] = [
      'not_started',
      'in_progress',
      'paused',
      'in_homologation',
      'in_production',
    ];

    if (!allowed.includes(status as DemandStatus)) {
      throw new AppError(400, 'invalid_status', 'Status inválido');
    }

    return status as DemandStatus;
  }

  private async assertResponsibleExists(responsibleId: string): Promise<void> {
    const user = await this.demandRepository.findResponsibleCandidate(responsibleId);

    if (!user) {
      throw new AppError(400, 'responsible_not_found', 'Responsável não encontrado');
    }

    if (user.role !== 'agilist' && user.role !== 'developer') {
      throw new AppError(
        400,
        'invalid_responsible',
        'Responsável deve ser um desenvolvedor ou agilista',
      );
    }
  }

  private assertCanCreate(role: Role): void {
    if (role === 'admin' || role === 'agilist') {
      return;
    }

    throw new AppError(403, 'forbidden', 'Você não pode cadastrar demandas');
  }

  private assertCanEdit(role: Role): void {
    if (role === 'admin' || role === 'agilist' || role === 'developer') {
      return;
    }

    throw new AppError(403, 'forbidden', 'Você não pode editar demandas');
  }

  private assertCanMove(role: Role): void {
    if (role === 'admin' || role === 'agilist' || role === 'developer') {
      return;
    }

    throw new AppError(403, 'forbidden', 'Você não pode mover demandas');
  }

  private assertCanDelete(role: Role): void {
    if (role === 'admin' || role === 'agilist') {
      return;
    }

    throw new AppError(403, 'forbidden', 'Você não pode excluir demandas');
  }
}
