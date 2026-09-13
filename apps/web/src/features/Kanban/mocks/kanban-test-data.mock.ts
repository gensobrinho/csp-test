import type { TDemand } from '../types/TDemand';

export const KANBAN_TEST_DEMAND: TDemand = {
  id: 'not_started-1',
  title: 'Implementar tela de login',
  description: 'Descrição da demanda de login',
  responsibleId: 'u1',
  responsibleName: 'João Silva',
  deadline: '2025-05-28',
  status: 'not_started',
};

export const KANBAN_TEST_PRODUCTION_DEMAND: TDemand = {
  ...KANBAN_TEST_DEMAND,
  id: 'in_production-1',
  title: 'Setup do monorepo',
  status: 'in_production',
};
