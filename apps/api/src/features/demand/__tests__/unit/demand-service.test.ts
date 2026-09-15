import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DemandService } from '../../demand.service.js';
import { createDemandServiceMocks } from '../mocks/demand-service.mock.js';
import {
  CREATE_DEMAND_INPUT,
  DEMAND_DTO,
  DEMAND_ENTITY,
  RESPONSIBLE_CANDIDATE,
  UPDATE_DEMAND_INPUT,
  UPDATE_DEMAND_STATUS_INPUT,
} from '../mocks/demand-test-data.mock.js';

describe('DemandService', () => {
  let service: DemandService;
  let mocks: ReturnType<typeof createDemandServiceMocks>;

  beforeEach(() => {
    mocks = createDemandServiceMocks();
    service = new DemandService(mocks.demandRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDemands', () => {
    it('should return a paginated list of demands', async () => {
      mocks.demandRepository.findMany.mockResolvedValue({
        items: [DEMAND_ENTITY],
        total: 1,
      });

      const result = await service.getDemands({ page: 1, limit: 10 });

      expect(result).toEqual({
        data: [DEMAND_DTO],
        page: 1,
        limit: 10,
        total: 1,
        hasMore: false,
      });
      expect(mocks.demandRepository.findMany).toHaveBeenCalledWith({
        status: undefined,
        search: undefined,
        responsibleId: undefined,
        skip: 0,
        take: 10,
      });
    });

    it('should throw invalid_status when the status filter is not allowed', async () => {
      const params = { status: 'unknown' };

      const getDemands = service.getDemands(params);

      await expect(getDemands).rejects.toMatchObject({
        statusCode: 400,
        id: 'invalid_status',
      });
      expect(mocks.demandRepository.findMany).not.toHaveBeenCalled();
    });
  });

  describe('getDemandById', () => {
    it('should return the demand when it exists', async () => {
      mocks.demandRepository.findById.mockResolvedValue(DEMAND_ENTITY);

      const result = await service.getDemandById(DEMAND_ENTITY.id);

      expect(result).toEqual(DEMAND_DTO);
      expect(mocks.demandRepository.findById).toHaveBeenCalledWith(DEMAND_ENTITY.id);
    });

    it('should throw demand_not_found when the demand does not exist', async () => {
      mocks.demandRepository.findById.mockResolvedValue(null);

      const getDemandById = service.getDemandById('missing-demand');

      await expect(getDemandById).rejects.toMatchObject({
        statusCode: 404,
        id: 'demand_not_found',
      });
    });
  });

  describe('createDemand', () => {
    it('should create a demand when the role and responsible are valid', async () => {
      mocks.demandRepository.findResponsibleCandidate.mockResolvedValue(RESPONSIBLE_CANDIDATE);
      mocks.demandRepository.create.mockResolvedValue(DEMAND_ENTITY);

      const result = await service.createDemand(CREATE_DEMAND_INPUT, 'admin');

      expect(result).toEqual(DEMAND_DTO);
      expect(mocks.demandRepository.create).toHaveBeenCalledWith({
        title: CREATE_DEMAND_INPUT.title,
        description: CREATE_DEMAND_INPUT.description,
        responsibleId: CREATE_DEMAND_INPUT.responsibleId,
        deadline: new Date('2024-06-15T00:00:00.000Z'),
      });
    });

    it('should throw forbidden when the role cannot create demands', async () => {
      const role = 'developer' as const;

      const createDemand = service.createDemand(CREATE_DEMAND_INPUT, role);

      await expect(createDemand).rejects.toMatchObject({
        statusCode: 403,
        id: 'forbidden',
      });
      expect(mocks.demandRepository.create).not.toHaveBeenCalled();
    });

    it('should throw responsible_not_found when the responsible does not exist', async () => {
      mocks.demandRepository.findResponsibleCandidate.mockResolvedValue(null);

      const createDemand = service.createDemand(CREATE_DEMAND_INPUT, 'admin');

      await expect(createDemand).rejects.toMatchObject({
        statusCode: 400,
        id: 'responsible_not_found',
      });
      expect(mocks.demandRepository.create).not.toHaveBeenCalled();
    });

    it('should throw invalid_responsible when the responsible role is not allowed', async () => {
      mocks.demandRepository.findResponsibleCandidate.mockResolvedValue({
        id: 'user-admin-1',
        role: 'admin',
      });

      const createDemand = service.createDemand(CREATE_DEMAND_INPUT, 'admin');

      await expect(createDemand).rejects.toMatchObject({
        statusCode: 400,
        id: 'invalid_responsible',
      });
      expect(mocks.demandRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('updateDemand', () => {
    it('should update the demand when the role and payload are valid', async () => {
      const updatedEntity = {
        ...DEMAND_ENTITY,
        title: UPDATE_DEMAND_INPUT.title,
        description: UPDATE_DEMAND_INPUT.description,
        deadline: new Date('2024-07-01T00:00:00.000Z'),
        status: 'in_progress' as const,
      };
      mocks.demandRepository.findById.mockResolvedValue(DEMAND_ENTITY);
      mocks.demandRepository.findResponsibleCandidate.mockResolvedValue(RESPONSIBLE_CANDIDATE);
      mocks.demandRepository.update.mockResolvedValue(updatedEntity);

      const result = await service.updateDemand(DEMAND_ENTITY.id, UPDATE_DEMAND_INPUT, 'agilist');

      expect(result).toEqual({
        ...DEMAND_DTO,
        title: UPDATE_DEMAND_INPUT.title,
        description: UPDATE_DEMAND_INPUT.description,
        deadline: '2024-07-01',
        status: 'in_progress',
      });
      expect(mocks.demandRepository.update).toHaveBeenCalledWith(DEMAND_ENTITY.id, {
        title: UPDATE_DEMAND_INPUT.title,
        description: UPDATE_DEMAND_INPUT.description,
        responsibleId: UPDATE_DEMAND_INPUT.responsibleId,
        deadline: new Date('2024-07-01T00:00:00.000Z'),
        status: 'in_progress',
      });
    });

    it('should throw forbidden when the role cannot edit demands', async () => {
      const role = 'admin' as const;

      const updateDemand = service.updateDemand(DEMAND_ENTITY.id, UPDATE_DEMAND_INPUT, role);

      await expect(updateDemand).rejects.toMatchObject({
        statusCode: 403,
        id: 'forbidden',
      });
      expect(mocks.demandRepository.update).not.toHaveBeenCalled();
    });

    it('should throw demand_not_found when the demand does not exist', async () => {
      mocks.demandRepository.findById.mockResolvedValue(null);

      const updateDemand = service.updateDemand('missing-demand', UPDATE_DEMAND_INPUT, 'agilist');

      await expect(updateDemand).rejects.toMatchObject({
        statusCode: 404,
        id: 'demand_not_found',
      });
    });
  });

  describe('updateDemandStatus', () => {
    it('should update the status when the role is allowed', async () => {
      const updatedEntity = { ...DEMAND_ENTITY, status: 'in_progress' as const };
      mocks.demandRepository.findById.mockResolvedValue(DEMAND_ENTITY);
      mocks.demandRepository.update.mockResolvedValue(updatedEntity);

      const result = await service.updateDemandStatus(
        DEMAND_ENTITY.id,
        UPDATE_DEMAND_STATUS_INPUT,
        'developer',
      );

      expect(result).toEqual({ ...DEMAND_DTO, status: 'in_progress' });
      expect(mocks.demandRepository.update).toHaveBeenCalledWith(DEMAND_ENTITY.id, {
        status: 'in_progress',
      });
    });

    it('should throw forbidden when the role cannot move demands', async () => {
      const role = 'admin' as const;

      const updateDemandStatus = service.updateDemandStatus(
        DEMAND_ENTITY.id,
        UPDATE_DEMAND_STATUS_INPUT,
        role,
      );

      await expect(updateDemandStatus).rejects.toMatchObject({
        statusCode: 403,
        id: 'forbidden',
      });
    });

    it('should throw demand_not_found when the demand does not exist', async () => {
      mocks.demandRepository.findById.mockResolvedValue(null);

      const updateDemandStatus = service.updateDemandStatus(
        'missing-demand',
        UPDATE_DEMAND_STATUS_INPUT,
        'agilist',
      );

      await expect(updateDemandStatus).rejects.toMatchObject({
        statusCode: 404,
        id: 'demand_not_found',
      });
    });

    it('should throw locked_status when leaving in_production', async () => {
      mocks.demandRepository.findById.mockResolvedValue({
        ...DEMAND_ENTITY,
        status: 'in_production',
      });

      const updateDemandStatus = service.updateDemandStatus(
        DEMAND_ENTITY.id,
        { status: 'in_progress' },
        'agilist',
      );

      await expect(updateDemandStatus).rejects.toMatchObject({
        statusCode: 400,
        id: 'locked_status',
      });
      expect(mocks.demandRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteDemand', () => {
    it('should delete the demand when the role is agilist', async () => {
      mocks.demandRepository.findById.mockResolvedValue(DEMAND_ENTITY);
      mocks.demandRepository.delete.mockResolvedValue(DEMAND_ENTITY);

      await service.deleteDemand(DEMAND_ENTITY.id, 'agilist');

      expect(mocks.demandRepository.delete).toHaveBeenCalledWith(DEMAND_ENTITY.id);
    });

    it('should throw forbidden when the role cannot delete demands', async () => {
      const role = 'developer' as const;

      const deleteDemand = service.deleteDemand(DEMAND_ENTITY.id, role);

      await expect(deleteDemand).rejects.toMatchObject({
        statusCode: 403,
        id: 'forbidden',
      });
      expect(mocks.demandRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw demand_not_found when the demand does not exist', async () => {
      mocks.demandRepository.findById.mockResolvedValue(null);

      const deleteDemand = service.deleteDemand('missing-demand', 'agilist');

      await expect(deleteDemand).rejects.toMatchObject({
        statusCode: 404,
        id: 'demand_not_found',
      });
      expect(mocks.demandRepository.delete).not.toHaveBeenCalled();
    });
  });
});
