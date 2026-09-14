import type { TAuthUser } from '@features/Auth';
import type {
  IUserRepository,
  TCreateUserPayload,
  TUpdateUserPayload,
} from '../types/IUserRepository';

export class UserManager {
  private readonly repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  getUsers(): Promise<TAuthUser[]> {
    return this.repository.getUsers();
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
