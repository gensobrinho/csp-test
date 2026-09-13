import { FiFileText, FiGrid, FiUsers } from 'react-icons/fi';
import type { SidebarNavItem } from '@shared/components/Sidebar/Sidebar';
import TEXTS from '@shared/i18n';
import { RoutesEnum } from '../types/RoutesEnum';

export const APP_NAV_ITEMS: SidebarNavItem[] = [
  { to: RoutesEnum.KANBAN, label: TEXTS.sidebar.kanban, icon: FiGrid, end: true },
  { to: RoutesEnum.DEMANDS, label: TEXTS.sidebar.demandas, icon: FiFileText },
  { to: RoutesEnum.USERS, label: TEXTS.sidebar.usuarios, icon: FiUsers },
];
