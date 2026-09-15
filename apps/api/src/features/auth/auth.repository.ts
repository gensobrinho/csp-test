import type { PrismaClient, Role, User } from '@prisma/client';

export class AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}

export type { Role, User };
