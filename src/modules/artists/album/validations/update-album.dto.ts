
import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { AlbumType } from "src/database/album.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateAlbumDto {
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
  @IsInt()
  @ApiProperty()
  primaryArtistId: number;

  @Type()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ApiPropertyOptional({ type: [Number] })
  featuredArtistIds?: number[];
  
  @Type()
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  categoryId: number;
}