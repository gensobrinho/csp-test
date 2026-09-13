export type AuthErrorCode = 'invalidCredentials' | 'invalidSession' | 'sessionUnavailable' | 'unknown';

export class AuthError extends Error {
  readonly code: AuthErrorCode;

  constructor(code: AuthErrorCode) {
    super(code);
    this.name = 'AuthError';
    this.code = code;
  }
}