import type { AxiosAdapter, AxiosResponse } from 'axios';
import { KANBAN_API } from '@shared/api';
import { demandsStore } from './demands.mock';
import type { TDemand } from '../types/TDemand';
import type { TDemandStatus } from '../types/TDemandStatus';
import type { TPaginatedDemands, TUpdateDemandPayload } from '../types/IKanbanRepository';
import { LOCKED_DEMAND_STATUS } from '../types/TDemandStatus';

const MOCK_REQUEST_DELAY_MS = 250;
const DEMAND_ID_PATH = new RegExp(`^${KANBAN_API.ENTRY_POINTS.GET_DEMANDS}/([^/?]+)`);

function parseParams(url = '') {
  const query = url.includes('?') ? url.slice(url.indexOf('?') + 1) : '';
  const params = new URLSearchParams(query);
  return {
    status: params.get('status') as TDemandStatus | null,
    page: Number(params.get('page') ?? 1),
    limit: Number(params.get('limit') ?? 10),
    search: params.get('search') ?? '',
  };
}

function paginateDemands(url?: string): TPaginatedDemands {
  const { status, page, limit, search } = parseParams(url);
  const normalizedSearch = search.trim().toLowerCase();

  let items = [...demandsStore];
  if (status) {
    items = items.filter((demand) => demand.status === status);
  }
  if (normalizedSearch) {
    items = items.filter((demand) => demand.title.toLowerCase().includes(normalizedSearch));
  }

  items.sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  );

  const total = items.length;
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;
  const start = (safePage - 1) * safeLimit;
  const data = items.slice(start, start + safeLimit);

  return {
    data,
    page: safePage,
    limit: safeLimit,
    total,
    hasMore: start + safeLimit < total,
  };
}

function parseBody<T>(data: unknown): T {
  if (typeof data === 'string') {
    return JSON.parse(data) as T;
  }
  return data as T;
}

function getDemandIdFromUrl(url: string) {
  return DEMAND_ID_PATH.exec(url)?.[1] ?? null;
}

function getDemandById(url: string): TDemand {
  const id = getDemandIdFromUrl(url);
  const demand = demandsStore.find((item) => item.id === id);
  if (!demand) {
    throw Object.assign(new Error('Demand not found'), { status: 404 });
  }
  return { ...demand };
}

function updateDemand(url: string, body: TUpdateDemandPayload): TDemand {
  const id = getDemandIdFromUrl(url);
  const demand = demandsStore.find((item) => item.id === id);
  if (!demand) {
    throw Object.assign(new Error('Demand not found'), { status: 404 });
  }
  if (demand.status === LOCKED_DEMAND_STATUS && body.status !== LOCKED_DEMAND_STATUS) {
    throw Object.assign(new Error('Demand in production cannot change status'), { status: 400 });
  }
  demand.status = body.status;
  return { ...demand };
}

function rejectWithStatus(
  config: Parameters<AxiosAdapter>[0],
  error: unknown,
) {
  const status = (error as { status?: number }).status ?? 500;
  const response: AxiosResponse<{ message: string }> = {
    data: { message: (error as Error).message },
    status,
    statusText: status === 400 ? 'Bad Request' : 'Error',
    headers: {},
    config,
  };
  return Promise.reject({ response, config, isAxiosError: true });
}

export const kanbanMockAdapter: AxiosAdapter = async (config) => {
  await new Promise<void>((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));

  const url = config.url ?? '';
  const method = config.method?.toLowerCase();
  const demandId = getDemandIdFromUrl(url);

  if (method === 'get' && url.startsWith(KANBAN_API.ENTRY_POINTS.GET_DEMANDS) && !demandId) {
    const response: AxiosResponse<TPaginatedDemands> = {
      data: paginateDemands(url),
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
    return response;
  }

  if (method === 'get' && demandId) {
    try {
      const response: AxiosResponse<TDemand> = {
        data: getDemandById(url),
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
      return response;
    } catch (error) {
      return rejectWithStatus(config, error);
    }
  }

  if ((method === 'patch' || method === 'put') && demandId) {
    try {
      const data = updateDemand(url, parseBody<TUpdateDemandPayload>(config.data));
      const response: AxiosResponse<TDemand> = {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
      return response;
    } catch (error) {
      return rejectWithStatus(config, error);
    }
  }

  throw new Error('Kanban mock route not found');
};
