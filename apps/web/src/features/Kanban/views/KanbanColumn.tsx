import { useState, type DragEvent } from 'react';
import TEXTS from '@shared/i18n';
import type { TDemand } from '../types/TDemand';
import type { TDemandStatus } from '../types/TDemandStatus';
import { readDemandDragPayload } from '../utils/demandDrag';
import KanbanCard from './KanbanCard';
import {
  ColumnBody,
  ColumnCount,
  ColumnHeader,
  ColumnRoot,
  ColumnTitle,
  EmptyColumnMessage,
  LoadMoreButton,
  StatusDot,
} from './styles/KanbanScreen.styled';

export interface KanbanColumnProps {
  status: TDemandStatus;
  title: string;
  dotColor: string;
  background: string;
  borderColor?: string;
  data: TDemand[];
  total?: number;
  hasMore?: boolean;
  loading?: boolean;
  canDragCards?: boolean;
  onLoadMore?: () => void;
  onDropDemand?: (payload: {
    demandId: string;
    fromStatus: TDemandStatus;
    toStatus: TDemandStatus;
    title: string;
  }) => void;
  onOpenDemand?: (demandId: string) => void;
}

export default function KanbanColumn({
  status,
  title,
  dotColor,
  background,
  borderColor,
  data,
  total,
  hasMore = false,
  loading = false,
  canDragCards = false,
  onLoadMore,
  onDropDemand,
  onOpenDemand,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const count = total ?? data.length;

  const allowDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    allowDrop(event);
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    const payload = readDemandDragPayload(event.dataTransfer);
    if (!payload) {
      return;
    }
    onDropDemand?.({
      ...payload,
      toStatus: status,
    });
  };

  return (
    <ColumnRoot
      $background={background}
      $borderColor={borderColor}
      $isDragOver={isDragOver}
      aria-label={title}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <ColumnHeader>
        <StatusDot $color={dotColor} aria-hidden="true" />
        <ColumnTitle>{title}</ColumnTitle>
        <ColumnCount aria-label={`${count} ${TEXTS.kanban.demandsCount}`}>{count}</ColumnCount>
      </ColumnHeader>

      <ColumnBody onDragOver={allowDrop} onDrop={handleDrop}>
        {data.length === 0 && !loading ? (
          <EmptyColumnMessage>{TEXTS.kanban.emptyColumn}</EmptyColumnMessage>
        ) : (
          data.map((demand) => (
            <KanbanCard
              key={demand.id}
              demand={demand}
              canDrag={canDragCards}
              onOpen={onOpenDemand}
            />
          ))
        )}
      </ColumnBody>

      {hasMore && (
        <LoadMoreButton type="button" disabled={loading} onClick={onLoadMore}>
          {loading ? TEXTS.kanban.loadingMore : TEXTS.kanban.loadMore}
        </LoadMoreButton>
      )}
    </ColumnRoot>
  );
}
