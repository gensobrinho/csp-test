import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json(error.toTError());
    return;
  }

  if (error instanceof ZodError) {
    const details: Record<string, unknown> = {};

    for (const issue of error.issues) {
      const path = issue.path.join('.') || 'root';
      details[path] = issue.message;
    }

    res.status(400).json({
      code: '400',
      message: 'Dados inválidos',
      details,
      timestamp: new Date().toISOString(),
      id: 'validation_error',
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    code: '500',
    message: 'Erro interno do servidor',
    timestamp: new Date().toISOString(),
    id: 'internal_error',
  });
}
