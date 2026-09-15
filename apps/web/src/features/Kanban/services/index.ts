import { DemoApi } from '@shared/api';
import { KanbanManager, KanbanError } from './KanbanManager';
import { KanbanRepository } from './KanbanRepository';

const api = new DemoApi();
const repository = new KanbanRepository(api);

export { KanbanError };
export default new KanbanManager(repository);
