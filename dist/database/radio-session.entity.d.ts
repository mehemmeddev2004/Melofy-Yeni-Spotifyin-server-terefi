import { BaseEntity } from "typeorm";
import { SongEntity } from "./song.entity";
import { UserEntity } from "./user.entity";
import { CategoryEntity } from "./category.entity";
export declare enum RadioType {
    GENRE = "genre",
    ARTIST = "artist",
    MOOD = "mood",
    DECADE = "decade",
    CUSTOM = "custom"
}
export declare class RadioStationEntity extends BaseEntity {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    type: RadioType;
    isActive: boolean;
    listenerCount: number;
    totalPlays: number;
    songs: SongEntity[];
    followers: UserEntity[];
    creator: UserEntity;
    category: CategoryEntity;
    createdAt: Date;
    updatedAt: Date;
}
