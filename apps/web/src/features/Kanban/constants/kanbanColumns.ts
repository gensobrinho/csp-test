import TEXTS from '@shared/i18n';
import { theme } from '@shared/theme';
import type { TDemandStatus } from '../types/TDemandStatus';

const colors = theme.colors.default;

export type TKanbanColumnConfig = {
  status: TDemandStatus;
  title: string;
  background: string;
  dotColor: string;
  borderColor?: string;
};

export const KANBAN_COLUMNS: TKanbanColumnConfig[] = [
  {
    status: 'not_started',
    title: TEXTS.kanban.columns.notStarted,
    background: colors.disabledBg,
    dotColor: colors.grey,
  },
  {
    status: 'in_progress',
    title: TEXTS.kanban.columns.inProgress,
    background: colors.lightBlue,
    dotColor: '#4A90B8',
  },
  {
    status: 'paused',
    title: TEXTS.kanban.columns.paused,
    background: colors.lightPink,
    dotColor: '#D45A6A',
  },
  {
    status: 'in_homologation',
    title: TEXTS.kanban.columns.inHomologation,
    background: colors.yellow,
    dotColor: '#D4A017',
  },
  {
    status: 'in_production',
    title: TEXTS.kanban.columns.inProduction,
    background: colors.lightGreen,
    dotColor: '#3D9B6C',
  },
];

export const DEMAND_DRAG_MIME = 'application/x-csp-demand';
