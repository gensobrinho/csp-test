import { z } from 'zod';
import type { DemandStatus } from '@prisma/client';

export const demandStatusSchema = z.enum([
  'not_started',
  'in_progress',
  'paused',
  'in_homologation',
  'in_production',
]);

export const createDemandSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  responsibleId: z.string().uuid('Responsável inválido'),
  deadline: z.string().min(1, 'Prazo é obrigatório'),
});

export const updateDemandSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  responsibleId: z.string().uuid('Responsável inválido'),
  deadline: z.string().min(1, 'Prazo é obrigatório'),
  status: demandStatusSchema.optional(),
});

export const updateDemandStatusSchema = z.object({
  status: demandStatusSchema,
});

export type CreateDemandInput = z.infer<typeof createDemandSchema>;
export type UpdateDemandInput = z.infer<typeof updateDemandSchema>;
export type UpdateDemandStatusInput = z.infer<typeof updateDemandStatusSchema>;

export type DemandDto = {
  id: string;
  title: string;
  description: string;
  responsibleId: string;
  responsibleName: string;
  deadline: string;
  status: DemandStatus;
};
