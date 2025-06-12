import { BaseEntity } from "typeorm";
import { SongEntity } from "./song.entity";
import { CategoryEntity } from "./category.entity";
import { UserEntity } from "./user.entity";
import { ArtistEntity } from "./artists.entity";
export declare enum AlbumType {
    ALBUM = "album",
    EP = "ep",
    SINGLE = "single",
    COMPILATION = "compilation"
}
export declare class AlbumEntity extends BaseEntity {
    id: number;
    title: string;
    description: string;
    coverImageUrl: string;
    releaseDate: Date;
    type: AlbumType;
    totalTracks: number;
    duration: number;
    playCount: number;
    recordLabel: string;
    producer: string;
    primaryArtist: ArtistEntity;
    featuredArtists: ArtistEntity[];
    songs: SongEntity[];
    category: CategoryEntity;
    likedByUsers: UserEntity[];
    createdAt: Date;
    updatedAt: Date;
}
