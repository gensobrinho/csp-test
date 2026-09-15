import type { NextFunction, Request, Response } from 'express';
import type { Role } from '../adapters/types.js';
import { AppError } from '../utils/AppError.js';

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, 'unauthorized', 'Usuário não autenticado'));
      return;
    }

    if (req.user.role === 'admin' || roles.includes(req.user.role)) {
      next();
      return;
    }

    next(
      new AppError(403, 'forbidden', 'Você não tem permissão para executar esta ação', {
        requiredRoles: roles,
        currentRole: req.user.role,
      }),
    );
  };
}
