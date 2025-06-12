import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { RadioType } from "src/database/radio-session.entity";

export class UpdateRadioDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Chill Vibes', description: 'Radyonun adı' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Dinlendirici müzikler', description: 'Açıklama' })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: 'Görsel URL' })
  imageUrl?: string;

  @IsOptional()
  @IsEnum(RadioType, { message: 'Geçersiz radio türü' })
  @ApiPropertyOptional({ enum: RadioType, description: 'Radio türü (isteğe bağlı)' })
  type?: RadioType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional({ example: 150, description: 'Dinleyici sayısı' })
  listenerCount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional({ example: 1000, description: 'Toplam oynatma sayısı' })
  totalPlays?: number;
}
