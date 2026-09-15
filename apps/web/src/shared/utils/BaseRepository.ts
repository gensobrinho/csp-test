import { AxiosError } from 'axios';
import { IBaseRepository } from '../types/IBaseRepository';

export class BaseRepository implements IBaseRepository {
  getResponseErrorStatus(error: AxiosError) {
    return error.response?.status ?? null;
  }

  addQueryParams(url: string, params: Record<string, string | number | boolean | undefined>): string {
    if (!params) {
      return url;
    }

    const [baseUrl, queryString] = url.split('?');
    let paramString = queryString ?? '';
    let hasParams = !!queryString;

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        const separator = hasParams ? '&' : '?';
        paramString += `${separator}${key}=${params[key]}`;
        hasParams = true;
      }
    });

    return `${baseUrl}${paramString}`;
  }
}
