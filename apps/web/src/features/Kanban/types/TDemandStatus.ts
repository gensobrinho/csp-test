export type TDemandStatus =
  | 'not_started'
  | 'in_progress'
  | 'paused'
  | 'in_homologation'
  | 'completed';

export const DEMAND_STATUSES: TDemandStatus[] = [
  'not_started',
  'in_progress',
  'paused',
  'in_homologation',
  'completed',
];
