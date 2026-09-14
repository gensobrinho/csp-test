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
  color: theme.colors.default.danger,
}));

export const StyledTextarea = styled.textarea(({ theme }) => {
  const colors = theme.colors.default;

  return {
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 0,
    minHeight: 120,
    padding: '10px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.primaryText,
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: 1.5,
    resize: 'vertical',
    transition: 'border-color 150ms ease',
    '&::placeholder': { color: colors.secondaryText, opacity: 1 },
    '&:hover:not(:disabled)': { borderColor: colors.grey },
    '&:focus': {
      outline: `2px solid ${colors.focus}`,
      outlineOffset: 2,
      borderColor: colors.focus,
    },
    '&[aria-invalid="true"]': { borderColor: colors.danger },
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
