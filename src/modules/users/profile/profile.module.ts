import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "src/database/profile.entity";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { UserModule } from '../user.module';

@Module({
    imports:[TypeOrmModule.forFeature([ProfileEntity]), UserModule],
    providers:[ProfileService],
    controllers:[ProfileController],
    exports:[ProfileService]
})
export class profileModule{}