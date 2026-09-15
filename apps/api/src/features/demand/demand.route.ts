import { Router } from 'express';
import type { IJwtAdapter } from '../../adapters/types.js';
import { createAuthenticateMiddleware } from '../../middleware/authenticate.js';
import { requireRole } from '../../middleware/requireRole.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import type { DemandController } from './demand.controller.js';

export function createDemandRouter(
  demandController: DemandController,
  jwtAdapter: IJwtAdapter,
): Router {
  const router = Router();
  const authenticate = createAuthenticateMiddleware(jwtAdapter);

  router.use(authenticate);

  router.get(
    '/',
    asyncHandler(async (req) => demandController.getDemands(req)),
  );

  router.get(
    '/:id',
    asyncHandler(async (req) => demandController.getDemandById(req)),
  );

  router.post(
    '/',
    requireRole('admin', 'agilist'),
    asyncHandler(async (req) => demandController.createDemand(req)),
  );

  router.put(
    '/:id',
    requireRole('agilist', 'developer'),
    asyncHandler(async (req) => demandController.updateDemand(req)),
  );

  router.patch(
    '/:id',
    requireRole('agilist', 'developer'),
    asyncHandler(async (req) => demandController.updateDemandStatus(req)),
  );

  router.delete(
    '/:id',
    requireRole('agilist'),
    asyncHandler(async (req) => demandController.deleteDemand(req)),
  );

  return router;
}
