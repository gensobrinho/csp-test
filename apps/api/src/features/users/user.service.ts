import type { Role } from '@prisma/client';
import type { IHashAdapter } from '../../adapters/types.js';
import { AppError } from '../../utils/AppError.js';
import type {
  ChangePasswordInput,
  CreateUserInput,
  PublicUser,
  UpdateUserInput,
} from './user.model.js';
import type { UserRepository } from './user.repository.js';

function toPublicUser(user: { id: string; name: string; role: Role }): PublicUser {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  };
}

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashAdapter: IHashAdapter,
  ) {}

  async getUsers(roleQuery?: string): Promise<PublicUser[]> {
    const roles = this.parseRoles(roleQuery);
    const users = await this.userRepository.findAll(roles);
    return users.map(toPublicUser);
  }

  async getUserById(id: string): Promise<PublicUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(404, 'user_not_found', 'Usuário não encontrado');
    }

    return toPublicUser(user);
  }

  async createUser(input: CreateUserInput): Promise<PublicUser> {
    const username = input.username.trim().toLowerCase();
    const existing = await this.userRepository.findByUsername(username);

    if (existing) {
      throw new AppError(400, 'username_taken', 'Username já está em uso');
    }

    const passwordHash = await this.hashAdapter.hash(input.password);
    const user = await this.userRepository.create({
      username,
      name: input.name.trim(),
      role: input.role,
      passwordHash,
    });

    return toPublicUser(user);
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<PublicUser> {
    const existing = await this.userRepository.findById(id);

    if (!existing) {
      throw new AppError(404, 'user_not_found', 'Usuário não encontrado');
    }

    let username = existing.username;

    if (input.username) {
      username = input.username.trim().toLowerCase();
      const conflict = await this.userRepository.findByUsername(username);

      if (conflict && conflict.id !== id) {
        throw new AppError(400, 'username_taken', 'Username já está em uso');
      }
    }

    const passwordHash = input.password
      ? await this.hashAdapter.hash(input.password)
      : undefined;

    const user = await this.userRepository.update(id, {
      username,
      name: input.name.trim(),
      role: input.role,
      passwordHash,
    });

    return toPublicUser(user);
  }

  async changePassword(userId: string, input: ChangePasswordInput): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, 'user_not_found', 'Usuário não encontrado');
    }

    const isValid = await this.hashAdapter.compare(input.currentPassword, user.passwordHash);

    if (!isValid) {
      throw new AppError(400, 'invalid_current_password', 'Senha atual inválida');
    }

    const passwordHash = await this.hashAdapter.hash(input.newPassword);
    await this.userRepository.update(userId, { passwordHash });
  }

  async deleteUser(id: string): Promise<void> {
    const existing = await this.userRepository.findById(id);

    if (!existing) {
      throw new AppError(404, 'user_not_found', 'Usuário não encontrado');
    }

    try {
      await this.userRepository.delete(id);
    } catch {
      throw new AppError(
        400,
        'user_has_demands',
        'Não é possível excluir usuário com demandas vinculadas',
      );
    }
  }

  private parseRoles(roleQuery?: string): Role[] | undefined {
    if (!roleQuery?.trim()) {
      return undefined;
    }

    const roles = roleQuery
      .split(',')
      .map((role) => role.trim())
      .filter(Boolean) as Role[];

    const allowed: Role[] = ['admin', 'agilist', 'developer'];
    const invalid = roles.filter((role) => !allowed.includes(role));

    if (invalid.length > 0) {
      throw new AppError(400, 'invalid_role_filter', 'Filtro de role inválido', {
        invalid,
      });
    }

    return roles;
  }
}
