import { BoxContent } from '@shared/components';
import TEXTS from '@shared/i18n';

export default function DemandCreateScreen() {
  return (
    <BoxContent as="main" pad={32} gap={8}>
      <h1>{TEXTS.demands.createTitle}</h1>
    </BoxContent>
  );
}
