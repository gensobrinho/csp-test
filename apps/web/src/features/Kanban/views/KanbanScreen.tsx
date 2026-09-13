import { useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button, InputWithIcon } from '@shared/components';
import TEXTS from '@shared/i18n';
import { useAuthState } from '@features/Auth/hooks/useAuthState';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';
import { KANBAN_COLUMNS } from '../constants/kanbanColumns';
import { useKanbanSearchState } from '../hooks/useKanbanSearchState';
import { useLoadColumnDemands } from '../hooks/useLoadColumnDemands';
import { useMoveDemand } from '../hooks/useMoveDemand';
import { useSelectedDemandState } from '../hooks/useSelectedDemandState';
import type { TDemandStatus } from '../types/TDemandStatus';
import { canDragDemand, canMoveDemandStatus } from '../utils/canDragDemand';
import DemandDetailsDrawer from './DemandDetailsDrawer';
import KanbanColumn from './KanbanColumn';
import {
  Board,
  BoardFeedback,
  HeaderActions,
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
  canDragCards,
  onDropDemand,
  onOpenDemand,
}: {
  status: TDemandStatus;
  title: string;
  background: string;
  dotColor: string;
  borderColor?: string;
  canDragCards: boolean;
  onDropDemand: (payload: {
    demandId: string;
    fromStatus: TDemandStatus;
    toStatus: TDemandStatus;
    title: string;
  }) => void;
  onOpenDemand: (demandId: string) => void;
}) {
  const { data, total, hasMore, isLoading, isFetchingMore, loadMore } =
    useLoadColumnDemands(status);

  return (
    <KanbanColumn
      status={status}
      title={title}
      background={background}
      dotColor={dotColor}
      borderColor={borderColor}
      data={data}
      total={total}
      hasMore={hasMore}
      loading={isLoading || isFetchingMore}
      canDragCards={canDragCards}
      onLoadMore={loadMore}
      onDropDemand={onDropDemand}
      onOpenDemand={onOpenDemand}
    />
  );
}

export default function KanbanScreen() {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const { searchQuery, setSearchQuery } = useKanbanSearchState();
  const { selectedDemandId, setSelectedDemandId } = useSelectedDemandState();
  const { moveDemand, isMoving, error: moveError, reset: resetMoveError } = useMoveDemand();
  const [searchDraft, setSearchDraft] = useState(searchQuery);
  const [feedback, setFeedback] = useState<string | null>(null);
  const allowDrag = canDragDemand(user?.role);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchQuery(searchDraft.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchDraft, setSearchQuery]);

  useEffect(() => {
    if (moveError) {
      setFeedback(moveError);
    }
  }, [moveError]);

  const handleDropDemand = ({
    demandId,
    fromStatus,
    toStatus,
  }: {
    demandId: string;
    fromStatus: TDemandStatus;
    toStatus: TDemandStatus;
    title: string;
  }) => {
    resetMoveError();

    if (fromStatus === toStatus) {
      return;
    }

    if (!canMoveDemandStatus(fromStatus, toStatus)) {
      setFeedback(TEXTS.kanban.errors.lockedStatus);
      return;
    }

    setFeedback(null);
    moveDemand(
      { id: demandId, fromStatus, toStatus },
      {
        onSuccess: () => setFeedback(null),
      },
    );
  };

  return (
    <KanbanPage>
      <KanbanHeader>
        <KanbanTitle>{TEXTS.kanban.title}</KanbanTitle>
        <HeaderActions>
          <SearchField>
            <InputWithIcon
              label={TEXTS.kanban.searchLabel}
              hideLabel
              placeholder={TEXTS.kanban.searchPlaceholder}
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
              icon={<FiSearch aria-hidden="true" />}
              iconAriaLabel={TEXTS.kanban.searchAriaLabel}
              onIconClick={() => setSearchQuery(searchDraft.trim())}
            />
          </SearchField>
          <Button onClick={() => navigate(RoutesEnum.DEMAND_CREATE)}>
            <FiPlus aria-hidden="true" />
            {TEXTS.kanban.newDemand}
          </Button>
        </HeaderActions>
      </KanbanHeader>

      {feedback && <BoardFeedback role="alert">{feedback}</BoardFeedback>}

      <Board aria-busy={isMoving || undefined}>
        {KANBAN_COLUMNS.map((column) => (
          <KanbanColumnContainer
            key={column.status}
            status={column.status}
            title={column.title}
            background={column.background}
            dotColor={column.dotColor}
            borderColor={column.borderColor}
            canDragCards={allowDrag}
            onDropDemand={handleDropDemand}
            onOpenDemand={setSelectedDemandId}
          />
        ))}
      </Board>

      <DemandDetailsDrawer
        demandId={selectedDemandId}
        onClose={() => setSelectedDemandId(null)}
      />
    </KanbanPage>
  );
}
