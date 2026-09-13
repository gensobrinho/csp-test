import { useRef, type DragEvent } from 'react';
import TEXTS from '@shared/i18n';
import { FiCalendar, FiMoreVertical } from 'react-icons/fi';
import { DEMAND_DRAG_MIME } from '../constants/kanbanColumns';
import type { TDemand } from '../types/TDemand';
import { serializeDemandDragPayload } from '../utils/demandDrag';
import {
  Avatar,
  CardMenuButton,
  CardMeta,
  CardMetaLeft,
  CardRoot,
  CardTitle,
  CardTop,
  Deadline,
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

export interface KanbanCardProps {
  demand: TDemand;
  canDrag?: boolean;
  onOpen?: (demandId: string) => void;
}

export default function KanbanCard({
  demand,
  canDrag = false,
  onOpen,
}: KanbanCardProps) {
  const didDragRef = useRef(false);

  const handleDragStart = (event: DragEvent<HTMLElement>) => {
    if (!canDrag) {
      event.preventDefault();
      return;
    }

    didDragRef.current = true;
    const payload = serializeDemandDragPayload({
      demandId: demand.id,
      fromStatus: demand.status,
      title: demand.title,
    });

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(DEMAND_DRAG_MIME, payload);
    event.dataTransfer.setData('text/plain', payload);
  };

  const handleDragEnd = () => {
    window.setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  };

  return (
    <CardRoot
      draggable={canDrag}
      $draggable={canDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (didDragRef.current) {
          return;
        }
        onOpen?.(demand.id);
      }}
    >
      <CardTop>
        <CardTitle>{demand.title}</CardTitle>
        <CardMenuButton
          type="button"
          draggable={false}
          aria-label={TEXTS.kanban.cardMenu}
          onClick={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <FiMoreVertical aria-hidden="true" />
        </CardMenuButton>
      </CardTop>
      <CardMeta>
        <CardMetaLeft>
          <Avatar aria-hidden="true">{getInitials(demand.responsibleName)}</Avatar>
        </CardMetaLeft>
        <Deadline>
          <FiCalendar aria-hidden="true" />
          <span>{formatDeadline(demand.deadline)}</span>
        </Deadline>
      </CardMeta>
    </CardRoot>
  );
}
