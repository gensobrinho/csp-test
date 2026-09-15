import { DEMAND_DRAG_MIME } from '../constants/kanbanColumns';
import type { TDemandStatus } from '../types/TDemandStatus';

export type TDemandDragPayload = {
  demandId: string;
  fromStatus: TDemandStatus;
  title: string;
};

export function serializeDemandDragPayload(payload: TDemandDragPayload) {
  return JSON.stringify(payload);
}

export function parseDemandDragPayload(raw: string | undefined | null): TDemandDragPayload | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as TDemandDragPayload;
    if (!parsed?.demandId || !parsed?.fromStatus) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function readDemandDragPayload(dataTransfer: DataTransfer): TDemandDragPayload | null {
  return (
    parseDemandDragPayload(dataTransfer.getData(DEMAND_DRAG_MIME))
    ?? parseDemandDragPayload(dataTransfer.getData('text/plain'))
  );
}
