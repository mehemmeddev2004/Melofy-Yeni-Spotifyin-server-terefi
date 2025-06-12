import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";


export class UserUpdateDto {
  @Type(() => String)
  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email?: string;

  @Type(() => String)
  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiProperty({ required: false })
  password?: string;

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  username?: string;

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  imageUrl?: string;

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  firstName?: string;

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  lastName?: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  @ApiProperty({ type: String, format: "date", required: false })
  dateOfBirth?: Date;

  @Type(() => String)
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  country?: string;


}
