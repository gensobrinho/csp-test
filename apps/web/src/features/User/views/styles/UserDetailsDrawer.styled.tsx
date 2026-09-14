import styled from '@emotion/styled';

export const DetailsField = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const DetailsFieldLabel = styled.span(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  color: theme.colors.default.primaryText,
  lineHeight: 1.5,
}));

export const DetailsValue = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1.35,
  color: theme.colors.default.primaryText,
}));

export const DetailsProfile = styled.span(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.default.primaryText,
  lineHeight: 1.4,
}));

export const DetailsActions = styled.div({
  display: 'flex',
  gap: 12,
  width: '100%',
  button: { flex: 1 },
});

export const DetailsError = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.default.danger,
}));
