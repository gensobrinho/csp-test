import styled from '@emotion/styled';
import { BoxContent } from '@shared/components';

export const LoginPage = styled(BoxContent)({
  boxSizing: 'border-box',
  minHeight: '100vh',
  '@supports (min-height: 100dvh)': { minHeight: '100dvh' },
});

export const LoginCard = styled(BoxContent)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: 400,
  border: `1px solid ${theme.colors.default.border}`,
  boxShadow: `0 8px 24px ${theme.colors.default.border}66`,
  '@media (max-width: 480px)': { padding: 24 },
}));

export const LoginTitle = styled.h1(({ theme }) => ({
  margin: 0,
  color: theme.colors.default.primaryText,
  fontSize: 24,
  fontWeight: 600,
  textAlign: "center",
}));

export const LoginForm = styled(BoxContent)({
  width: '100%',
});