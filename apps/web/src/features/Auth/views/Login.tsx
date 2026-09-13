import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { BoxContent, Button, Input } from '@shared/components';
import TEXTS from '@shared/i18n';
import { useAuthState } from '../hooks/useAuthState';
import { useLogin } from '../hooks/useLogin';
import { RoutesEnum } from '../../../_app/types/RoutesEnum';
import { LoginPage, LoginCard, LoginTitle, LoginForm } from './styles/Login.styled';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuthState();
  const { authenticate, isLoading, error, reset } = useLogin();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isLoading) {
      authenticate({ username, password })
    };
  }

  if (user) {
    return <Navigate to={RoutesEnum.HOME} replace />;
  }

  return (
    <LoginPage as="main" center bg="bg" pad={24}>
      <LoginCard bg="surface" radius={12} pad={32} gap={24} fit>
        <LoginTitle>{TEXTS.auth.login}</LoginTitle>
        <LoginForm as="form" gap={20} fit onSubmit={handleSubmit} aria-busy={isLoading}>
          <Input
            label={TEXTS.auth.username}
            name="username"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder={TEXTS.auth.usernamePlaceholder}
            value={username}
            onChange={(event) => { setUsername(event.target.value); reset(); }}
            disabled={isLoading}
            required
          />
          <Input
            label={TEXTS.auth.password}
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={TEXTS.auth.passwordPlaceholder}
            value={password}
            onChange={(event) => { setPassword(event.target.value); reset(); }}
            disabled={isLoading}
            required
          />
          {error && <BoxContent role="alert" fit>{error}</BoxContent>}
          <Button type="submit" fullWidth isLoading={isLoading}>
            {isLoading ? TEXTS.auth.accessing : TEXTS.auth.access}
          </Button>
        </LoginForm>
      </LoginCard>
    </LoginPage>
  );
};

export default Login;