import { beforeEach, describe, expect, it } from '@jest/globals';
import { AuthManager } from '../../services/AuthManager';
import { AuthError } from '../../types/AuthError';
import { createAuthManagerMocks } from '../../mocks/auth-manager.mock';
import { AUTH_TEST_CREDENTIALS, AUTH_TEST_TOKEN, AUTH_TEST_USER } from '../../mocks/auth-test-data.mock';

describe('AuthManager', () => {
  let manager: AuthManager;
  let mocks: ReturnType<typeof createAuthManagerMocks>;

  beforeEach(() => {
    mocks = createAuthManagerMocks();
    manager = new AuthManager(mocks.repository, mocks.storage);
    mocks.repository.authenticate.mockResolvedValue({ accessToken: AUTH_TEST_TOKEN });
    mocks.repository.getUserInfo.mockResolvedValue(AUTH_TEST_USER);
    mocks.storage.getItem.mockResolvedValue(null);
  });

  describe('authenticate', () => {
    it('should return the user and persist only the token after authentication', () => {
      const authentication = manager.authenticate(AUTH_TEST_CREDENTIALS);
      return authentication.then((session) => {
        expect(session).toEqual({ token: AUTH_TEST_TOKEN, user: AUTH_TEST_USER });
        expect(mocks.repository.authenticate).toHaveBeenCalledWith(AUTH_TEST_CREDENTIALS);
        expect(mocks.repository.getUserInfo).toHaveBeenCalledWith(AUTH_TEST_TOKEN);
        expect(mocks.storage.setItem).toHaveBeenCalledTimes(1);
        expect(mocks.storage.setItem).toHaveBeenCalledWith('auth_token', AUTH_TEST_TOKEN);
      });
    });

    it('should normalize the username without trimming the password', () => {
      const credentials = { username: ' ADMIN ', password: ' CSP123! ' };
      const authentication = manager.authenticate(credentials);
      return authentication.then(() => {
        expect(mocks.repository.authenticate).toHaveBeenCalledWith({
          username: 'admin', password: ' CSP123! ',
        });
      });
    });

    it('should reject an empty username without calling the repository', () => {
      const credentials = { ...AUTH_TEST_CREDENTIALS, username: ' ' };
      const authentication = manager.authenticate(credentials);
      return expect(authentication).rejects.toMatchObject({ code: 'invalidCredentials' }).then(() => {
        expect(mocks.repository.authenticate).not.toHaveBeenCalled();
      });
    });

    it('should reject an empty password without calling the repository', () => {
      const credentials = { ...AUTH_TEST_CREDENTIALS, password: '' };
      const authentication = manager.authenticate(credentials);
      return expect(authentication).rejects.toMatchObject({ code: 'invalidCredentials' }).then(() => {
        expect(mocks.repository.authenticate).not.toHaveBeenCalled();
      });
    });

    it('should preserve invalid credentials errors without saving a session', () => {
      const error = new AuthError('invalidCredentials');
      mocks.repository.authenticate.mockRejectedValue(error);
      const authentication = manager.authenticate(AUTH_TEST_CREDENTIALS);
      return expect(authentication).rejects.toBe(error).then(() => {
        expect(mocks.repository.getUserInfo).not.toHaveBeenCalled();
        expect(mocks.storage.setItem).not.toHaveBeenCalled();
      });
    });

    it('should map unexpected authentication failures to unknown', () => {
      const error = new Error('Falha na API');
      mocks.repository.authenticate.mockRejectedValue(error);
      const authentication = manager.authenticate(AUTH_TEST_CREDENTIALS);
      return expect(authentication).rejects.toMatchObject({ code: 'unknown' });
    });

    it('should not persist the token when loading the user fails', () => {
      const error = new Error('Falha na consulta');
      mocks.repository.getUserInfo.mockRejectedValue(error);
      const authentication = manager.authenticate(AUTH_TEST_CREDENTIALS);
      return expect(authentication).rejects.toMatchObject({ code: 'unknown' }).then(() => {
        expect(mocks.storage.setItem).not.toHaveBeenCalled();
      });
    });

    it('should report sessionUnavailable when saving the token fails', () => {
      const error = new Error('Storage indisponível');
      mocks.storage.setItem.mockImplementation(() => { throw error; });
      const authentication = manager.authenticate(AUTH_TEST_CREDENTIALS);
      return expect(authentication).rejects.toMatchObject({ code: 'sessionUnavailable' });
    });
  });

  describe('restoreSession', () => {
    it('should return null without loading the user when no token exists', () => {
      const restoration = manager.restoreSession();
      return expect(restoration).resolves.toBeNull().then(() => {
        expect(mocks.repository.getUserInfo).not.toHaveBeenCalled();
      });
    });

    it('should restore the session using the saved token', () => {
      mocks.storage.getItem.mockResolvedValue(AUTH_TEST_TOKEN);
      const restoration = manager.restoreSession();
      return expect(restoration).resolves.toEqual({
        token: AUTH_TEST_TOKEN, user: AUTH_TEST_USER,
      }).then(() => {
        expect(mocks.storage.getItem).toHaveBeenCalledWith('auth_token');
        expect(mocks.repository.getUserInfo).toHaveBeenCalledWith(AUTH_TEST_TOKEN);
      });
    });

    it('should remove an invalid token and return null', () => {
      const error = new AuthError('invalidSession');
      mocks.storage.getItem.mockResolvedValue('token-invalido');
      mocks.repository.getUserInfo.mockRejectedValue(error);
      const restoration = manager.restoreSession();
      return expect(restoration).resolves.toBeNull().then(() => {
        expect(mocks.storage.removeItem).toHaveBeenCalledWith('auth_token');
      });
    });

    it('should preserve the saved token when loading the user unexpectedly fails', () => {
      const error = new Error('API indisponível');
      mocks.storage.getItem.mockResolvedValue(AUTH_TEST_TOKEN);
      mocks.repository.getUserInfo.mockRejectedValue(error);
      const restoration = manager.restoreSession();
      return expect(restoration).rejects.toMatchObject({ code: 'unknown' }).then(() => {
        expect(mocks.storage.removeItem).not.toHaveBeenCalled();
      });
    });

    it('should report sessionUnavailable when reading storage fails', () => {
      const error = new Error('Storage indisponível');
      mocks.storage.getItem.mockRejectedValue(error);
      const restoration = manager.restoreSession();
      return expect(restoration).rejects.toMatchObject({ code: 'sessionUnavailable' });
    });
  });

  describe('signOut', () => {
    it('should remove the saved token', () => {
      manager.signOut();
      expect(mocks.storage.removeItem).toHaveBeenCalledWith('auth_token');
    });

    it('should report sessionUnavailable when removing the token fails', () => {
      const error = new Error('Storage indisponível');
      mocks.storage.removeItem.mockImplementation(() => { throw error; });
      const signOut = () => manager.signOut();
      const expectedError = new AuthError('sessionUnavailable');
      expect(signOut).toThrow(expectedError);
    });
  });
});