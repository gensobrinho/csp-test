import type { PrismaClient, Role, User } from '@prisma/client';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findAll(roles?: Role[]): Promise<User[]> {
    return this.prisma.user.findMany({
      where: roles?.length ? { role: { in: roles } } : undefined,
      orderBy: { name: 'asc' },
    });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  create(data: {
    username: string;
    name: string;
    role: Role;
    passwordHash: string;
  }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  update(
    id: string,
    data: {
      username?: string;
      name?: string;
      role?: Role;
      passwordHash?: string;
    },
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
