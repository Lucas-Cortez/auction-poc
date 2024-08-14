import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { UserRole } from 'src/modules/user/domain/enums/user-role';
import { RoleGuard } from '../guards/role.guard';

export const ROLES_KEY = 'roles';

export const ApplyRoleGuard = (...roles: UserRole[]) => {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RoleGuard));
};
