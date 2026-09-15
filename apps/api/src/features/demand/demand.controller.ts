import type { Request } from 'express';
import { AppError } from '../../utils/AppError.js';
import { HttpResponse, type ControllerResponse } from '../../utils/HttpResponse.js';
import type { PaginatedResult } from '../../utils/pagination.js';
import {
  createDemandSchema,
  updateDemandSchema,
  updateDemandStatusSchema,
  type DemandDto,
} from './demand.model.js';
import type { DemandService } from './demand.service.js';

export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  async getDemands(req: Request): Promise<ControllerResponse<PaginatedResult<DemandDto>>> {
    if (!req.user) {
      throw new AppError(401, 'unauthorized', 'Usuário não autenticado');
    }

    const demands = await this.demandService.getDemands({
      status: typeof req.query.status === 'string' ? req.query.status : undefined,
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      page: typeof req.query.page === 'string' ? req.query.page : undefined,
      limit: typeof req.query.limit === 'string' ? req.query.limit : undefined,
      responsibleId:
        typeof req.query.responsibleId === 'string' ? req.query.responsibleId : undefined,
    });

    return HttpResponse.ok(demands);
  }

  async getDemandById(req: Request): Promise<ControllerResponse<DemandDto>> {
    const demand = await this.demandService.getDemandById(req.params.id as string);
    return HttpResponse.ok(demand);
  }

  async createDemand(req: Request): Promise<ControllerResponse<DemandDto>> {
    if (!req.user) {
      throw new AppError(401, 'unauthorized', 'Usuário não autenticado');
    }

    const input = createDemandSchema.parse(req.body);
    const demand = await this.demandService.createDemand(input, req.user.role);
    return HttpResponse.created(demand);
  }

  async updateDemand(req: Request): Promise<ControllerResponse<DemandDto>> {
    if (!req.user) {
      throw new AppError(401, 'unauthorized', 'Usuário não autenticado');
    }

    const input = updateDemandSchema.parse(req.body);
    const demand = await this.demandService.updateDemand(
      req.params.id as string,
      input,
      req.user.role,
    );
    return HttpResponse.ok(demand);
  }

  async updateDemandStatus(req: Request): Promise<ControllerResponse<DemandDto>> {
    if (!req.user) {
      throw new AppError(401, 'unauthorized', 'Usuário não autenticado');
    }

    const input = updateDemandStatusSchema.parse(req.body);
    const demand = await this.demandService.updateDemandStatus(
      req.params.id as string,
      input,
      req.user.role,
    );
    return HttpResponse.ok(demand);
  }

  async deleteDemand(req: Request): Promise<ControllerResponse> {
    if (!req.user) {
      throw new AppError(401, 'unauthorized', 'Usuário não autenticado');
    }

    await this.demandService.deleteDemand(req.params.id as string, req.user.role);
    return HttpResponse.noContent();
  }
}
