import { z } from 'zod';
import type { Role } from '../../adapters/types.js';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type PublicUser = {
  id: string;
  name: string;
  role: Role;
};

export type LoginResponse = {
  accessToken: string;
};
