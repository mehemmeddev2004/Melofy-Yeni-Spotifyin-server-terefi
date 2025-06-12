import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { AdminRole } from 'src/shared/enum/admin.enum';

export class RegisterAdminDto {
  @Type()
  @ApiProperty()
  @MinLength(3)
  @IsString()
  admin: string;

  @Type()
  @ApiProperty()
  @MinLength(3)
  @IsString()
  adminname: string;

  @Type()
  @ApiProperty()
  @MinLength(3)
  @IsEmail()
  email?: string;


  @Type()
  @ApiProperty()
  @MinLength(3)
  @IsString()
  @MinLength(6)
  password: string;

  @Type(() => String)
  @IsOptional()
  @ApiProperty({ enum: AdminRole, default: AdminRole.ADMIN, required: false })
  @IsEnum(AdminRole)
  role?: AdminRole = AdminRole.ADMIN;  
}
