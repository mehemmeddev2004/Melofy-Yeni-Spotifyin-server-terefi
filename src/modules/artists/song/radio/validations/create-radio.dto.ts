import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { RadioType } from "src/database/radio-session.entity";

export class CreateRadioDto {
  @IsString()
  @ApiProperty({ example: 'Chill Vibes', description: 'Radyonun adı' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Dinlendirici müzikler', description: 'Açıklama' })
  description: string;

  @IsString()
  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Görsel URL' })
  imageUrl: string;

  @IsOptional()
  @IsEnum(RadioType, { message: 'Geçersiz radio türü' })
  @ApiPropertyOptional({ enum: RadioType, description: 'Radio türü (isteğe bağlı)' })
  type?: RadioType;

  @Type(() => Number)
  @IsNumber()

  listenerCount: number;

  @Type(() => Number)
  @IsNumber()
  totalPlays: number;
}
