import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { AdminRole } from 'src/shared/enum/admin.enum';

export class LoginAdminDto {
  @Type()
  @ApiProperty()
  @MinLength(3)
  @IsEmail()
  email: string;


  @Type()
  @ApiProperty()
  @MinLength(3)
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(AdminRole)
  role?: AdminRole;
}


