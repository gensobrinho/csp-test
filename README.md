# CSP Kanban

Aplicação full stack de quadro Kanban desenvolvida para o teste técnico: autenticação por perfil, cadastro de usuários e demandas, e gestão visual do fluxo de trabalho.

## Acesse a aplicação aqui

| Ambiente | URL |
| -------- | --- |
| **Frontend** | [https://csp-test-web-five.vercel.app/](https://csp-test-web-five.vercel.app/) |
| **API** | [https://csp-test-api.onrender.com](https://csp-test-api.onrender.com) |
| Health check | `GET /health` na URL da API |

> No plano gratuito do Render, o serviço pode entrar em sleep após ~15 minutos sem uso. A primeira requisição pode levar cerca de 1 minuto para voltar.

---

## Stack

| Camada | Tecnologia |
| ------ | ---------- |
| Frontend | React 18, Vite, React Router, TanStack Query, Emotion |
| Backend | Node.js, Express 5, Zod, JWT, bcrypt |
| Banco | PostgreSQL 16 + Prisma |
| Monorepo | pnpm workspaces |

```
apps/
├── web/   # Front-end
└── api/   # Back-end + Prisma
packages/
└── shared/
```

---

## Usuários de demonstração

Após o seed, todos usam a senha **`CSP123!`**:

| Username | Nome | Perfil |
| -------- | ---- | ------ |
| `admin` | Admin | Administrador |
| `agilista` | Agilista | Agilista |
| `dev` | Dev | Desenvolvedor |

---

## Como rodar localmente

### Pré-requisitos

- Node.js 22+
- [pnpm](https://pnpm.io/) 12 (`corepack enable`)
- Docker (para o PostgreSQL) **ou** um Postgres já disponível

### 1. Clonar e instalar

```bash
git clone https://github.com/gensobrinho/csp-test.git
cd csp-test
pnpm install
```

### 2. Variáveis de ambiente

**API** — copie `apps/api/.env.example` para `apps/api/.env`:

```env
PORT=8000
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/csp_kanban?schema=public
JWT_SECRET=change-me-to-a-long-random-secret
JWT_EXPIRES_IN=8h
BCRYPT_SALT_ROUNDS=10
```

> Com o `docker-compose` deste repo, a porta do host é **5433** (mapeada para 5432 no container).

**Web** — copie `apps/web/.env.example` para `apps/web/.env`:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Subir banco, schema e seed

**Opção rápida** (Docker + setup + front e API em paralelo):

```bash
pnpm dev:all
```

**Opção passo a passo:**

```bash
pnpm db:up
pnpm --filter @csp-test/api db:setup   # prisma db push + seed
pnpm dev                               # API :8000 e Web (Vite)
```

Acesse o front em `http://localhost:5173` (porta padrão do Vite) e a API em `http://localhost:8000`.

### Scripts úteis

| Comando | Descrição |
| ------- | --------- |
| `pnpm dev` | Sobe web e API em paralelo |
| `pnpm db:up` / `pnpm db:down` | Sobe / para o Postgres |
| `pnpm db:reset` | Recria o volume do Postgres |
| `pnpm --filter @csp-test/api db:seed` | Reaplica usuários e demandas demo |
| `pnpm test` | Testes unitários (web + api) |
| `pnpm build` | Build de produção |

---

## Funcionalidades (requisitos do teste)

### Autenticação e navegação

- Tela de login e sessão persistente (token JWT em `sessionStorage`, restaurada ao recarregar)
- Home pós-login com atalhos (Kanban, cadastros conforme o perfil)
- Menu lateral com item ativo realçado

### Cadastro de demanda

- Campos obrigatórios com feedback ao salvar incompleto
- Prazo em campo de data
- Responsável em dropdown filtrável (agilistas e desenvolvedores); mensagem quando não há resultado

### Cadastro de usuário

- Campos obrigatórios com feedback
- Nome apenas com letras (com ou sem acentuação)
- Perfil: Desenvolvedor, Administrador, Agilista

### Quadro Kanban

- Cinco colunas: Não Iniciada, Em andamento, Pausada, Em Homologação, Em Produção
- Arrastar e soltar entre colunas, com atualização do status
- Cards em **Em Produção** não mudam de status (retornam à coluna)
- Busca com filtro progressivo
- Botão para cadastro de demanda (quando o perfil permite)
- Cards ordenados por prazo (mais próximo no topo)
- Clique no card abre **Detalhes da Demanda** (drawer sobre o Kanban): título, responsável, status, prazo, descrição; editar / excluir conforme perfil

### Perfis

| Ação | Administrador | Agilista | Desenvolvedor |
| ---- | ------------- | -------- | ------------- |
| Acessar Kanban / ver cards | Sim | Sim | Sim |
| Cadastrar demanda | Sim | Sim | Não |
| Editar demanda / cards | Não | Sim | Sim |
| Mover cards | Não | Sim | Sim |
| Excluir demanda | Não | Sim | Não |
| Cadastrar usuários | Sim | Não | Não |

Ações ou menus não permitidos **não são exibidos** para o perfil.

---

## Requisitos adicionados

Além do escopo mínimo do documento, foram incluídos os seguintes requisitos funcionais:

1. **Autorização no front e no back-end** — menus e botões ocultos conforme o perfil; a API também rejeita operações não permitidas
2. **Paginação por coluna no Kanban** — carregamento incremental das demandas em cada status
3. **Lista de demandas** — tela com listagem/filtros; o desenvolvedor visualiza apenas as demandas em que é responsável
4. **Alteração de senha** — o usuário autenticado pode trocar a própria senha na área logada
5. **Toasts** — feedback visual de sucesso e erro nas operações (criar, editar, excluir, mover card, etc.)
6. **Testes unitários** — cobertura dos services da API (padrão BDD given/when/then) e testes no front-end

---

## Funcionalidades futuras

- **Serviço de notificação:** informar o usuário sobre demandas **criadas** e **alteradas**, com preferências por perfil e histórico de eventos.
- Filtros avançados no Kanban (responsável, intervalo de prazo)

---

## Deploy

| Camada | Hospedagem | Configuração |
| ------ | ---------- | ------------ |
| Frontend | Vercel | Root Directory `apps/web` + `vercel.json` |
| Backend | Render | Blueprint `render.yaml` |
| Banco | Neon (PostgreSQL) | `DATABASE_URL` nas env vars do Render |

Fluxo resumido:

1. Criar banco no Neon e rodar `db:push` + `db:seed` apontando para a URL do Neon  
2. Deploy da API no Render (`DATABASE_URL`, `JWT_SECRET`)  
3. Deploy do front na Vercel com `VITE_API_URL` = URL da API  

Detalhes de build/start estão em `render.yaml` e `apps/web/vercel.json`.

---

## Licença

Uso restrito ao contexto do teste técnico.
