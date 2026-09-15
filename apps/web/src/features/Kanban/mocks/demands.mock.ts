import type { TDemand } from '../types/TDemand';
import type { TDemandStatus } from '../types/TDemandStatus';

const people = [
  { id: 'u1', name: 'João Silva' },
  { id: 'u2', name: 'Maria Souza' },
  { id: 'u3', name: 'Pedro Lima' },
  { id: 'u4', name: 'Ana Costa' },
  { id: 'u5', name: 'Lucas Rocha' },
] as const;

function buildDemands(
  status: TDemandStatus,
  titles: string[],
  startDay: number,
): TDemand[] {
  return titles.map((title, index) => {
    const person = people[index % people.length];
    const day = String(startDay + (index % 20)).padStart(2, '0');
    return {
      id: `${status}-${index + 1}`,
      title,
      description: `Descrição da demanda: ${title}`,
      responsibleId: person.id,
      responsibleName: person.name,
      deadline: `2025-05-${day}`,
      status,
    };
  });
}

export const demandsStore: TDemand[] = [
  ...buildDemands('not_started', [
    'Implementar tela de login',
    'Criar layout do dashboard',
    'Configurar CI/CD',
    'Definir tokens de design',
    'Mapear rotas privadas',
    'Documentar contrato da API',
    'Preparar seed de usuários',
    'Criar componente de breadcrumb',
    'Ajustar tipografia global',
    'Validar formulário de acesso',
    'Esboçar fluxo de onboarding',
    'Levantar requisitos do Kanban',
  ], 10),
  ...buildDemands('in_progress', [
    'Integrar autenticação JWT',
    'Montar board Kanban',
    'Paginar colunas do board',
    'Adicionar busca por título',
    'Persistir sessão do usuário',
    'Criar InputWithIcon',
    'Estilizar colunas do Kanban',
    'Conectar Manager ao mock',
    'Exibir avatar do responsável',
    'Ordenar demandas por prazo',
    'Tratar estados de loading',
    'Refinar acessibilidade do board',
  ], 12),
  ...buildDemands('paused', [
    'Migrar banco legado',
    'Revisar permissões de admin',
    'Otimizar bundle do web',
    'Atualizar biblioteca de ícones',
  ], 15),
  ...buildDemands('in_homologation', [
    'Homologar fluxo de login',
    'Validar drag and drop',
    'Testar paginação das colunas',
    'Revisar textos de i18n',
    'Checar contraste das colunas',
  ], 18),
  ...buildDemands('in_production', [
    'Setup do monorepo',
    'Tema Emotion base',
    'Componente Button',
    'Componente Input',
    'Sidebar da aplicação',
    'Rotas autenticadas',
  ], 5),
];
