import { AuthError } from '../types/AuthError.ts';
import type { AuthSession, IAuthRepository, LoginCredentials } from '../types/IAuthRepository';

export interface AuthStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const AUTH_TOKEN_KEY = 'auth_token';

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
      throw error instanceof AuthError ? error : new AuthError('unknown');
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
      if (error instanceof AuthError && error.code === 'invalidSession') {
        this.signOut();
        return null;
      }
      throw error instanceof AuthError ? error : new AuthError('unknown');
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