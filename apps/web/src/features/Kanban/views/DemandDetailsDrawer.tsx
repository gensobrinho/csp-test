import { FiCalendar, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Button, Drawer, Spinner } from '@shared/components';
import TEXTS from '@shared/i18n';
import { KANBAN_COLUMNS } from '../constants/kanbanColumns';
import { useDemandDetails } from '../hooks/useDemandDetails';
import type { TDemandStatus } from '../types/TDemandStatus';
import { Avatar, Deadline, StatusPill } from './styles/KanbanScreen.styled';
import {
  DetailsActions,
  DetailsDescription,
  DetailsField,
  DetailsFieldLabel,
  DetailsResponsible,
  DetailsTitleValue,
} from './styles/DemandDetailsDrawer.styled';

const STATUS_LABELS: Record<TDemandStatus, string> = {
  not_started: TEXTS.kanban.columns.notStarted,
  in_progress: TEXTS.kanban.columns.inProgress,
  paused: TEXTS.kanban.columns.paused,
  in_homologation: TEXTS.kanban.columns.inHomologation,
  in_production: TEXTS.kanban.columns.inProduction,
};

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

function getStatusBackground(status: TDemandStatus) {
  return KANBAN_COLUMNS.find((column) => column.status === status)?.background
    ?? '#EEF1F4';
}

export interface DemandDetailsDrawerProps {
  demandId: string | null;
  onClose: () => void;
}

export default function DemandDetailsDrawer({ demandId, onClose }: DemandDetailsDrawerProps) {
  const { demand, isLoading } = useDemandDetails(demandId);

  return (
    <Drawer
      open={Boolean(demandId)}
      onClose={onClose}
      title={TEXTS.demands.detailsTitle}
      closeAriaLabel={TEXTS.demands.closeDetails}
      footer={(
        <DetailsActions>
          <Button variant="secondary" type="button">
            <FiEdit2 aria-hidden="true" />
            {TEXTS.demands.edit}
          </Button>
          <Button variant="danger" type="button">
            <FiTrash2 aria-hidden="true" />
            {TEXTS.demands.delete}
          </Button>
        </DetailsActions>
      )}
    >
      {isLoading || !demand ? (
        <Spinner centered size={24} />
      ) : (
        <>
          <DetailsField>
            <DetailsFieldLabel>{TEXTS.demands.fields.title}</DetailsFieldLabel>
            <DetailsTitleValue>{demand.title}</DetailsTitleValue>
          </DetailsField>

          <DetailsField>
            <DetailsFieldLabel>{TEXTS.demands.fields.responsible}</DetailsFieldLabel>
            <DetailsResponsible>
              <Avatar aria-hidden="true">{getInitials(demand.responsibleName)}</Avatar>
              <span>{demand.responsibleName}</span>
            </DetailsResponsible>
          </DetailsField>

          <DetailsField>
            <DetailsFieldLabel>{TEXTS.demands.fields.status}</DetailsFieldLabel>
            <StatusPill $background={getStatusBackground(demand.status)}>
              {STATUS_LABELS[demand.status]}
            </StatusPill>
          </DetailsField>

          <DetailsField>
            <DetailsFieldLabel>{TEXTS.demands.fields.deadline}</DetailsFieldLabel>
            <Deadline>
              <FiCalendar aria-hidden="true" />
              <span>{formatDeadline(demand.deadline)}</span>
            </Deadline>
          </DetailsField>

          <DetailsField>
            <DetailsFieldLabel>{TEXTS.demands.fields.description}</DetailsFieldLabel>
            <DetailsDescription>{demand.description}</DetailsDescription>
          </DetailsField>
        </>
      )}
    </Drawer>
  );
}
