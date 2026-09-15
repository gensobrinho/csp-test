import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-12px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const ToastViewport = styled.div({
  position: 'fixed',
  top: 24,
  right: 24,
  zIndex: 80,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: 'min(100% - 32px, 380px)',
  pointerEvents: 'none',
});

export const ToastCard = styled.div(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  width: '100%',
  padding: '14px 16px',
  borderRadius: 12,
  backgroundColor: theme.colors.default.surface,
  border: `1px solid ${theme.colors.default.border}`,
  boxShadow: '0 12px 32px rgba(27, 58, 75, 0.14)',
  animation: `${slideIn} 180ms ease-out`,
  pointerEvents: 'auto',
}));

export const IconSlot = styled.div(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 36,
  height: 36,
  borderRadius: 10,
  backgroundColor: theme.colors.default.accentSurface,
  color: theme.colors.default.primaryText,
  svg: {
    width: 20,
    height: 20,
  },
}));

export const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  flex: 1,
  minWidth: 0,
});

export const Title = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 15,
  fontWeight: 700,
  lineHeight: 1.3,
  color: theme.colors.default.primaryText,
}));

export const Description = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 13,
  lineHeight: 1.45,
  color: theme.colors.default.secondaryText,
}));

export const CloseButton = styled.button(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  margin: '-4px -4px 0 0',
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
  svg: {
    width: 18,
    height: 18,
  },
}));
