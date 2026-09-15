import styled from '@emotion/styled';

export const UserMenuRoot = styled.div({
  position: 'relative',
  flexShrink: 0,
});

export const UserMenuAvatar = styled.button(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  padding: 0,
  border: `1px solid ${theme.colors.default.border}`,
  borderRadius: '50%',
  backgroundColor: theme.colors.default.lightBlue,
  color: theme.colors.default.primaryText,
  fontFamily: 'inherit',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.colors.default.accentSurface,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.default.focus}`,
    outlineOffset: 2,
  },
}));

export const UserMenuPanel = styled.div(({ theme }) => ({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  zIndex: 40,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  minWidth: 200,
  padding: 12,
  borderRadius: 12,
  border: `1px solid ${theme.colors.default.border}`,
  backgroundColor: theme.colors.default.surface,
  boxShadow: '0 12px 28px rgba(27, 58, 75, 0.14)',
}));

export const UserMenuName = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.35,
  color: theme.colors.default.primaryText,
}));
