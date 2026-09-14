import { DemoApi } from '@shared/api';
import { userMockAdapter } from '../mocks/user-api.adapter';
import { UserManager } from './UserManager';
import { UserRepository } from './UserRepository';

const api = new DemoApi();
api.getInstance().defaults.adapter = userMockAdapter;
const repository = new UserRepository(api);

export default new UserManager(repository);
