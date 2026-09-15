export type TError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
  id: string;
};

export class AppError extends Error {
  readonly statusCode: number;
  readonly id: string;
  readonly details?: Record<string, unknown>;

  constructor(
    statusCode: number,
    id: string,
    message: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.id = id;
    this.details = details;
  }

  toTError(): TError {
    return {
      code: String(this.statusCode),
      message: this.message,
      details: this.details,
      timestamp: new Date().toISOString(),
      id: this.id,
    };
  }
}
