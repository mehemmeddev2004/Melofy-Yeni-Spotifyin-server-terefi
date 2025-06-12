import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, MinLength, ArrayNotEmpty } from "class-validator";

export class CreatePlaylistDto {
  @Type()
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Workout Mix' })
  name: string;

  @Type()
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Enerji dolu parçalar' })
  description: string;

  @Type()
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'cover.jpg' })
  coverImage: string;

  @Type()
  @IsInt()
  @ApiProperty({ example: 5, description: "Playlist sahibinin user ID'si" })
  ownerId: number;

  @Type(() => Number)
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({
    example: [1, 2, 3],
    description: "Playlist'e eklenecek şarkı ID'leri"
  })
  songIds: number[];
}
