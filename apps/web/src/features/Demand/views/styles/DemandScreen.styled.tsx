import styled from '@emotion/styled';

export const DemandsPage = styled.main(({ theme }) => ({
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

export const DemandsHeader = styled.header({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  flexWrap: 'wrap',
  flexShrink: 0,
});

export const DemandsTitle = styled.h1(({ theme }) => ({
  margin: 0,
  fontSize: 32,
  fontWeight: 700,
  lineHeight: 1.2,
  color: theme.colors.default.primaryText,
}));

export const DemandsList = styled.ul({
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

export const DemandCard = styled.li(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
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
}));

export const DemandCardTitle = styled.span(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.35,
  color: theme.colors.default.primaryText,
}));

export const DemandCardMeta = styled.div(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  fontSize: 13,
  color: theme.colors.default.secondaryText,
}));

export const EmptyState = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  color: theme.colors.default.secondaryText,
}));
