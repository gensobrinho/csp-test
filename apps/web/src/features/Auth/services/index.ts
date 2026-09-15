import { DemoApi } from '@shared/api';
import { Storage } from '../../../shared/utils/storage';
import { AuthRepository } from './AuthRepository';
import { AuthManager } from './AuthManager';

const api = new DemoApi();
const repository = new AuthRepository(api);

export default new AuthManager(repository, Storage);
