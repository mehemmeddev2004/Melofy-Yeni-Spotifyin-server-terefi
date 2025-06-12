
import { SetMetadata } from '@nestjs/common';
import { AdminRole } from 'src/shared/enum/admin.enum';



export const Role = (...roles: AdminRole[]) => {
  return SetMetadata('roles', roles);
};

