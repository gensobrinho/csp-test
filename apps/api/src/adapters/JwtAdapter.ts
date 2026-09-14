import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';
import type { IJwtAdapter, JwtPayload, Role } from './types.js';

export class JwtAdapter implements IJwtAdapter {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string,
  ) {}

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  verify(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as jwt.JwtPayload;

      if (typeof decoded.sub !== 'string' || typeof decoded.role !== 'string') {
        throw new AppError(401, 'invalid_token', 'Token inválido');
      }

      return {
        sub: decoded.sub,
        role: decoded.role as Role,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(401, 'invalid_token', 'Token inválido ou expirado');
    }
  }
}
