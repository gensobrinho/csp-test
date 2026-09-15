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

export const SelectControl = styled(BoxContent)({
  position: 'relative',
  width: '100%',
});

export const StyledSelect = styled.select(({ theme }) => {
  const colors = theme.colors.default;

  return {
    appearance: 'none',
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 0,
    minHeight: 44,
    padding: '10px 40px 10px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.primaryText,
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: 1.5,
    cursor: 'pointer',
    transition: 'border-color 150ms ease',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7C86' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
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
    '& option[value=""]': {
      color: colors.secondaryText,
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
