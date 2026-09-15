import styled from '@emotion/styled';

export const UsersPage = styled.main(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  boxSizing: 'border-box',
  height: '100%',
  minHeight: 0,
  padding: 32,
  overflow: 'hidden',
  backgroundColor: theme.colors.default.bg,
}));

export const UsersHeader = styled.header({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  flexWrap: 'wrap',
  flexShrink: 0,
});

export const UsersTitle = styled.h1(({ theme }) => ({
  margin: 0,
  fontSize: 32,
  fontWeight: 700,
  lineHeight: 1.2,
  color: theme.colors.default.primaryText,
}));

export const UsersList = styled.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
});

export const UserCard = styled.li(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  width: '100%',
  boxSizing: 'border-box',
  padding: '14px 16px',
  borderRadius: 12,
  border: `1px solid ${theme.colors.default.border}`,
  backgroundColor: theme.colors.default.surface,
  cursor: 'pointer',
  transition: 'background-color 150ms ease, border-color 150ms ease',
  '&:hover': {
    backgroundColor: theme.colors.default.disabledBg,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.default.focus}`,
    outlineOffset: 2,
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
}));

export const UserAvatar = styled.span(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: theme.colors.default.lightBlue,
  color: theme.colors.default.primaryText,
  fontSize: 14,
  fontWeight: 700,
  flexShrink: 0,
}));

export const UserName = styled.span(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.35,
  color: theme.colors.default.primaryText,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const DeleteButton = styled.button(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  padding: 0,
  border: 0,
  borderRadius: 8,
  background: 'transparent',
  color: theme.colors.default.danger,
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: theme.colors.default.dangerSurface,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.default.focus}`,
    outlineOffset: 2,
  },
  svg: {
    width: 18,
    height: 18,
  },
}));

export const EmptyState = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  color: theme.colors.default.secondaryText,
}));

export const Feedback = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.default.danger,
}));
