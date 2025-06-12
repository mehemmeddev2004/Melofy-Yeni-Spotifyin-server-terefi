import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";
import { Type } from "class-transformer";
import { AlbumType } from "src/database/album.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAlbumDto {
  @Type()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @Type()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  @Type()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  coverImageUrl?: string;
  
  @Type()
  @IsDateString()
  @ApiProperty({ example: "2024-06-01" })
  releaseDate: string;

  @IsEnum(AlbumType)
  @ApiProperty({ enum: AlbumType })
  type: AlbumType;

  @Type()
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  totalTracks?: number;

  @Type()
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  duration?: number;

  @Type()
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  playCount?: number;

  @Type()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  recordLabel?: string;

  @Type()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  producer?: string;

  @Type()
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  primaryArtistId?: number; // <-- nullable yapmak için optional

  @Type()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ApiPropertyOptional({ type: [Number] })
  featuredArtistIds?: number[];

  @Type()
  @IsInt()
  @ApiProperty()
  categoryId: number;

  @Type()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ApiPropertyOptional({ type: [Number] })
  songIds?: number[]; // <-- yeni alan
}
