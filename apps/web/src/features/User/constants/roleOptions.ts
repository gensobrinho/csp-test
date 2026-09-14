import type { TRole } from '@features/Auth';
import TEXTS from '@shared/i18n';
import type { SelectOption } from '@shared/components';

export const ROLE_OPTIONS: SelectOption[] = [
  { value: 'admin' satisfies TRole, label: TEXTS.auth.roles.admin },
  { value: 'agilist' satisfies TRole, label: TEXTS.auth.roles.agilist },
  { value: 'developer' satisfies TRole, label: TEXTS.auth.roles.developer },
];
