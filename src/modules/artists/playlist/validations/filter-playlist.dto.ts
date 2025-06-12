import { IsOptional, IsString, IsBoolean, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class FilterPlaylistDto {
  @IsOptional()
  @IsString()
  name?: string;


  @IsOptional()
  @Type(() => Number)
  likedByUserId?: number;

  @IsOptional()
  @Type(() => Number)
  songId?: number;

  @IsOptional()
  @Type(() => Number)
  artistId?: number;

  @IsOptional()
  @Type(() => Boolean)
  isPublic?: boolean;



  @IsOptional()
  createdAfter?: Date;

  @IsOptional()
  createdBefore?: Date;
}
