import BoxContent from '../BoxContent/BoxContent';
import styled from '@emotion/styled';

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
  color: theme.colors.default.focus,
}));

export const StyledInput = styled.input<{ $hasReveal: boolean }>(({ theme, $hasReveal }) => {
  const colors = theme.colors.default;

  return {
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 0,
    minHeight: 42,
    padding: '10px 12px',
    paddingRight: $hasReveal ? 44 : 12,
    '&::-ms-reveal, &::-ms-clear': { display: 'none' },
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    backgroundColor: colors.surface,
    color: colors.primaryText,
    colorScheme: 'light',
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: 1.5,
    transition: 'border-color 150ms ease',
    '&::placeholder': { color: colors.secondaryText, opacity: 1 },
    '&:hover:not(:disabled)': { borderColor: colors.grey },
    '&:focus': {
      outline: `2px solid ${colors.focus}`,
      outlineOffset: 2,
      borderColor: colors.focus,
    },
    '&[aria-invalid="true"]': { borderColor: colors.danger },
    '&[aria-invalid="true"]:focus': { outlineColor: colors.danger },
    '&:disabled': {
      backgroundColor: colors.disabledBg,
      color: colors.secondaryText,
      cursor: 'not-allowed',
    },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  };
});

export const Message = styled.p<{ $error: boolean }>(({ theme, $error }) => ({
  margin: 0,
  color: $error ? theme.colors.default.danger : theme.colors.default.secondaryText,
  fontSize: 12,
  lineHeight: 1.5,
}));
export const InputControl = styled(BoxContent)({
  position: 'relative',
  width: '100%',
});

export const VisibilityButton = styled.button(({ theme }) => ({
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
  borderRadius: 4,
  background: 'transparent',
  color: theme.colors.default.secondaryText,
  cursor: 'pointer',
  '&:hover:not(:disabled)': {
    background: theme.colors.default.accentSurface,
    color: theme.colors.default.primaryText,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.default.focus}`,
    outlineOffset: 1,
  },
  '&:disabled': { cursor: 'not-allowed', opacity: 0.5 },
}));