import styled from '@emotion/styled';

export const DetailsField = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const DetailsFieldLabel = styled.span(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  color: theme.colors.default.secondaryText,
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
}));

export const DetailsTitleValue = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1.35,
  color: theme.colors.default.primaryText,
}));

export const DetailsResponsible = styled.div(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.default.primaryText,
}));

export const DetailsDescription = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  lineHeight: 1.5,
  color: theme.colors.default.secondaryText,
}));

export const DetailsActions = styled.div({
  display: 'flex',
  gap: 12,
  width: '100%',
  button: { flex: 1 },
});
