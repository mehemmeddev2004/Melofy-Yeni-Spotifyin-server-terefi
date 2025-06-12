import { BaseEntity } from "typeorm";
import { UserEntity } from "./user.entity";
import { SongEntity } from "./song.entity";
export declare class PlaylistEntity extends BaseEntity {
    id: number;
    name: string;
    description: string;
    coverImageUrl: string;
    isPublic: boolean;
    isCollaborative: boolean;
    playCount: number;
    followerCount: number;
    totalDuration: number;
    owner: UserEntity;
    songs: SongEntity[];
    likedByUsers: UserEntity[];
    followedByUsers: UserEntity[];
    createdAt: Date;
    updatedAt: Date;
}
