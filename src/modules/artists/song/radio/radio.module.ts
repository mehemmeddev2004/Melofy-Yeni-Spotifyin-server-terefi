import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RadioStationEntity } from "src/database/radio-session.entity";
import { RadioService } from "./radio.service";
import { RadioController } from "./radio.controller";

@Module({
    imports:[TypeOrmModule.forFeature([RadioStationEntity])],
    providers:[RadioService],
    controllers:[RadioController]
})
export class radioModule{}