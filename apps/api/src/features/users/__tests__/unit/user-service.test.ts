import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { UserService } from '../../user.service.js';
import { createUserServiceMocks } from '../mocks/user-service.mock.js';
import {
  CHANGE_PASSWORD_INPUT,
  CREATE_USER_INPUT,
  CREATED_USER_ENTITY,
  CREATED_USER_PUBLIC,
  UPDATE_USER_INPUT,
  USER_ENTITY,
  USER_PUBLIC,
} from '../mocks/user-test-data.mock.js';

describe('UserService', () => {
  let service: UserService;
  let mocks: ReturnType<typeof createUserServiceMocks>;

  beforeEach(() => {
    mocks = createUserServiceMocks();
    service = new UserService(mocks.userRepository, mocks.hashAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return all users when no role filter is provided', async () => {
      mocks.userRepository.findAll.mockResolvedValue([USER_ENTITY]);

      const result = await service.getUsers();

      expect(result).toEqual([USER_PUBLIC]);
      expect(mocks.userRepository.findAll).toHaveBeenCalledWith(undefined);
    });

    it('should filter users by the provided roles', async () => {
      mocks.userRepository.findAll.mockResolvedValue([USER_ENTITY]);

      const result = await service.getUsers('admin,developer');

      expect(result).toEqual([USER_PUBLIC]);
      expect(mocks.userRepository.findAll).toHaveBeenCalledWith(['admin', 'developer']);
    });

    it('should throw invalid_role_filter when a role is not allowed', async () => {
      const roleQuery = 'admin,invalid';

      const getUsers = service.getUsers(roleQuery);

      await expect(getUsers).rejects.toMatchObject({
        statusCode: 400,
        id: 'invalid_role_filter',
        details: { invalid: ['invalid'] },
      });
      expect(mocks.userRepository.findAll).not.toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return the public user when it exists', async () => {
      mocks.userRepository.findById.mockResolvedValue(USER_ENTITY);

      const result = await service.getUserById(USER_ENTITY.id);

      expect(result).toEqual(USER_PUBLIC);
      expect(mocks.userRepository.findById).toHaveBeenCalledWith(USER_ENTITY.id);
    });

    it('should throw user_not_found when the user does not exist', async () => {
      mocks.userRepository.findById.mockResolvedValue(null);

      const getUserById = service.getUserById('missing-user');

      await expect(getUserById).rejects.toMatchObject({
        statusCode: 404,
        id: 'user_not_found',
      });
    });
  });

  describe('createUser', () => {
    it('should create a user when the username is available', async () => {
      mocks.userRepository.findByUsername.mockResolvedValue(null);
      mocks.hashAdapter.hash.mockResolvedValue(CREATED_USER_ENTITY.passwordHash);
      mocks.userRepository.create.mockResolvedValue(CREATED_USER_ENTITY);

      const result = await service.createUser(CREATE_USER_INPUT);

      expect(result).toEqual(CREATED_USER_PUBLIC);
      expect(mocks.userRepository.findByUsername).toHaveBeenCalledWith('bruno');
      expect(mocks.hashAdapter.hash).toHaveBeenCalledWith(CREATE_USER_INPUT.password);
      expect(mocks.userRepository.create).toHaveBeenCalledWith({
        username: 'bruno',
        name: 'Bruno Dev',
        role: 'developer',
        passwordHash: CREATED_USER_ENTITY.passwordHash,
      });
    });

    it('should throw username_taken when the username already exists', async () => {
      mocks.userRepository.findByUsername.mockResolvedValue(USER_ENTITY);

      const createUser = service.createUser(CREATE_USER_INPUT);

      await expect(createUser).rejects.toMatchObject({
        statusCode: 400,
        id: 'username_taken',
      });
      expect(mocks.hashAdapter.hash).not.toHaveBeenCalled();
      expect(mocks.userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should update the user when the payload is valid', async () => {
      const updatedUser = {
        ...USER_ENTITY,
        username: 'ana.updated',
        name: 'Ana Updated',
        role: 'agilist' as const,
        passwordHash: 'hashed-updated-password',
      };
      mocks.userRepository.findById.mockResolvedValue(USER_ENTITY);
      mocks.userRepository.findByUsername.mockResolvedValue(null);
      mocks.hashAdapter.hash.mockResolvedValue(updatedUser.passwordHash);
      mocks.userRepository.update.mockResolvedValue(updatedUser);

      const result = await service.updateUser(USER_ENTITY.id, UPDATE_USER_INPUT);

      expect(result).toEqual({
        id: USER_ENTITY.id,
        name: 'Ana Updated',
        role: 'agilist',
      });
      expect(mocks.hashAdapter.hash).toHaveBeenCalledWith(UPDATE_USER_INPUT.password);
      expect(mocks.userRepository.update).toHaveBeenCalledWith(USER_ENTITY.id, {
        username: 'ana.updated',
        name: 'Ana Updated',
        role: 'agilist',
        passwordHash: updatedUser.passwordHash,
      });
    });

    it('should throw user_not_found when the user does not exist', async () => {
      mocks.userRepository.findById.mockResolvedValue(null);

      const updateUser = service.updateUser('missing-user', UPDATE_USER_INPUT);

      await expect(updateUser).rejects.toMatchObject({
        statusCode: 404,
        id: 'user_not_found',
      });
    });

    it('should throw username_taken when another user already has the username', async () => {
      mocks.userRepository.findById.mockResolvedValue(USER_ENTITY);
      mocks.userRepository.findByUsername.mockResolvedValue({
        ...USER_ENTITY,
        id: 'other-user',
        username: 'ana.updated',
      });

      const updateUser = service.updateUser(USER_ENTITY.id, UPDATE_USER_INPUT);

      await expect(updateUser).rejects.toMatchObject({
        statusCode: 400,
        id: 'username_taken',
      });
      expect(mocks.userRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('changePassword', () => {
    it('should update the password when the current password is valid', async () => {
      mocks.userRepository.findById.mockResolvedValue(USER_ENTITY);
      mocks.hashAdapter.compare.mockResolvedValue(true);
      mocks.hashAdapter.hash.mockResolvedValue('hashed-new-password');
      mocks.userRepository.update.mockResolvedValue(USER_ENTITY);

      await service.changePassword(USER_ENTITY.id, CHANGE_PASSWORD_INPUT);

      expect(mocks.hashAdapter.compare).toHaveBeenCalledWith(
        CHANGE_PASSWORD_INPUT.currentPassword,
        USER_ENTITY.passwordHash,
      );
      expect(mocks.hashAdapter.hash).toHaveBeenCalledWith(CHANGE_PASSWORD_INPUT.newPassword);
      expect(mocks.userRepository.update).toHaveBeenCalledWith(USER_ENTITY.id, {
        passwordHash: 'hashed-new-password',
      });
    });

    it('should throw user_not_found when the user does not exist', async () => {
      mocks.userRepository.findById.mockResolvedValue(null);

      const changePassword = service.changePassword('missing-user', CHANGE_PASSWORD_INPUT);

      await expect(changePassword).rejects.toMatchObject({
        statusCode: 404,
        id: 'user_not_found',
      });
    });

    it('should throw invalid_current_password when the current password is wrong', async () => {
      mocks.userRepository.findById.mockResolvedValue(USER_ENTITY);
      mocks.hashAdapter.compare.mockResolvedValue(false);

      const changePassword = service.changePassword(USER_ENTITY.id, CHANGE_PASSWORD_INPUT);

      await expect(changePassword).rejects.toMatchObject({
        statusCode: 400,
        id: 'invalid_current_password',
      });
      expect(mocks.userRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should delete the user when it exists and has no linked demands', async () => {
      mocks.userRepository.findById.mockResolvedValue(USER_ENTITY);
      mocks.userRepository.delete.mockResolvedValue(USER_ENTITY);

      await service.deleteUser(USER_ENTITY.id);

      expect(mocks.userRepository.delete).toHaveBeenCalledWith(USER_ENTITY.id);
    });

    it('should throw user_not_found when the user does not exist', async () => {
      mocks.userRepository.findById.mockResolvedValue(null);

      const deleteUser = service.deleteUser('missing-user');

      await expect(deleteUser).rejects.toMatchObject({
        statusCode: 404,
        id: 'user_not_found',
      });
      expect(mocks.userRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw user_has_demands when the repository delete fails', async () => {
      mocks.userRepository.findById.mockResolvedValue(USER_ENTITY);
      mocks.userRepository.delete.mockRejectedValue(new Error('foreign key'));

      const deleteUser = service.deleteUser(USER_ENTITY.id);

      await expect(deleteUser).rejects.toMatchObject({
        statusCode: 400,
        id: 'user_has_demands',
      });
    });
  });
});
