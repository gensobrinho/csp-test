import styled from '@emotion/styled';

export const FormPage = styled.main(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
  maxWidth: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  padding: 32,
  overflow: 'hidden',
  backgroundColor: theme.colors.default.bg,
}));

export const FormHeader = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginBottom: 24,
  flexShrink: 0,
  minWidth: 0,
  maxWidth: '100%',
});

export const FormTitle = styled.h1(({ theme }) => ({
  margin: 0,
  fontSize: 32,
  fontWeight: 700,
  lineHeight: 1.2,
  color: theme.colors.default.primaryText,
}));

export const FormCard = styled.form(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  width: '100%',
  maxWidth: '100%',
  border: `1px solid ${theme.colors.default.border}`,
  borderRadius: 16,
  padding: 28,
  backgroundColor: theme.colors.default.surface,
  overflow: 'hidden',
}));

export const FormFields = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  maxWidth: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
});

export const FormActions = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  gap: 12,
  marginTop: 'auto',
  paddingTop: 28,
  flexShrink: 0,
  minWidth: 0,
  maxWidth: '100%',
});
