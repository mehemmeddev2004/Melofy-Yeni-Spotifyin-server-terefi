import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistEntity } from "src/database/artists.entity";
import { SongEntity } from "src/database/song.entity";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { UserModule } from "src/modules/users/user.module";

@Module({
    imports:[TypeOrmModule.forFeature([SongEntity,ArtistEntity]), UserModule],
    controllers:[SongController],
    providers: [SongService]
})
export class SongModule{}