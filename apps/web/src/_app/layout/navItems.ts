import { FiFileText, FiGrid, FiUsers } from 'react-icons/fi';
import type { TRole } from '@features/Auth';
import type { SidebarNavItem } from '@shared/components/Sidebar/Sidebar';
import TEXTS from '@shared/i18n';
import { RoutesEnum } from '../types/RoutesEnum';

export type AppNavItem = SidebarNavItem & {
  roles?: TRole[];
};

export const APP_NAV_ITEMS: AppNavItem[] = [
  { to: RoutesEnum.KANBAN, label: TEXTS.sidebar.kanban, icon: FiGrid, end: true },
  { to: RoutesEnum.DEMANDS, label: TEXTS.sidebar.demandas, icon: FiFileText },
  {
    to: RoutesEnum.USERS,
    label: TEXTS.sidebar.usuarios,
    icon: FiUsers,
    roles: ['admin'],
  },
];

export function getNavItemsForRole(role?: TRole | null): SidebarNavItem[] {
  return APP_NAV_ITEMS
    .filter((item) => !item.roles || (role != null && item.roles.includes(role)))
    .map(({ roles: _roles, ...item }) => item);
}
