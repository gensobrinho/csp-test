import type { TAuthUser, TRole } from '@features/Auth';

export type TCreateUserPayload = {
  name: string;
  role: TRole;
  password: string;
};

export type TUpdateUserPayload = {
  name: string;
  role: TRole;
  password?: string;
};

export interface IUserRepository {
  getUsers(): Promise<TAuthUser[]>;
  getUserById(id: string): Promise<TAuthUser>;
  createUser(payload: TCreateUserPayload): Promise<TAuthUser>;
  updateUser(id: string, payload: TUpdateUserPayload): Promise<TAuthUser>;
  deleteUser(id: string): Promise<void>;
}
