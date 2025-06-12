import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaylistEntity } from "src/database/playlist.entity";
import { PlaylistService } from "./playlist.service";
import { PlaylistController } from "./playlist.controller";
import { UserModule } from "src/modules/users/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([PlaylistEntity]),UserModule],
    providers:[PlaylistService],
    controllers:[PlaylistController]
})
export class PlaylistModule{}