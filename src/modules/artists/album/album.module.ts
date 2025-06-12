import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumEntity } from "src/database/album.entity";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";

@Module({
 imports:[TypeOrmModule.forFeature([AlbumEntity])],
 providers:[AlbumService],
 controllers:[AlbumController]
})
export class AlbumModule{}