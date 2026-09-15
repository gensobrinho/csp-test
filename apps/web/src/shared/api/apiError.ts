export type TApiErrorBody = {
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
  timestamp?: string;
  id?: string;
};

export function getApiErrorBody(error: unknown): TApiErrorBody | undefined {
  if (!error || typeof error !== 'object') {
    return undefined;
  }

  const response = (error as { response?: { data?: unknown } }).response;
  const data = response?.data;

  if (!data || typeof data !== 'object') {
    return undefined;
  }

  return data as TApiErrorBody;
}

export function getApiErrorId(error: unknown): string | undefined {
  return getApiErrorBody(error)?.id;
}

export function getApiErrorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') {
    return undefined;
  }

  return (error as { response?: { status?: number } }).response?.status;
}
