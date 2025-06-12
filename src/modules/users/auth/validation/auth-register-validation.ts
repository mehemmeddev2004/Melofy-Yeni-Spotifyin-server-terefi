import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";


export class AuthRegisterDto {
  @Type()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Type()
  @IsString()
  @ApiProperty()
  @MinLength(6)
  password: string;

  @Type()
  @IsString()
  @ApiProperty()
  username: string;

  @Type()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  imageUrl?: string;

  @Type()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  firstName?: string;

  @Type()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  lastName?: string;

  @Type()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ type: String, format: "date", required: false })
  dateOfBirth?: Date;

  @Type()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  country?: string;
  
 
}
