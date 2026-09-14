import type { NextFunction, Request, Response } from 'express';
import type { IJwtAdapter } from '../adapters/types.js';
import { AppError } from '../utils/AppError.js';

export function createAuthenticateMiddleware(jwtAdapter: IJwtAdapter) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const header = req.headers.authorization;

      if (!header?.startsWith('Bearer ')) {
        throw new AppError(401, 'unauthorized', 'Token de autenticação não informado');
      }

      const token = header.slice('Bearer '.length).trim();

      if (!token) {
        throw new AppError(401, 'unauthorized', 'Token de autenticação não informado');
      }

      const payload = jwtAdapter.verify(token);
      req.user = { id: payload.sub, role: payload.role };
      next();
    } catch (error) {
      next(error);
    }
  };
}
