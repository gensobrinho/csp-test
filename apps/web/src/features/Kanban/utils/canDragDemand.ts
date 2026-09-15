import type { TRole } from '@features/Auth';
import { LOCKED_DEMAND_STATUS, type TDemandStatus } from '../types/TDemandStatus';

export function canDragDemand(role: TRole | undefined) {
  return role === 'agilist' || role === 'developer';
}

export function canMoveDemandStatus(fromStatus: TDemandStatus, toStatus: TDemandStatus) {
  if (fromStatus === toStatus) {
    return false;
  }
  if (fromStatus === LOCKED_DEMAND_STATUS) {
    return false;
  }
  return true;
}
