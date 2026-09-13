import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';

export const SidebarRoot = styled.aside(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  width: 240,
  minWidth: 240,
  minHeight: '100vh',
  padding: '32px 20px',
  backgroundColor: theme.colors.default.accent,
  color: theme.colors.default.primaryText,
}));

export const BrandLink = styled(Link)(({ theme }) => ({
  margin: 0,
  marginBottom: 40,
  padding: '0 12px',
  fontSize: 22,
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  color: theme.colors.default.primaryText,
  textDecoration: 'none',
  display: 'inline-block',
  cursor: 'pointer',
}));

export const NavList = styled.nav({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const NavItem = styled(NavLink)(({ theme }) => {
  const colors = theme.colors.default;

  return {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    boxSizing: 'border-box',
    minHeight: 44,
    padding: '10px 12px',
    borderRadius: 10,
    color: colors.primaryText,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.2,
    textDecoration: 'none',
    transition: 'background-color 150ms ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.28)',
    },
    '&.active': {
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
      fontWeight: 600,
    },
    '&:focus': { outline: 'none' },
    '&:focus-visible': {
      outline: `2px solid ${colors.focus}`,
      outlineOffset: 2,
    },
    svg: {
      flexShrink: 0,
      width: 20,
      height: 20,
    },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  };
});
