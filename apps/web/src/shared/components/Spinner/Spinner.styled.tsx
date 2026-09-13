import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const SpinnerRoot = styled.span<{ $size: number; $thickness: number }>(
  ({ theme, $size, $thickness }) => ({
    display: 'inline-block',
    boxSizing: 'border-box',
    width: $size,
    height: $size,
    flexShrink: 0,
    border: `${$thickness}px solid currentColor`,
    borderRightColor: 'transparent',
    borderRadius: '50%',
    color: theme.colors.default.primaryText,
    animation: `${spin} 700ms linear infinite`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  }),
);

export const SpinnerCenter = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: 16,
});
