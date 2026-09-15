import { KANBAN_COLUMNS } from "../constants/kanbanColumns";
import { TDemandStatus } from "../types/TDemandStatus";

export function formatDeadline(deadline: string) {
    const date = new Date(`${deadline}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      return deadline;
    }
    return new Intl.DateTimeFormat('pt-BR').format(date);
  }
  
export function getStatusBackground(status: TDemandStatus) {
    return KANBAN_COLUMNS.find((column) => column.status === status)?.background
      ?? '#EEF1F4';
  }
  