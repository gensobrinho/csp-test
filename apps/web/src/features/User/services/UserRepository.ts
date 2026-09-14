import { DemoApi, USER_API } from '@shared/api';
import type { TAuthUser } from '@features/Auth';
import { BaseRepository } from '../../../shared/utils/BaseRepository';
import type {
  IUserRepository,
  TCreateUserPayload,
  TUpdateUserPayload,
} from '../types/IUserRepository';

export class UserRepository extends BaseRepository implements IUserRepository {
  private readonly api: DemoApi;

  constructor(api: DemoApi) {
    super();
    this.api = api;
  }

  async getUsers(): Promise<TAuthUser[]> {
    const response = await this.api.get<TAuthUser[]>(USER_API.ENTRY_POINTS.GET_USERS);
    return response.data;
  }

  async getUserById(id: string): Promise<TAuthUser> {
    const response = await this.api.get<TAuthUser>(
      `${USER_API.ENTRY_POINTS.GET_USERS}/${id}`,
    );
    return response.data;
  }

  async createUser(payload: TCreateUserPayload): Promise<TAuthUser> {
    const response = await this.api.post<TAuthUser>(
      USER_API.ENTRY_POINTS.CREATE_USER,
      payload,
    );
    return response.data;
  }

  async updateUser(id: string, payload: TUpdateUserPayload): Promise<TAuthUser> {
    const response = await this.api.put<TAuthUser>(
      `${USER_API.ENTRY_POINTS.UPDATE_USER}/${id}`,
      payload,
    );
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.api.delete(`${USER_API.ENTRY_POINTS.DELETE_USER}/${id}`);
  }
}
