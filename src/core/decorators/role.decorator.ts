
import { SetMetadata  } from '@nestjs/common';
export enum Role {
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN'
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
