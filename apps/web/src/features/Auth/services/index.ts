import { DemoApi } from '@shared/api';
import { Storage } from '../../../shared/utils/storage';
import { authMockAdapter } from '../mocks/auth-api.adapter';
import { AuthRepository } from './AuthRepository';
import { AuthManager } from './AuthManager';

const api = new DemoApi();
api.getInstance().defaults.adapter = authMockAdapter;
const repository = new AuthRepository(api);

export default new AuthManager(repository, Storage);