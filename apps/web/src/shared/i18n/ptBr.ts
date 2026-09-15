const PT_BR = {
  input: {
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
  },
  drawer: {
    close: 'Fechar',
  },
  dialog: {
    close: 'Fechar',
  },
  toast: {
    close: 'Fechar notificação',
  },
  spinner: {
    loading: 'Carregando',
  },
  common: {
    home: 'Home',
    cancel: 'Cancelar',
    save: 'Salvar',
    new: 'Novo',
    edit: 'Editar',
    delete: 'Excluir',
    confirm: 'Confirmar',
  },
  sidebar: {
    brand: 'CSP Tech',
    navigation: 'Navegação principal',
    kanban: 'Kanban',
    demandas: 'Demandas',
    usuarios: 'Usuários',
  },
  home: {
    title: 'Início',
    signedInAs: 'Você está conectado como',
    profile: 'Perfil',
  },
  placeholders: {
    kanbanTitle: 'Kanban',
    demandsTitle: 'Demandas',
    usersTitle: 'Usuários',
  },
  users: {
    createTitle: 'Cadastro de Usuário',
    editTitle: 'Editar Usuário',
    detailsTitle: 'Detalhes do Usuário',
    closeDetails: 'Fechar detalhes',
    newUser: 'Novo Usuário',
    edit: 'Editar',
    delete: 'Excluir',
    emptyList: 'Nenhum usuário cadastrado',
    deleteDialog: {
      title: 'Excluir usuário',
      description: 'Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.',
    },
    fields: {
      name: 'Nome',
      profile: 'Perfil',
      password: 'Senha',
    },
    placeholders: {
      name: 'Digite o nome do usuário',
      profile: 'Selecione o perfil',
      password: 'Digite a senha',
      passwordEdit: 'Deixe em branco para manter a senha atual',
    },
    errors: {
      saveFailed: 'Não foi possível salvar o usuário.',
      deleteFailed: 'Não foi possível excluir o usuário.',
    },
  },

  demands: {
    createTitle: 'Cadastro de Demanda',
    editTitle: 'Editar Demanda',
    detailsTitle: 'Detalhes da Demanda',
    detailsId: 'ID',
    closeDetails: 'Fechar detalhes',
    edit: 'Editar',
    delete: 'Excluir',
    openDeadlineCalendar: 'Abrir calendário do prazo',
    fields: {
      title: 'Título',
      responsible: 'Responsável',
      status: 'Status',
      deadline: 'Prazo',
      description: 'Descrição',
    },
    placeholders: {
      title: 'Digite o título da demanda',
      responsible: 'Selecione o responsável',
      deadline: 'dd/mm/aaaa',
      description: 'Descreva os detalhes da demanda',
    },
  },
  kanban: {
    title: 'Kanban',
    searchLabel: 'Buscar demandas',
    searchPlaceholder: 'Buscar demandas...',
    searchAriaLabel: 'Buscar',
    newDemand: 'Nova Demanda',
    loadMore: 'Ver mais',
    emptyColumn: 'Nenhuma demanda',
    cardMenu: 'Opções da demanda',
    demandsCount: 'demandas',
    columns: {
      notStarted: 'Não iniciada',
      inProgress: 'Em andamento',
      paused: 'Pausada',
      inHomologation: 'Em homologação',
      inProduction: 'Em produção',
    },
    errors: {
      lockedStatus: 'Demandas em produção não podem mudar de status.',
      moveFailed: 'Não foi possível atualizar o status da demanda.',
    },
  },
  auth: {
    accessing: 'Acessando...',
    restoringSession: 'Restaurando sessão...',
    logout: 'Sair',
    roles: {
      admin: 'Administrador',
      agilist: 'Agilista',
      developer: 'Desenvolvedor',
    },
    errors: {
      invalidCredentials: 'Usuário ou senha inválidos.',
      invalidSession: 'Sua sessão expirou. Acesse novamente.',
      sessionUnavailable: 'Não foi possível acessar o armazenamento da sessão. Verifique as configurações do navegador.',
      unknown: 'Não foi possível concluir a operação. Tente novamente.',
      default: "Erro ao efetuar login"
    },
    login: 'Acesse sua conta',
    username: 'Usuário',
    password: 'Senha',
    access: 'Acessar',
    usernamePlaceholder: 'Digite seu usuário',
    passwordPlaceholder: 'Digite sua senha',
    userNotFound: 'Usuário não encontrado',
  },
} as const;

export default PT_BR;
