import styled from '@emotion/styled';

export const Backdrop = styled.div({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(27, 58, 75, 0.28)',
  zIndex: 40,
});

export const Panel = styled.aside<{ $width: string }>(({ theme, $width }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 50,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  width: $width,
  maxWidth: '100vw',
  height: '100vh',
  backgroundColor: theme.colors.default.surface,
  borderLeft: `1px solid ${theme.colors.default.border}`,
  boxShadow: '-8px 0 24px rgba(27, 58, 75, 0.12)',
}));

export const Header = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '20px 24px',
  borderBottom: `1px solid ${theme.colors.default.border}`,
}));

export const Title = styled.h2(({ theme }) => ({
  margin: 0,
  fontSize: 20,
  fontWeight: 700,
  color: theme.colors.default.primaryText,
}));

export const CloseButton = styled.button(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  padding: 0,
  border: 0,
  borderRadius: 8,
  background: 'transparent',
  color: theme.colors.default.primaryText,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.colors.default.disabledBg,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.default.focus}`,
    outlineOffset: 2,
  },
  svg: { width: 20, height: 20 },
}));

export const Body = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: 24,
});

export const Footer = styled.div(({ theme }) => ({
  display: 'flex',
  gap: 12,
  padding: 24,
  borderTop: `1px solid ${theme.colors.default.border}`,
}));
