import { BoxContent } from '@/src/shared/components';
import TEXTS from '@/src/shared/i18n';

export interface IKanbanProps {}

export default function UserScreen() {
    return (
      <BoxContent as="main" pad={32} gap={8}>
        <h1>{TEXTS.placeholders.kanbanTitle}</h1>
      </BoxContent>
    );
  }