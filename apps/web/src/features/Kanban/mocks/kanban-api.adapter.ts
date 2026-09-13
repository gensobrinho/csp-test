import type { AxiosAdapter, AxiosResponse } from 'axios';
import { KANBAN_API } from '@shared/api';
import { MOCK_DEMANDS } from './demands.mock';
import type { TDemandStatus } from '../types/TDemandStatus';
import type { TPaginatedDemands } from '../types/IKanbanRepository';

const MOCK_REQUEST_DELAY_MS = 250;

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

  let items = [...MOCK_DEMANDS];
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

export const kanbanMockAdapter: AxiosAdapter = async (config) => {
  await new Promise<void>((resolve) => setTimeout(resolve, MOCK_REQUEST_DELAY_MS));

  const url = config.url ?? '';
  const isDemandsList =
    config.method === 'get' && url.startsWith(KANBAN_API.ENTRY_POINTS.GET_DEMANDS);

  if (!isDemandsList) {
    throw new Error('Kanban mock route not found');
  }

  const response: AxiosResponse<TPaginatedDemands> = {
    data: paginateDemands(url),
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  };
  return response;
};
