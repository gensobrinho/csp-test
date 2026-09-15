export type PaginationParams = {
  page: number;
  limit: number;
};

export type PaginatedResult<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export function parsePagination(
  page?: string | number,
  limit?: string | number,
): PaginationParams {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  return {
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : DEFAULT_PAGE,
    limit:
      Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.floor(parsedLimit) : DEFAULT_LIMIT,
  };
}

export function buildPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResult<T> {
  return {
    data,
    page,
    limit,
    total,
    hasMore: page * limit < total,
  };
}

export function paginationSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}
