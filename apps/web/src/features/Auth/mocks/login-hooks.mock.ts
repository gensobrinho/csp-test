import { jest } from '@jest/globals';
import type { useLogin } from '../hooks/useLogin';
import type { useAuthState } from '../hooks/useAuthState';

export const mockAuthenticate = jest.fn<ReturnType<typeof useLogin>['authenticate']>();
export const mockResetLogin = jest.fn<ReturnType<typeof useLogin>['reset']>();
export const mockSetSession = jest.fn<ReturnType<typeof useAuthState>['setSession']>();
export const mockUseLogin = jest.fn<typeof useLogin>();
export const mockUseAuthState = jest.fn<typeof useAuthState>();

jest.mock('../hooks/useLogin', () => ({ useLogin: mockUseLogin }));
jest.mock('../hooks/useAuthState', () => ({ useAuthState: mockUseAuthState }));

export function resetLoginMocks() {
  jest.resetAllMocks();
  mockUseLogin.mockReturnValue({
    authenticate: mockAuthenticate, isLoading: false, reset: mockResetLogin,
  });
  mockUseAuthState.mockReturnValue({
    user: null, isHydrated: true, setSession: mockSetSession,
  });
}
