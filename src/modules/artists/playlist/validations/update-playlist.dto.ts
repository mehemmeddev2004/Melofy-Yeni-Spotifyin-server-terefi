import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class UpdatePlaylistDto{
@Type()
@IsString()
@MinLength(3)
@ApiProperty()
name: string

@Type()
@IsString()
@MinLength(3)
@ApiProperty()
description: string

@Type()
@IsString()
@MinLength(3)
@ApiProperty()
coverImage: string

@Type()
@ApiProperty({ default: true })
isPublic: boolean





}