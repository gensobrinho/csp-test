import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('CSP123!', 10);

  await prisma.demand.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      name: 'Admin',
      role: 'admin',
      passwordHash,
    },
  });

  const agilist = await prisma.user.create({
    data: {
      username: 'agilista',
      name: 'Agilista',
      role: 'agilist',
      passwordHash,
    },
  });

  const developer = await prisma.user.create({
    data: {
      username: 'dev',
      name: 'Dev',
      role: 'developer',
      passwordHash,
    },
  });

  await prisma.demand.createMany({
    data: [
      {
        title: 'Configurar ambiente de desenvolvimento',
        description: 'Preparar o ambiente local com Node, PostgreSQL e variáveis.',
        deadline: new Date('2026-09-16'),
        status: 'not_started',
        responsibleId: developer.id,
      },
      {
        title: 'Implementar autenticação JWT',
        description: 'Login com username/senha e persistência de sessão via token.',
        deadline: new Date('2026-09-16'),
        status: 'in_progress',
        responsibleId: developer.id,
      },
      {
        title: 'Revisar fluxo do Kanban',
        description: 'Validar regras de movimentação e bloqueio de cards em produção.',
        deadline: new Date('2026-09-16'),
        status: 'paused',
        responsibleId: agilist.id,
      },
      {
        title: 'Homologar cadastro de usuários',
        description: 'Testar CRUD de usuários com perfil administrador.',
        deadline: new Date('2026-09-16'),
        status: 'in_homologation',
        responsibleId: agilist.id,
      },
      {
        title: 'Publicar documentação da API',
        description: 'Disponibilizar documentação básica dos endpoints.',
        deadline: new Date('2026-09-16'),
        status: 'in_production',
        responsibleId: developer.id,
      },
    ],
  });

  console.log('Seed completed:', {
    users: [admin.username, agilist.username, developer.username],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
