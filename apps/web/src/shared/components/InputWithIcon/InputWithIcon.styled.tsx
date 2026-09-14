import styled from '@emotion/styled';
import BoxContent from '../BoxContent/BoxContent';

export const Field = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  minWidth: 0,
  width: '100%',
});

export const Label = styled.label(({ theme }) => ({
  color: theme.colors.default.primaryText,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.5,
}));

export const RequiredMark = styled.span(({ theme }) => ({
  color: theme.colors.default.danger,
}));

export const VisuallyHidden = styled.span({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

export const InputControl = styled(BoxContent)({
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  minWidth: 0,
});

export const StyledInput = styled.input(({ theme }) => {
  const colors = theme.colors.default;

  return {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    minHeight: 44,
    padding: '10px 44px 10px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.primaryText,
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: 1.5,
    transition: 'border-color 150ms ease',
    colorScheme: 'light',
    '&::placeholder': { color: colors.secondaryText, opacity: 1 },
    '&:hover:not(:disabled)': { borderColor: colors.grey },
    '&:focus': {
      outline: `2px solid ${colors.focus}`,
      outlineOffset: 2,
      borderColor: colors.focus,
    },
    '&:disabled': {
      backgroundColor: colors.disabledBg,
      color: colors.secondaryText,
      cursor: 'not-allowed',
    },
    '&[type="date"]': {
      display: 'block',
    },
    '&[type="date"]::-webkit-calendar-picker-indicator': {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      opacity: 0,
      cursor: 'pointer',
    },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  };
});

export const IconButton = styled.button(({ theme }) => ({
  position: 'absolute',
  right: 4,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  padding: 0,
  border: 0,
  borderRadius: 6,
  background: 'transparent',
  color: theme.colors.default.secondaryText,
  cursor: 'pointer',
  pointerEvents: 'none',
  svg: { width: 18, height: 18 },
}));
