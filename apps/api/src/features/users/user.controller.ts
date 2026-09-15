import type { Request } from 'express';
import { HttpResponse, type ControllerResponse } from '../../utils/HttpResponse.js';
import {
  createUserSchema,
  updateUserSchema,
  type PublicUser,
} from './user.model.js';
import type { UserService } from './user.service.js';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUsers(req: Request): Promise<ControllerResponse<PublicUser[]>> {
    const role = typeof req.query.role === 'string' ? req.query.role : undefined;
    const users = await this.userService.getUsers(role);
    return HttpResponse.ok(users);
  }

  async getUserById(req: Request): Promise<ControllerResponse<PublicUser>> {
    const user = await this.userService.getUserById(req.params.id as string);
    return HttpResponse.ok(user);
  }

  async createUser(req: Request): Promise<ControllerResponse<PublicUser>> {
    const input = createUserSchema.parse(req.body);
    const user = await this.userService.createUser(input);
    return HttpResponse.created(user);
  }

  async updateUser(req: Request): Promise<ControllerResponse<PublicUser>> {
    const input = updateUserSchema.parse(req.body);
    const user = await this.userService.updateUser(req.params.id as string, input);
    return HttpResponse.ok(user);
  }

  async deleteUser(req: Request): Promise<ControllerResponse> {
    await this.userService.deleteUser(req.params.id as string);
    return HttpResponse.noContent();
  }
}
