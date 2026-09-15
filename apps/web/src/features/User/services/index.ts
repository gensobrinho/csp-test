import { DemoApi } from '@shared/api';
import { UserManager } from './UserManager';
import { UserRepository } from './UserRepository';

const api = new DemoApi();
const repository = new UserRepository(api);

export default new UserManager(repository);
