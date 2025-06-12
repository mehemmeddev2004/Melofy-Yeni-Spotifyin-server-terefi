import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateArtistsDto {
  @Type(() => String)
  @ApiProperty({ example: "John Doe" })
  @IsString()
  name: string;

  @Type(() => String)
  @ApiProperty({ example: "artist-profile.jpg", required: false })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @Type()
  @IsString()
  @ApiProperty()
  country: string

  @Type()
  @IsString()
  @ApiProperty()
  website: string

  @Type(() => Number)
  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  followerCount?: number = 0;

  @Type(() => Number)
  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  monthlyListeners?: number = 0;

  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean = true;


  @Type(() => String)
  @ApiProperty({ example: "An amazing singer and songwriter", required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @Type(() => Number)
  @ApiProperty({ example: 1, required: false, description: "Optional parent artist ID" })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @Type(() => String)
  @ApiProperty({ required: false, description: "Upload ID for the image" })
  @IsOptional()
  @IsString()
  imageId?: string;


  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
