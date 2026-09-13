import { jest } from '@jest/globals';
import type { useAuthState } from '@features/Auth/hooks/useAuthState';
import type { useLogout } from '@features/Auth/hooks/useLogout';
import { AUTH_TEST_USER } from '@features/Auth/mocks/auth-test-data.mock';

export const mockLogout = jest.fn<ReturnType<typeof useLogout>['logout']>();
export const mockUseLogout = jest.fn<typeof useLogout>();
const mockSetSession = jest.fn<ReturnType<typeof useAuthState>['setSession']>();
const mockUseAuthState = jest.fn<typeof useAuthState>();

jest.mock('@features/Auth/hooks/useAuthState', () => ({ useAuthState: mockUseAuthState }));
jest.mock('@features/Auth/hooks/useLogout', () => ({ useLogout: mockUseLogout }));

export function resetHomeMocks() {
  jest.resetAllMocks();
  mockUseAuthState.mockReturnValue({
    user: AUTH_TEST_USER, isHydrated: true, setSession: mockSetSession,
  });
  mockUseLogout.mockReturnValue({
    logout: mockLogout, isLoading: false, error: null,
  });
}