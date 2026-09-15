import type { IHashAdapter, IJwtAdapter } from '../../adapters/types.js';
import { AppError } from '../../utils/AppError.js';
import type { AuthRepository } from './auth.repository.js';
import type { LoginInput, LoginResponse, PublicUser } from './auth.model.js';

function toPublicUser(user: { id: string; name: string; role: PublicUser['role'] }): PublicUser {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  };
}

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hashAdapter: IHashAdapter,
    private readonly jwtAdapter: IJwtAdapter,
  ) {}

  async login(input: LoginInput): Promise<LoginResponse> {
    const username = input.username.trim().toLowerCase();
    const user = await this.authRepository.findByUsername(username);

    if (!user) {
      throw new AppError(401, 'invalid_credentials', 'Credenciais inválidas');
    }

    const isValid = await this.hashAdapter.compare(input.password, user.passwordHash);

    if (!isValid) {
      throw new AppError(401, 'invalid_credentials', 'Credenciais inválidas');
    }

    const accessToken = this.jwtAdapter.sign({
      sub: user.id,
      role: user.role,
    });

    return { accessToken };
  }

  async getMe(userId: string): Promise<PublicUser> {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new AppError(401, 'invalid_session', 'Sessão inválida');
    }

    return toPublicUser(user);
  }
}
