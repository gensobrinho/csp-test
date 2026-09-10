import { AxiosError } from 'axios';

export interface IBaseRepository {
  getResponseErrorStatus: (error: AxiosError) => number | null;
  addQueryParams: (url: string, params: { [key: string]: any }) => string;
}