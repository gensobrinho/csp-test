import { beforeEach, describe, expect, it } from '@jest/globals';
import TEXTS from '@shared/i18n';
import { renderWithProviders } from '@shared/utils/testSetup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { AUTH_TEST_CREDENTIALS, AUTH_TEST_USER } from '../../mocks/auth-test-data.mock';
import {
  mockAuthenticate, mockResetLogin, mockSetSession, mockUseAuthState, mockUseLogin, resetLoginMocks,
} from '../../mocks/login-hooks.mock';
import LoginScreen from '../../views/LoginScreen';

describe('Login', () => {
  beforeEach(() => { resetLoginMocks(); });

  describe('Rendering', () => {
    it('should render the title, required inputs and access button', () => {
      renderWithProviders(<LoginScreen />);
      const title = screen.queryByRole('heading', { name: TEXTS.auth.login });
      const username = screen.queryByLabelText(TEXTS.auth.username, { exact: false, selector: 'input' });
      const password = screen.queryByLabelText(TEXTS.auth.password, { exact: false, selector: 'input' });
      const access = screen.queryByRole('button', { name: TEXTS.auth.access });
      expect(title).toBeInTheDocument();
      expect(username).toBeRequired();
      expect(password).toBeRequired();
      expect(password).toHaveAttribute('type', 'password');
      expect(access).toBeEnabled();
    });

    it('should disable inputs and submission while authenticating', () => {
      mockUseLogin.mockReturnValue({
        authenticate: mockAuthenticate, isLoading: true, reset: mockResetLogin,
      });
      renderWithProviders(<LoginScreen />);
      const username = screen.queryByLabelText(TEXTS.auth.username, { exact: false, selector: 'input' });
      const password = screen.queryByLabelText(TEXTS.auth.password, { exact: false, selector: 'input' });
      const access = screen.queryByRole('button', { name: TEXTS.auth.accessing });
      expect(username).toBeDisabled();
      expect(password).toBeDisabled();
      expect(access).toBeDisabled();
    });
  });

  describe('Actions', () => {
    it('should prevent submission when required fields are empty', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginScreen />);
      const access = screen.queryByRole('button', { name: TEXTS.auth.access });
      await user.click(access!);
      expect(mockAuthenticate).not.toHaveBeenCalled();
    });

    it('should submit the entered username and password', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginScreen />);
      const username = screen.queryByLabelText(TEXTS.auth.username, { exact: false, selector: 'input' });
      const password = screen.queryByLabelText(TEXTS.auth.password, { exact: false, selector: 'input' });
      const access = screen.queryByRole('button', { name: TEXTS.auth.access });
      await user.type(username!, AUTH_TEST_CREDENTIALS.username);
      await user.type(password!, AUTH_TEST_CREDENTIALS.password);
      await user.click(access!);
      expect(mockAuthenticate).toHaveBeenCalledTimes(1);
      expect(mockAuthenticate).toHaveBeenCalledWith(AUTH_TEST_CREDENTIALS);
    });

    it('should reset the previous error when editing credentials', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginScreen />);
      const username = screen.queryByLabelText(TEXTS.auth.username, { exact: false, selector: 'input' });
      await user.type(username!, 'a');
      expect(mockResetLogin).toHaveBeenCalledTimes(1);
    });

    it('should show and hide the password after losing focus', async () => {
      const user = userEvent.setup();

      renderWithProviders(<LoginScreen />);

      const password = screen.queryByLabelText(TEXTS.auth.password, { exact: false, selector: 'input' });
      const username = screen.queryByLabelText(TEXTS.auth.username, { exact: false, selector: 'input' });

      await user.type(password!, AUTH_TEST_CREDENTIALS.password);
      await user.click(username!);

      const showPassword = screen.queryByRole('button', { name: TEXTS.input.showPassword });

      expect(showPassword).toBeInTheDocument();
      await user.click(showPassword!);
      expect(password).toHaveAttribute('type', 'text');
      const hidePassword = screen.queryByRole('button', { name: TEXTS.input.hidePassword });
      await user.click(hidePassword!);
      expect(password).toHaveAttribute('type', 'password');
      expect(password).toHaveValue(AUTH_TEST_CREDENTIALS.password);
    });
  });

  describe('Navigation', () => {
    it('should redirect an authenticated user to the home screen', () => {
      mockUseAuthState.mockReturnValue({
        user: AUTH_TEST_USER, isHydrated: true, setSession: mockSetSession,
      });
      renderWithProviders(
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<h1>{TEXTS.home.title}</h1>} />
        </Routes>,
        { initialEntries: ['/login'] },
      );
      const homeTitle = screen.queryByRole('heading', { name: TEXTS.home.title });
      const loginTitle = screen.queryByRole('heading', { name: TEXTS.auth.login });
      expect(homeTitle).toBeInTheDocument();
      expect(loginTitle).not.toBeInTheDocument();
    });
  });
});