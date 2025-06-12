import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Subscription } from 'src/shared/enum/subscriation.enum';

export class UpdateSubscriptionDto {


  @IsOptional()
  @IsEnum(Subscription)
  @ApiProperty({ enum: Subscription })
  subscription?: Subscription;


}