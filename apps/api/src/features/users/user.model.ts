import { z } from 'zod';
import type { Role } from '../../adapters/types.js';

export const roleSchema = z.enum(['admin', 'agilist', 'developer']);

export const createUserSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório'),
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  role: roleSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const updateUserSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório').optional(),
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  role: roleSchema,
  password: z.string().min(1).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(1, 'Nova senha é obrigatória'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export type PublicUser = {
  id: string;
  name: string;
  role: Role;
};
