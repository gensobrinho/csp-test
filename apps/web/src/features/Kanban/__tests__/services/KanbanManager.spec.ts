import { beforeEach, describe, expect, it } from '@jest/globals';
import { createKanbanManagerMocks } from '../../mocks/kanban-manager.mock';
import { KANBAN_TEST_DEMAND, KANBAN_TEST_PRODUCTION_DEMAND } from '../../mocks/kanban-test-data.mock';
import { KanbanManager } from '../../services/KanbanManager';

describe('KanbanManager', () => {
  let manager: KanbanManager;
  let mocks: ReturnType<typeof createKanbanManagerMocks>;

  beforeEach(() => {
    mocks = createKanbanManagerMocks();
    manager = new KanbanManager(mocks.repository);
  });

  describe('getDemands', () => {
    it('should request demands with default page and limit', () => {
      mocks.repository.getDemands.mockResolvedValue({
        data: [KANBAN_TEST_DEMAND],
        page: 1,
        limit: 10,
        total: 1,
        hasMore: false,
      });

      return manager.getDemands({ status: 'not_started' }).then((result) => {
        expect(mocks.repository.getDemands).toHaveBeenCalledWith({
          status: 'not_started',
          page: 1,
          limit: 10,
        });
        expect(result.data).toEqual([KANBAN_TEST_DEMAND]);
      });
    });
  });

  describe('updateDemand', () => {
    it('should update the demand status through the repository', () => {
      const updated = { ...KANBAN_TEST_DEMAND, status: 'in_progress' as const };
      mocks.repository.updateDemand.mockResolvedValue(updated);

      return manager
        .updateDemand(KANBAN_TEST_DEMAND.id, { status: 'in_progress' }, 'not_started')
        .then((result) => {
          expect(mocks.repository.updateDemand).toHaveBeenCalledWith(
            KANBAN_TEST_DEMAND.id,
            { status: 'in_progress' },
          );
          expect(result).toEqual(updated);
        });
    });

    it('should reject moving a demand that is already in production', () => {
      const update = manager.updateDemand(
        KANBAN_TEST_PRODUCTION_DEMAND.id,
        { status: 'paused' },
        'in_production',
      );

      return expect(update).rejects.toMatchObject({ code: 'lockedStatus' }).then(() => {
        expect(mocks.repository.updateDemand).not.toHaveBeenCalled();
      });
    });

    it('should map locked_status API errors to lockedStatus', async () => {
      mocks.repository.updateDemand.mockRejectedValue({
        response: { status: 400, data: { id: 'locked_status' } },
      });

      await expect(
        manager.updateDemand(KANBAN_TEST_DEMAND.id, { status: 'paused' }, 'not_started'),
      ).rejects.toMatchObject({ code: 'lockedStatus' });
    });
  });
});
