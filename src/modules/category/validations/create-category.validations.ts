import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @Type()
  @ApiProperty()
  @IsString()
  name: string;

  @Type()
  @ApiProperty()
  @IsString()
  slug: string;

  @Type()
  @ApiProperty({ example: 'https://res.cloudinary.com/.../image.jpg' })
  @IsString()
  imageUrl: string;

   

  @Type(() => Number)
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
