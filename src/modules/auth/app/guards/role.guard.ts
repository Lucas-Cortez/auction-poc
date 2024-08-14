import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from 'src/modules/user/domain/enums/user-role';
import { DecodedUserToken } from '../../domain/entities/decoded-user-token';
import { ROLES_KEY } from '../decorators/apply-role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as DecodedUserToken | undefined;

    if (!user) return false;

    return requiredRoles.includes(user.role);
  }
}
