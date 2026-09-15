import { AuthError } from '../types/AuthError.ts';
import type { AuthSession, IAuthRepository, LoginCredentials } from '../types/IAuthRepository';
import { getApiErrorId } from '../../../shared/api/apiError';

export interface AuthStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const AUTH_TOKEN_KEY = 'auth_token';

function toAuthError(error: unknown): AuthError {
  if (error instanceof AuthError) {
    return error;
  }

  const errorId = getApiErrorId(error);

  if (errorId === 'invalid_credentials') {
    return new AuthError('invalidCredentials');
  }

  if (
    errorId === 'invalid_session'
    || errorId === 'invalid_token'
    || errorId === 'unauthorized'
  ) {
    return new AuthError('invalidSession');
  }

  return new AuthError('unknown');
}

export class AuthManager {
  private readonly repository: IAuthRepository;
  private readonly storage: AuthStorage;

  constructor(repository: IAuthRepository, storage: AuthStorage) {
    this.repository = repository;
    this.storage = storage;
  }

  async authenticate(credentials: LoginCredentials): Promise<AuthSession> {
    const username = credentials.username.trim().toLowerCase();
    if (!username || !credentials.password) {
      throw new AuthError('invalidCredentials');
    }

    try {
      const { accessToken } = await this.repository.authenticate({ ...credentials, username });
      const user = await this.repository.getUserInfo(accessToken);
      try {
        this.storage.setItem(AUTH_TOKEN_KEY, accessToken);
      } catch {
        throw new AuthError('sessionUnavailable');
      }
      return { token: accessToken, user };
    } catch (error: unknown) {
      throw toAuthError(error);
    }
  }

  async restoreSession(): Promise<AuthSession | null> {
    let token: string | null;
    try {
      token = await this.storage.getItem(AUTH_TOKEN_KEY);
    } catch {
      throw new AuthError('sessionUnavailable');
    }
    if (!token) {
      return null;
    }

    try {
      const user = await this.repository.getUserInfo(token);
      return { token, user };
    } catch (error: unknown) {
      const authError = toAuthError(error);
      if (authError.code === 'invalidSession') {
        this.signOut();
        return null;
      }
      throw authError;
    }
  }

  signOut() {
    try {
      this.storage.removeItem(AUTH_TOKEN_KEY);
    } catch {
      throw new AuthError('sessionUnavailable');
    }
  }
}
