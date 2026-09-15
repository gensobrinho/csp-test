import type { AxiosAdapter, AxiosResponse } from 'axios';
import { USER_API } from '@shared/api';
import type { TAuthUser } from '@features/Auth';
import type { TCreateUserPayload, TUpdateUserPayload } from '../types/IUserRepository';
import { usersStore } from './users.mock';

const MOCK_REQUEST_DELAY_MS = 250;
const USER_ID_PATH = new RegExp(`^${USER_API.ENTRY_POINTS.GET_USERS}/([^/?]+)`);

function parseBody<T>(data: unknown): T {
  if (typeof data === 'string') {
    return JSON.parse(data) as T;
  }
  return data as T;
}

function getUserIdFromUrl(url: string) {
  return USER_ID_PATH.exec(url)?.[1] ?? null;
}

function rejectWithStatus(
  config: Parameters<AxiosAdapter>[0],
  message: string,
  status = 404,
) {
  const response: AxiosResponse<{ message: string }> = {
    data: { message },
    status,
    statusText: status === 404 ? 'Not Found' : 'Error',
    headers: {},
    config,
  };
  return Promise.reject({ response, config, isAxiosError: true });
}

export const userMockAdapter: AxiosAdapter = async (config) => {
  await new Promise<void>((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));

  const url = config.url ?? '';
  const method = config.method?.toLowerCase();
  const userId = getUserIdFromUrl(url);
  const usersBase = USER_API.ENTRY_POINTS.GET_USERS;

  if (method === 'get' && url.startsWith(usersBase) && !userId) {
    const roleQuery = new URL(url, 'http://localhost').searchParams.get('role');
    const roles = roleQuery
      ? roleQuery.split(',').map((role) => role.trim()).filter(Boolean)
      : null;
    const data = usersStore
      .filter((user) => !roles || roles.includes(user.role))
      .map((user) => ({ ...user }));

    const response: AxiosResponse<TAuthUser[]> = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
    return response;
  }

  if (method === 'get' && userId) {
    const user = usersStore.find((item) => item.id === userId);
    if (!user) {
      return rejectWithStatus(config, 'User not found');
    }
    const response: AxiosResponse<TAuthUser> = {
      data: { ...user },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
    return response;
  }

  if (method === 'post' && url.startsWith(USER_API.ENTRY_POINTS.CREATE_USER) && !userId) {
    const payload = parseBody<TCreateUserPayload>(config.data);
    const user: TAuthUser = {
      id: `u${Date.now()}`,
      name: payload.name.trim(),
      role: payload.role,
    };
    usersStore.push(user);
    const response: AxiosResponse<TAuthUser> = {
      data: { ...user },
      status: 201,
      statusText: 'Created',
      headers: {},
      config,
    };
    return response;
  }

  if (method === 'put' && userId) {
    const user = usersStore.find((item) => item.id === userId);
    if (!user) {
      return rejectWithStatus(config, 'User not found');
    }
    const payload = parseBody<TUpdateUserPayload>(config.data);
    user.name = payload.name.trim();
    user.role = payload.role;
    const response: AxiosResponse<TAuthUser> = {
      data: { ...user },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
    return response;
  }

  if (method === 'delete' && userId) {
    const index = usersStore.findIndex((item) => item.id === userId);
    if (index < 0) {
      return rejectWithStatus(config, 'User not found');
    }
    usersStore.splice(index, 1);
    const response: AxiosResponse<null> = {
      data: null,
      status: 204,
      statusText: 'No Content',
      headers: {},
      config,
    };
    return response;
  }

  throw new Error('User mock route not found');
};
