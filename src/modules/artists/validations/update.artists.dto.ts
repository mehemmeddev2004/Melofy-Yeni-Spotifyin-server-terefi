import { ApiProperty } from "@nestjs/swagger";
import { Type, Exclude } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateArtistDto {
    @Type(() => String)
    @IsString()
    @ApiProperty()
    name: string;

    @Type(() => String)
    @IsString()
    @ApiProperty()
    img: string;

    @Type()
    @IsString()
    @ApiProperty()
    country: string

    @Type(() => String)
    @ApiProperty({ example: "An amazing singer and songwriter", required: false })
    @IsOptional()
    @IsString()
    bio?: string;

    @Type()
    @IsString()
    @ApiProperty()
    website: string

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    parentId?: number;

    @Exclude()  // Bu sahə JSON serialize edilərkən gizlənəcək
    @IsOptional()
    @IsNumber()
    categoryId?: number;
}
