import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateSongDto{
@Type()
@IsString()
@ApiProperty()
name: string

@Type()
@IsString()
@ApiProperty()
description: string

@Type()
@IsInt()
@IsOptional()
@ApiProperty({ default: 0 })
playCount?: number;

@Type()
@IsArray()
@IsInt({ each: true })
@ApiProperty({ description: "Sanatçı ID listesi" })
artistIds: number[];


@Type()
@IsInt()
@ApiProperty({ description: "Şarkıyı yükleyen kullanıcının ID'si" })
uploadedById: number;

}