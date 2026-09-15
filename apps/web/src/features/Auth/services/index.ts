import { DemoApi } from '@shared/api';
import { Storage } from '../../../shared/utils/storage';
import { AuthManager } from './AuthManager';
import { AuthRepository } from './AuthRepository';

const api = new DemoApi();
const repository = new AuthRepository(api);

export default new AuthManager(repository, Storage);
