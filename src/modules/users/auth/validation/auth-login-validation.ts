import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class AuthLoginDto{
@Type()
@IsEmail()
@ApiProperty()
email:string


@Type()
@IsString()
@ApiProperty()
password: string


}