import { BoxContent } from '@shared/components';
import TEXTS from '@shared/i18n';

export default function UserScreen() {
  return (
    <BoxContent as="main" pad={32} gap={8}>
      <h1>{TEXTS.placeholders.usersTitle}</h1>
    </BoxContent>
  );
}
