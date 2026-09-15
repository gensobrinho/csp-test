import { AUTH_API, DemoApi } from '@shared/api';
import { BaseRepository } from '../../../shared/utils/BaseRepository';
import type { IAuthRepository, LoginCredentials } from '../types/IAuthRepository';
import type { TAuthUser } from '../types/TAuthUser';

export class AuthRepository extends BaseRepository implements IAuthRepository {
  private readonly api: DemoApi;

  constructor(api: DemoApi) {
    super();
    this.api = api;
  }

  async authenticate(credentials: LoginCredentials) {
    const response = await this.api.post<{ accessToken: string }>(
      AUTH_API.ENTRY_POINTS.POST_LOGIN, credentials,
    );
    return response.data;
  }

  async getUserInfo(token: string) {
    const response = await this.api.get<TAuthUser>(AUTH_API.ENTRY_POINTS.GET_USER_INFO, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}