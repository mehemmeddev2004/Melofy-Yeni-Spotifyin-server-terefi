import { IsArray, IsDateString, IsEnum, IsInt, IsOptional, IsString, IsBoolean } from "class-validator";
import { Type } from "class-transformer";
import { AlbumType } from "src/database/album.entity";

export class FilterAlbumDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsOptional()
  @IsDateString()
  releaseDateAfter?: string;

  @IsOptional()
  @IsDateString()
  releaseDateBefore?: string;

  @IsOptional()
  @IsEnum(AlbumType)
  type?: AlbumType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  totalTracksMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  totalTracksMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  durationMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  durationMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  playCountMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  playCountMax?: number;

  @IsOptional()
  @IsString()
  recordLabel?: string;

  @IsOptional()
  @IsString()
  producer?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  primaryArtistId?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  featuredArtistIds?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @Type(() => Boolean)
  isPublic?: boolean;
}
