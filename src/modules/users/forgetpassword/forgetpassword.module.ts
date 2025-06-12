import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/database/user.entity";
import { ForgetPasswordService } from "./forgetpassword.service";
import { ForgetPasswordController } from "./forgetpassword.controller";



@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    providers:[ForgetPasswordService],
    controllers:[ForgetPasswordController]
})
export class ForgetPasswordModule{

}