import type { TAuthUser, TRole } from '@features/Auth';

export type TGetUsersParams = {
  role?: string;
};

export type TCreateUserPayload = {
  username: string;
  name: string;
  role: TRole;
  password: string;
};

export type TUpdateUserPayload = {
  username?: string;
  name: string;
  role: TRole;
  password?: string;
};

export interface IUserRepository {
  getUsers(params?: TGetUsersParams): Promise<TAuthUser[]>;
  getUserById(id: string): Promise<TAuthUser>;
  createUser(payload: TCreateUserPayload): Promise<TAuthUser>;
  updateUser(id: string, payload: TUpdateUserPayload): Promise<TAuthUser>;
  deleteUser(id: string): Promise<void>;
}
