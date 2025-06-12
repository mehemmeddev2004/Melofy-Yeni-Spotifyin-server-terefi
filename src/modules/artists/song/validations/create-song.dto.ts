import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, IsArray } from "class-validator";
import { Type } from "class-transformer";

export class CreateSongDto {
  @ApiProperty({ example: "Shape of You" })
  @IsString()
  title: string;

  @ApiProperty({ example: "A great song by Ed Sheeran", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  playCount?: number;

  @ApiProperty({ example: [1, 2] })
  @IsArray()
  @Type(() => Number)
  artistIds: number[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  uploadedById: number;

  @ApiProperty({ example: "https://example.com/audio.mp3" })
  @IsString()
  audioUrl: string;

  @ApiProperty({ example: "https://example.com/image.jpg" })
  @IsString()
  coverImageUrl: string;

  @ApiProperty({ example: 210 }) // saniye cinsinden
  @IsNumber()
  duration: number;

  @ApiProperty({ example: "Lyrics of the song", required: false })
  @IsOptional()
  @IsString()
  lyrics?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isExplicit: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  trackNumber?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  discNumber?: number;

  @ApiProperty({ example: "https://example.com/preview.mp3", required: false })
  @IsOptional()
  @IsString()
  previewUrl?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  albumId?: number;

  @ApiProperty({ example: [1, 2], required: false })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  radioStationIds?: number[];
}
