import type { Demand, DemandStatus, Prisma, PrismaClient } from '@prisma/client';

export type DemandWithResponsible = Demand & {
  responsible: { id: string; name: string };
};

export class DemandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(params: {
    status?: DemandStatus;
    search?: string;
    responsibleId?: string;
    skip: number;
    take: number;
  }): Promise<{ items: DemandWithResponsible[]; total: number }> {
    const where: Prisma.DemandWhereInput = {};

    if (params.status) {
      where.status = params.status;
    }

    if (params.responsibleId) {
      where.responsibleId = params.responsibleId;
    }

    if (params.search?.trim()) {
      where.title = {
        contains: params.search.trim(),
        mode: 'insensitive',
      };
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.demand.findMany({
        where,
        include: { responsible: { select: { id: true, name: true } } },
        orderBy: { deadline: 'asc' },
        skip: params.skip,
        take: params.take,
      }),
      this.prisma.demand.count({ where }),
    ]);

    return { items, total };
  }

  findById(id: string): Promise<DemandWithResponsible | null> {
    return this.prisma.demand.findUnique({
      where: { id },
      include: { responsible: { select: { id: true, name: true } } },
    });
  }

  create(data: {
    title: string;
    description: string;
    responsibleId: string;
    deadline: Date;
  }): Promise<DemandWithResponsible> {
    return this.prisma.demand.create({
      data: {
        ...data,
        status: 'not_started',
      },
      include: { responsible: { select: { id: true, name: true } } },
    });
  }

  update(
    id: string,
    data: {
      title?: string;
      description?: string;
      responsibleId?: string;
      deadline?: Date;
      status?: DemandStatus;
    },
  ): Promise<DemandWithResponsible> {
    return this.prisma.demand.update({
      where: { id },
      data,
      include: { responsible: { select: { id: true, name: true } } },
    });
  }

  delete(id: string): Promise<Demand> {
    return this.prisma.demand.delete({ where: { id } });
  }

  findResponsibleCandidate(id: string): Promise<{ id: string; role: string } | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true },
    });
  }
}
