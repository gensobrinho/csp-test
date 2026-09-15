import type { TAuthUser } from '@features/Auth';
import type {
  IUserRepository,
  TCreateUserPayload,
  TGetUsersParams,
  TUpdateUserPayload,
} from '../types/IUserRepository';

export class UserManager {
  private readonly repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  getUsers(params?: TGetUsersParams): Promise<TAuthUser[]> {
    return this.repository.getUsers(params);
  }

  getUserById(id: string): Promise<TAuthUser> {
    return this.repository.getUserById(id);
  }

  createUser(payload: TCreateUserPayload): Promise<TAuthUser> {
    return this.repository.createUser(payload);
  }

  updateUser(id: string, payload: TUpdateUserPayload): Promise<TAuthUser> {
    return this.repository.updateUser(id, payload);
  }

  deleteUser(id: string): Promise<void> {
    return this.repository.deleteUser(id);
  }
}
