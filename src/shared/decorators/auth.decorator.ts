

import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/Auth.guard';
import { Role } from './role.decorator';
import { AdminRole } from 'src/shared/enum/admin.enum';




export const Auth = (...roles: AdminRole[]) =>
  applyDecorators(UseGuards(AuthGuard), Role(...roles), ApiBearerAuth());