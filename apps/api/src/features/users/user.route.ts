import { Router } from 'express';
import type { IJwtAdapter } from '../../adapters/types.js';
import { createAuthenticateMiddleware } from '../../middleware/authenticate.js';
import { requireRole } from '../../middleware/requireRole.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import type { UserController } from './user.controller.js';

export function createUserRouter(
  userController: UserController,
  jwtAdapter: IJwtAdapter,
): Router {
  const router = Router();
  const authenticate = createAuthenticateMiddleware(jwtAdapter);

  router.use(authenticate);

  router.get(
    '/',
    asyncHandler(async (req) => userController.getUsers(req)),
  );

  router.patch(
    '/me/password',
    asyncHandler(async (req) => userController.changePassword(req)),
  );

  router.get(
    '/:id',
    asyncHandler(async (req) => userController.getUserById(req)),
  );

  router.post(
    '/',
    requireRole('admin'),
    asyncHandler(async (req) => userController.createUser(req)),
  );

  router.put(
    '/:id',
    requireRole('admin'),
    asyncHandler(async (req) => userController.updateUser(req)),
  );

  router.delete(
    '/:id',
    requireRole('admin'),
    asyncHandler(async (req) => userController.deleteUser(req)),
  );

  return router;
}
