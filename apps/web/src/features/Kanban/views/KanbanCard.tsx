import TEXTS from '@shared/i18n';
import { FiCalendar, FiMoreVertical } from 'react-icons/fi';
import type { TDemand } from '../types/TDemand';
import type { TDemandStatus } from '../types/TDemandStatus';
import {
  Avatar,
  CardMenuButton,
  CardMeta,
  CardMetaLeft,
  CardRoot,
  CardTitle,
  CardTop,
  Deadline,
  StatusPill,
} from './styles/KanbanScreen.styled';

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function formatDeadline(deadline: string) {
  const date = new Date(`${deadline}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return deadline;
  }
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

const STATUS_LABELS: Record<TDemandStatus, string> = {
  not_started: TEXTS.kanban.columns.notStarted,
  in_progress: TEXTS.kanban.columns.inProgress,
  paused: TEXTS.kanban.columns.paused,
  in_homologation: TEXTS.kanban.columns.inHomologation,
  completed: TEXTS.kanban.columns.completed,
};

export interface KanbanCardProps {
  demand: TDemand;
  statusBackground: string;
}

export default function KanbanCard({ demand, statusBackground }: KanbanCardProps) {
  return (
    <CardRoot>
      <CardTop>
        <CardTitle>{demand.title}</CardTitle>
        <CardMenuButton type="button" aria-label={TEXTS.kanban.cardMenu}>
          <FiMoreVertical aria-hidden="true" />
        </CardMenuButton>
      </CardTop>
      <CardMeta>
        <CardMetaLeft>
          <Avatar aria-hidden="true">{getInitials(demand.responsibleName)}</Avatar>
          <StatusPill $background={statusBackground}>
            {STATUS_LABELS[demand.status]}
          </StatusPill>
        </CardMetaLeft>
        <Deadline>
          <FiCalendar aria-hidden="true" />
          <span>{formatDeadline(demand.deadline)}</span>
        </Deadline>
      </CardMeta>
    </CardRoot>
  );
}
