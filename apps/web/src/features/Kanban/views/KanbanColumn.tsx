import TEXTS from '@shared/i18n';
import type { TDemand } from '../types/TDemand';
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
  title: string;
  dotColor: string;
  background: string;
  borderColor?: string;
  data: TDemand[];
  total?: number;
  hasMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
}

export default function KanbanColumn({
  title,
  dotColor,
  background,
  borderColor,
  data,
  total,
  hasMore = false,
  loading = false,
  onLoadMore,
}: KanbanColumnProps) {
  const count = total ?? data.length;

  return (
    <ColumnRoot $background={background} $borderColor={borderColor} aria-label={title}>
      <ColumnHeader>
        <StatusDot $color={dotColor} aria-hidden="true" />
        <ColumnTitle>{title}</ColumnTitle>
        <ColumnCount aria-label={`${count} ${TEXTS.kanban.demandsCount}`}>{count}</ColumnCount>
      </ColumnHeader>

      <ColumnBody>
        {data.length === 0 && !loading ? (
          <EmptyColumnMessage>{TEXTS.kanban.emptyColumn}</EmptyColumnMessage>
        ) : (
          data.map((demand) => (
            <KanbanCard
              key={demand.id}
              demand={demand}
              statusBackground={background}
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
