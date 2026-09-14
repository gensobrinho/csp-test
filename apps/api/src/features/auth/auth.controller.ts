import type { Request } from 'express';
import { AppError } from '../../utils/AppError.js';
import { HttpResponse, type ControllerResponse } from '../../utils/HttpResponse.js';
import { loginSchema, type LoginResponse, type PublicUser } from './auth.model.js';
import type { AuthService } from './auth.service.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request): Promise<ControllerResponse<LoginResponse>> {
    const input = loginSchema.parse(req.body);
    const result = await this.authService.login(input);
    return HttpResponse.ok(result);
  }

  async me(req: Request): Promise<ControllerResponse<PublicUser>> {
    if (!req.user) {
      throw new AppError(401, 'unauthorized', 'Usuário não autenticado');
    }

    const user = await this.authService.getMe(req.user.id);
    return HttpResponse.ok(user);
  }
}
