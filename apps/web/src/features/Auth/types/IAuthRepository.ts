import type { TAuthUser } from './TAuthUser';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthSession {
  token: string;
  user: TAuthUser;
}

export interface IAuthRepository {
  authenticate(credentials: LoginCredentials): Promise<{ accessToken: string }>;
  getUserInfo(token: string): Promise<TAuthUser>;
}