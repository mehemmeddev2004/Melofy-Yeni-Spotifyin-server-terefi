import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "src/database/Comment.entity";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { UserModule } from "../user.module";

@Module({
imports:[TypeOrmModule.forFeature([CommentEntity]), UserModule],
providers:[CommentService],
controllers:[CommentController]
})
export class CommentModule{

}