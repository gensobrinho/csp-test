import { type KeyboardEvent } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@features/Auth/hooks/useAuthState';
import { useGetDemandsList } from '@features/Kanban/hooks/useGetDemandsList';
import type { TDemandStatus } from '@features/Kanban/types/TDemandStatus';
import { formatDeadline } from '@features/Kanban/utils/helperFunctions';
import { Button, Spinner } from '@shared/components';
import TEXTS from '@shared/i18n';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';
import {
  DemandCard,
  DemandCardMeta,
  DemandCardTitle,
  DemandsHeader,
  DemandsList,
  DemandsPage,
  DemandsTitle,
  EmptyState,
} from './styles/DemandScreen.styled';

const STATUS_LABELS: Record<TDemandStatus, string> = {
  not_started: TEXTS.kanban.columns.notStarted,
  in_progress: TEXTS.kanban.columns.inProgress,
  paused: TEXTS.kanban.columns.paused,
  in_homologation: TEXTS.kanban.columns.inHomologation,
  in_production: TEXTS.kanban.columns.inProduction,
};

export default function DemandScreen() {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const { demands, isLoading } = useGetDemandsList();
  const canCreateDemand = user?.role === 'admin' || user?.role === 'agilist';

  const handleOpenDemand = (demandId: string) => {
    navigate(`/demandas/${demandId}/editar`);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLLIElement>, demandId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenDemand(demandId);
    }
  };

  return (
    <DemandsPage>
      <DemandsHeader>
        <DemandsTitle>{TEXTS.placeholders.demandsTitle}</DemandsTitle>
        {canCreateDemand && (
          <Button onClick={() => navigate(RoutesEnum.DEMAND_CREATE)}>
            <FiPlus aria-hidden="true" />
            {TEXTS.kanban.newDemand}
          </Button>
        )}
      </DemandsHeader>

      {isLoading ? (
        <Spinner centered size={28} />
      ) : demands.length === 0 ? (
        <EmptyState>{TEXTS.demands.emptyList}</EmptyState>
      ) : (
        <DemandsList>
          {demands.map((demand) => (
            <DemandCard
              key={demand.id}
              role="button"
              tabIndex={0}
              onClick={() => handleOpenDemand(demand.id)}
              onKeyDown={(event) => handleCardKeyDown(event, demand.id)}
              aria-label={demand.title}
            >
              <DemandCardTitle>{demand.title}</DemandCardTitle>
              <DemandCardMeta>
                <span>{demand.responsibleName}</span>
                <span>{STATUS_LABELS[demand.status]}</span>
                <span>{formatDeadline(demand.deadline)}</span>
              </DemandCardMeta>
            </DemandCard>
          ))}
        </DemandsList>
      )}
    </DemandsPage>
  );
}
