import { jest } from '@jest/globals';
import type { useAuthState } from '@features/Auth/hooks/useAuthState';
import type { useLogout } from '@features/Auth/hooks/useLogout';
import { AUTH_TEST_USER } from '@features/Auth/mocks/auth-test-data.mock';
import type { useChangePassword } from '@features/User/hooks/useChangePassword';

export const mockLogout = jest.fn<ReturnType<typeof useLogout>['logout']>();
export const mockUseLogout = jest.fn<typeof useLogout>();
export const mockChangePassword = jest.fn<ReturnType<typeof useChangePassword>['changePassword']>();
export const mockUseChangePassword = jest.fn<typeof useChangePassword>();
const mockSetSession = jest.fn<ReturnType<typeof useAuthState>['setSession']>();
const mockUseAuthState = jest.fn<typeof useAuthState>();

jest.mock('@features/Auth/hooks/useAuthState', () => ({ useAuthState: mockUseAuthState }));
jest.mock('@features/Auth/hooks/useLogout', () => ({ useLogout: mockUseLogout }));
jest.mock('@features/User/hooks/useChangePassword', () => ({
  useChangePassword: mockUseChangePassword,
}));

export function resetHomeMocks() {
  jest.resetAllMocks();
  mockUseAuthState.mockReturnValue({
    user: AUTH_TEST_USER, isHydrated: true, setSession: mockSetSession,
  });
  mockUseLogout.mockReturnValue({
    logout: mockLogout, isLoading: false, error: null,
  });
  mockUseChangePassword.mockReturnValue({
    changePassword: mockChangePassword,
    isChanging: false,
  });
}
