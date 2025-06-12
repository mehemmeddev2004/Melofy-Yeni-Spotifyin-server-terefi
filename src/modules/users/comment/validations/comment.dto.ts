import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto{
    
    @Type()
    @IsString()
    @ApiProperty()
    content: string
}


export class UpdateCommentDto{
    
    @Type()
    @IsString()
    @ApiProperty()
    content: string
}

export class ReplyCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNumber()
  parentCommentId: number;  // Cevap verdiğin yorumun id'si
}




