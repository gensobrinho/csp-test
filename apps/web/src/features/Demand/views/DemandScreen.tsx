import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { BoxContent, Button } from '@shared/components';
import TEXTS from '@shared/i18n';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';

export default function DemandScreen() {
  const navigate = useNavigate();

  return (
    <BoxContent as="main" pad={32} gap={16}>
      <BoxContent flexRow justify="space-between" align="center" fit gap={16}>
        <h1>{TEXTS.placeholders.demandsTitle}</h1>
        <Button onClick={() => navigate(RoutesEnum.DEMAND_CREATE)}>
          <FiPlus aria-hidden="true" />
          {TEXTS.kanban.newDemand}
        </Button>
      </BoxContent>
    </BoxContent>
  );
}
