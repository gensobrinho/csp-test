import { AxiosError } from 'axios';
import { IBaseRepository } from '../types/IBaseRepository';

export class BaseRepository implements IBaseRepository {
  getResponseErrorStatus(error: AxiosError) {
    return error.response?.status ?? null;
  }

  addQueryParams(url: string, params: { [key: string]: any }): string {
    if (!params) {
      return url;
    }

    const [baseUrl, queryString] = url.split('?');
    const urlHasParams = !!queryString;
    let paramString = queryString ?? '';

    Object.keys(params).forEach((key, index) => {
      if (params[key] !== undefined) {
        const separator = !urlHasParams && index === 0 ? '?' : '&';
        paramString += `${separator}${key}=${params[key]}`;
      }
    });

    return `${baseUrl}${paramString}`;
  }
}
