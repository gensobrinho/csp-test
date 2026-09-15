import { mockLogout, mockUseLogout, resetHomeMocks } from '../../mocks/home-hooks.mock';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@shared/utils/testSetup';
import TEXTS from '@shared/i18n';
import { AUTH_TEST_USER } from '@features/Auth/mocks/auth-test-data.mock';
import Home from '../../views/Home';

describe('Home', () => {
  beforeEach(() => { resetHomeMocks(); });

  describe('Rendering', () => {
    it('should display the authenticated user name and role', () => {
      renderWithProviders(<Home />);
      const name = screen.queryByText(TEXTS.home.signedInAs + ' ' + AUTH_TEST_USER.name);
      const profile = screen.queryByText(TEXTS.home.profile + ': ' + TEXTS.auth.roles.admin);
      expect(name).toBeInTheDocument();
      expect(profile).toBeInTheDocument();
    });

    it('should disable logout while signing out', () => {
      mockUseLogout.mockReturnValue({
        logout: mockLogout, isLoading: true, error: null,
      });
      renderWithProviders(<Home />);
      const logoutButton = screen.queryByRole('button', { name: TEXTS.auth.logout });
      expect(logoutButton).toBeDisabled();
    });

    it('should display an error when signing out fails', () => {
      mockUseLogout.mockReturnValue({
        logout: mockLogout, isLoading: false, error: TEXTS.auth.errors.sessionUnavailable,
      });
      renderWithProviders(<Home />);
      const alert = screen.queryByRole('alert');
      expect(alert).toHaveTextContent(TEXTS.auth.errors.sessionUnavailable);
    });
  });

  describe('Actions', () => {
    it('should request logout when clicking the logout button', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Home />);
      const logoutButton = screen.queryByRole('button', { name: TEXTS.auth.logout });
      await user.click(logoutButton!);
      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockLogout).toHaveBeenCalledWith();
    });
  });
});