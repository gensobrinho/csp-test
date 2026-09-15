import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '@features/Auth/hooks/useAuthState';
import { useLogout } from '@features/Auth/hooks/useLogout';
import { Button } from '@shared/components';
import TEXTS from '@shared/i18n';
import { getInitials } from '@/src/shared/utils/helperFunctions';
import {
  UserMenuAvatar,
  UserMenuName,
  UserMenuPanel,
  UserMenuRoot,
} from "./styles/UserMenu.styled";

export default function UserMenu() {
  const { user } = useAuthState();
  const { logout, isLoading } = useLogout();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!user) {
    return null;
  }

  return (
    <UserMenuRoot ref={rootRef}>
      <UserMenuAvatar
        type="button"
        aria-label={TEXTS.kanban.userMenu}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
      >
        {getInitials(user.name)}
      </UserMenuAvatar>

      {open && (
        <UserMenuPanel role="menu">
          <UserMenuName>{user.name}</UserMenuName>
          <Button
            variant="secondary"
            fullWidth
            isLoading={isLoading}
            onClick={() => logout()}
          >
            {TEXTS.auth.logout}
          </Button>
        </UserMenuPanel>
      )}
    </UserMenuRoot>
  );
}
