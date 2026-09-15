import type { TDemandStatus } from './TDemandStatus';

export type TDemand = {
  id: string;
  title: string;
  description: string;
  responsibleId: string;
  responsibleName: string;
  deadline: string;
  status: TDemandStatus;
};
