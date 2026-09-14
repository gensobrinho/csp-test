import styled from '@emotion/styled';

export const Backdrop = styled.div({
  position: 'fixed',
  inset: 0,
  zIndex: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
  backgroundColor: 'rgba(27, 58, 75, 0.28)',
});

export const Panel = styled.div(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
  maxWidth: 440,
  padding: 24,
  borderRadius: 16,
  backgroundColor: theme.colors.default.surface,
  border: `1px solid ${theme.colors.default.border}`,
  boxShadow: '0 16px 40px rgba(27, 58, 75, 0.16)',
}));

export const Header = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 12,
});

export const Title = styled.h2(({ theme }) => ({
  margin: 0,
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.3,
  color: theme.colors.default.primaryText,
}));

export const CloseButton = styled.button(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  margin: '-6px -6px 0 0',
  padding: 0,
  border: 0,
  borderRadius: 8,
  background: 'transparent',
  color: theme.colors.default.primaryText,
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: theme.colors.default.disabledBg,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.default.focus}`,
    outlineOffset: 2,
  },
  svg: { width: 20, height: 20 },
}));

export const Description = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  lineHeight: 1.5,
  color: theme.colors.default.secondaryText,
}));

export const Actions = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  gap: 12,
  marginTop: 8,
});
