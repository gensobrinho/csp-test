import { Router } from 'express';
import type { AppContainer } from '../../container.js';
import { createAuthRouter } from '../../features/auth/auth.route.js';
import { createUserRouter } from '../../features/users/user.route.js';
import { createDemandRouter } from '../../features/demand/demand.route.js';

export function createV1Router(container: AppContainer): Router {
  const router = Router();

  router.use('/auth', createAuthRouter(container.authController, container.jwtAdapter));
  router.use('/users', createUserRouter(container.userController, container.jwtAdapter));
  router.use('/demands', createDemandRouter(container.demandController, container.jwtAdapter));

  return router;
}
