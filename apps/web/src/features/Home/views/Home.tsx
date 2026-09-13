import { BoxContent, Button } from '@shared/components';
import TEXTS from '@shared/i18n';
import { useAuthState } from '@features/Auth/hooks/useAuthState';
import { useLogout } from '@features/Auth/hooks/useLogout';

export default function Home() {
  const { user } = useAuthState();
  const { logout, isLoading, error } = useLogout();
  return (
    <BoxContent as="main" bg="bg" pad={24} gap={16}>
      <h1>{TEXTS.home.title}</h1>
      <BoxContent bg="surface" radius={12} pad={24} gap={16} align="flex-start">
        <p>{TEXTS.home.signedInAs} {user?.name}</p>
        {user && <p>{TEXTS.home.profile}: {TEXTS.auth.roles[user.role]}</p>}
        {error && <p role="alert">{error}</p>}
        <Button variant="secondary" isLoading={isLoading} onClick={() => logout()}>
          {TEXTS.auth.logout}
        </Button>
      </BoxContent>
    </BoxContent>
  );
}