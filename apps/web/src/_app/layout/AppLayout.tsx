import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@shared/components';
import { APP_NAV_ITEMS } from './navItems';

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
  backgroundColor: theme.colors.default.surface,
}));

export function AppLayout() {
  return (
    <LayoutRoot>
      <Sidebar items={APP_NAV_ITEMS} />
      <MainArea>
        <Outlet />
      </MainArea>
    </LayoutRoot>
  );
}
