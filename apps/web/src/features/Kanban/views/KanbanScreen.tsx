import { InputWithIcon } from '@shared/components';
import TEXTS from '@shared/i18n';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { KANBAN_COLUMNS } from '../constants/kanbanColumns';
import { useKanbanSearchState } from '../hooks/useKanbanSearchState';
import { useLoadColumnDemands } from '../hooks/useLoadColumnDemands';
import type { TDemandStatus } from '../types/TDemandStatus';
import KanbanColumn from './KanbanColumn';
import {
  Board,
  KanbanHeader,
  KanbanPage,
  KanbanTitle,
  SearchField,
} from './styles/KanbanScreen.styled';

const SEARCH_DEBOUNCE_MS = 300;

function KanbanColumnContainer({
  status,
  title,
  background,
  dotColor,
  borderColor,
}: {
  status: TDemandStatus;
  title: string;
  background: string;
  dotColor: string;
  borderColor?: string;
}) {
  const { data, total, hasMore, isLoading, isFetchingMore, loadMore } =
    useLoadColumnDemands(status);

  return (
    <KanbanColumn
      title={title}
      background={background}
      dotColor={dotColor}
      borderColor={borderColor}
      data={data}
      total={total}
      hasMore={hasMore}
      loading={isLoading || isFetchingMore}
      onLoadMore={loadMore}
    />
  );
}

export default function KanbanScreen() {
  const { searchQuery, setSearchQuery } = useKanbanSearchState();
  const [searchDraft, setSearchDraft] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchQuery(searchDraft.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchDraft, setSearchQuery]);

  const applySearch = () => setSearchQuery(searchDraft.trim());

  return (
    <KanbanPage>
      <KanbanHeader>
        <KanbanTitle>{TEXTS.kanban.title}</KanbanTitle>
        <SearchField>
          <InputWithIcon
            label={TEXTS.kanban.searchLabel}
            hideLabel
            placeholder={TEXTS.kanban.searchPlaceholder}
            value={searchDraft}
            onChange={(event) => setSearchDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                applySearch();
              }
            }}
            icon={<FiSearch aria-hidden="true" />}
            iconAriaLabel={TEXTS.kanban.searchAriaLabel}
            onIconClick={applySearch}
          />
        </SearchField>
      </KanbanHeader>

      <Board>
        {KANBAN_COLUMNS.map((column) => (
          <KanbanColumnContainer
            key={column.status}
            status={column.status}
            title={column.title}
            background={column.background}
            dotColor={column.dotColor}
            borderColor={column.borderColor}
          />
        ))}
      </Board>
    </KanbanPage>
  );
}
