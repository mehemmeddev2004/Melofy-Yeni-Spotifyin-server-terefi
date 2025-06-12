import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class createProfileDto{
@Type()
@IsString()
@ApiProperty()
displayName: string

@Type()
@IsString()
@ApiProperty()
bio: string
}

export class UpdateProfileDto{
@Type()
@IsString()
@ApiProperty()
displayName: string

@Type()
@IsString()
@ApiProperty()
bio: string
}