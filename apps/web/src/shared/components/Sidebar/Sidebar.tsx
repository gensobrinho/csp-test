import type { IconType } from 'react-icons';
import TEXTS from '@shared/i18n';
import { BrandLink, NavItem, NavList, SidebarRoot } from './Sidebar.styled';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';

export interface SidebarNavItem {
  to: string;
  label: string;
  icon: IconType;
  end?: boolean;
}

export interface SidebarProps {
  items: SidebarNavItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  return (
    <SidebarRoot aria-label={TEXTS.sidebar.navigation}>
      <BrandLink to={RoutesEnum.HOME}>{TEXTS.sidebar.brand}</BrandLink>
      <NavList>
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavItem key={to} to={to} end={end}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </NavItem>
        ))}
      </NavList>
    </SidebarRoot>
  );
}
