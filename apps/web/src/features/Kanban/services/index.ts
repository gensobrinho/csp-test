import { DemoApi } from '@shared/api';
import { kanbanMockAdapter } from '../mocks/kanban-api.adapter';
import { KanbanManager, KanbanError } from './KanbanManager';
import { KanbanRepository } from './KanbanRepository';

const api = new DemoApi();
api.getInstance().defaults.adapter = kanbanMockAdapter;
const repository = new KanbanRepository(api);

export { KanbanError };
export default new KanbanManager(repository);
