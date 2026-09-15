import { FormEvent, useState } from 'react';
import { BoxContent, Button, Input } from '@shared/components';
import TEXTS from '@shared/i18n';
import { useAuthState } from '@features/Auth/hooks/useAuthState';
import { useLogout } from '@features/Auth/hooks/useLogout';
import { useChangePassword } from '@features/User/hooks/useChangePassword';

export default function Home() {
  const { user } = useAuthState();
  const { logout, isLoading, error } = useLogout();
  const { changePassword, isChanging } = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError(null);

    if (!currentPassword || !newPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(TEXTS.home.password.mismatch);
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      // toast handled in hook
    }
  };

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

      <BoxContent bg="surface" radius={12} pad={24} gap={16} align="stretch">
        <h2>{TEXTS.home.password.title}</h2>
        <form
          onSubmit={handleChangePassword}
          style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}
        >
          <Input
            label={TEXTS.home.password.current}
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
          <Input
            label={TEXTS.home.password.next}
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            autoComplete="new-password"
          />
          <Input
            label={TEXTS.home.password.confirm}
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            autoComplete="new-password"
          />
          {passwordError && <p role="alert">{passwordError}</p>}
          <Button type="submit" isLoading={isChanging}>
            {TEXTS.home.password.submit}
          </Button>
        </form>
      </BoxContent>
    </BoxContent>
  );
}
