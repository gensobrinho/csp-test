import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { AuthService } from '../../auth.service.js';
import { createAuthServiceMocks } from '../mocks/auth-service.mock.js';
import {
  AUTH_LOGIN_INPUT,
  AUTH_LOGIN_RESPONSE,
  AUTH_PUBLIC_USER,
  AUTH_USER_ENTITY,
} from '../mocks/auth-test-data.mock.js';

describe('AuthService', () => {
  let service: AuthService;
  let mocks: ReturnType<typeof createAuthServiceMocks>;

  beforeEach(() => {
    mocks = createAuthServiceMocks();
    service = new AuthService(mocks.authRepository, mocks.hashAdapter, mocks.jwtAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return an access token when credentials are valid', async () => {
      mocks.authRepository.findByUsername.mockResolvedValue(AUTH_USER_ENTITY);
      mocks.hashAdapter.compare.mockResolvedValue(true);
      mocks.jwtAdapter.sign.mockReturnValue(AUTH_LOGIN_RESPONSE.accessToken);

      const result = await service.login(AUTH_LOGIN_INPUT);

      expect(result).toEqual(AUTH_LOGIN_RESPONSE);
      expect(mocks.authRepository.findByUsername).toHaveBeenCalledWith('admin');
      expect(mocks.hashAdapter.compare).toHaveBeenCalledWith(
        AUTH_LOGIN_INPUT.password,
        AUTH_USER_ENTITY.passwordHash,
      );
      expect(mocks.jwtAdapter.sign).toHaveBeenCalledWith({
        sub: AUTH_USER_ENTITY.id,
        role: AUTH_USER_ENTITY.role,
      });
    });

    it('should normalize the username before looking up the user', async () => {
      mocks.authRepository.findByUsername.mockResolvedValue(AUTH_USER_ENTITY);
      mocks.hashAdapter.compare.mockResolvedValue(true);
      mocks.jwtAdapter.sign.mockReturnValue(AUTH_LOGIN_RESPONSE.accessToken);

      await service.login({ username: ' ADMIN ', password: AUTH_LOGIN_INPUT.password });

      expect(mocks.authRepository.findByUsername).toHaveBeenCalledWith('admin');
    });

    it('should throw invalid_credentials when the user does not exist', async () => {
      mocks.authRepository.findByUsername.mockResolvedValue(null);

      const login = service.login(AUTH_LOGIN_INPUT);

      await expect(login).rejects.toMatchObject({
        statusCode: 401,
        id: 'invalid_credentials',
      });
      expect(mocks.hashAdapter.compare).not.toHaveBeenCalled();
      expect(mocks.jwtAdapter.sign).not.toHaveBeenCalled();
    });

    it('should throw invalid_credentials when the password is invalid', async () => {
      mocks.authRepository.findByUsername.mockResolvedValue(AUTH_USER_ENTITY);
      mocks.hashAdapter.compare.mockResolvedValue(false);

      const login = service.login(AUTH_LOGIN_INPUT);

      await expect(login).rejects.toMatchObject({
        statusCode: 401,
        id: 'invalid_credentials',
      });
      expect(mocks.jwtAdapter.sign).not.toHaveBeenCalled();
    });
  });

  describe('getMe', () => {
    it('should return the public user when the session is valid', async () => {
      mocks.authRepository.findById.mockResolvedValue(AUTH_USER_ENTITY);

      const result = await service.getMe(AUTH_USER_ENTITY.id);

      expect(result).toEqual(AUTH_PUBLIC_USER);
      expect(mocks.authRepository.findById).toHaveBeenCalledWith(AUTH_USER_ENTITY.id);
    });

    it('should throw invalid_session when the user does not exist', async () => {
      mocks.authRepository.findById.mockResolvedValue(null);

      const getMe = service.getMe('missing-user');

      await expect(getMe).rejects.toMatchObject({
        statusCode: 401,
        id: 'invalid_session',
      });
    });
  });
});
