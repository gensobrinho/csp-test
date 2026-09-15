import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { useAuthState } from '@features/Auth/hooks/useAuthState';
import { Sidebar } from '@shared/components';
import { getNavItemsForRole } from './navItems';

const LayoutRoot = styled.div({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
});

const MainArea = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  height: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.default.bg,
}));

export function AppLayout() {
  const { user } = useAuthState();
  const navItems = getNavItemsForRole(user?.role);

  return (
    <LayoutRoot>
      <Sidebar items={navItems} />
      <MainArea>
        <Outlet />
      </MainArea>
    </LayoutRoot>
  );
}
