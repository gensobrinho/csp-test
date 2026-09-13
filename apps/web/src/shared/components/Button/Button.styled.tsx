import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import type { ButtonProps } from './Button';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const StyledButton = styled.button<{
  $variant: NonNullable<ButtonProps['variant']>;
  $fullWidth: boolean;
}>(({ theme, $variant, $fullWidth }) => {
  const colors = theme.colors.default;
  const variants = {
    primary: {
      background: colors.accent,
      border: colors.accent,
      text: colors.primaryText,
      hover: colors.accentHover,
    },
    secondary: {
      background: colors.surface,
      border: colors.accentBorder,
      text: colors.primaryText,
      hover: colors.accentSurface,
    },
    danger: {
      background: colors.surface,
      border: colors.danger,
      text: colors.danger,
      hover: colors.dangerSurface,
    },
  };
  const variant = variants[$variant];

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxSizing: 'border-box',
    minHeight: 40,
    width: $fullWidth ? '100%' : 'auto',
    padding: '10px 18px',
    borderRadius: 6,
    border: `1px solid ${variant.border}`,
    backgroundColor: variant.background,
    color: variant.text,
    fontFamily: 'inherit',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.25,
    cursor: 'pointer',
    transition: 'background-color 150ms ease, border-color 150ms ease',
    '&:hover:not(:disabled)': {
      backgroundColor: variant.hover,
      borderColor: variant.border,
    },
    '&:focus': { outline: 'none' },
    '&:focus-visible': {
      outline: `2px solid ${colors.focus}`,
      outlineOffset: 3,
    },
    '&:disabled': {
      backgroundColor: colors.disabledBg,
      borderColor: colors.border,
      color: colors.secondaryText,
      cursor: 'not-allowed',
    },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  };
});

export const Spinner = styled.span({
  width: 14,
  height: 14,
  flexShrink: 0,
  border: '2px solid currentColor',
  borderRightColor: 'transparent',
  borderRadius: '50%',
  animation: `${spin} 700ms linear infinite`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
});