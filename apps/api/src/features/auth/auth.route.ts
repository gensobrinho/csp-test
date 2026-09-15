import { Router } from 'express';
import type { IJwtAdapter } from '../../adapters/types.js';
import { createAuthenticateMiddleware } from '../../middleware/authenticate.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import type { AuthController } from './auth.controller.js';

export function createAuthRouter(
  authController: AuthController,
  jwtAdapter: IJwtAdapter,
): Router {
  const router = Router();
  const authenticate = createAuthenticateMiddleware(jwtAdapter);

  router.post(
    '/login',
    asyncHandler(async (req) => authController.login(req)),
  );

  router.get(
    '/me',
    authenticate,
    asyncHandler(async (req) => authController.me(req)),
  );

  return router;
}
