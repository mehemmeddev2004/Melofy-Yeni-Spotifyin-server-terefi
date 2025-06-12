import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/database/admin.entity";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { FirebaseModule } from "src/shared/libs/firebase/firebase.module";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../users/user.module";

import { UserEntity } from "src/database/user.entity"; // assuming this is the correct import path

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, UserEntity]),
    FirebaseModule,
    UserModule
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {

}