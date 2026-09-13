export type TDemandStatus =
  | 'not_started'
  | 'in_progress'
  | 'paused'
  | 'in_homologation'
  | 'in_production';

export const DEMAND_STATUSES: TDemandStatus[] = [
  'not_started',
  'in_progress',
  'paused',
  'in_homologation',
  'in_production',
];

export const LOCKED_DEMAND_STATUS: TDemandStatus = 'in_production';
