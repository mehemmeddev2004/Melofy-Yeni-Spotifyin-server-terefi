import { UserEntity } from "./user.entity";
import { SongEntity } from "./song.entity";
export declare class LikeSongEntity {
    id: number;
    user: UserEntity;
    song: SongEntity;
}
