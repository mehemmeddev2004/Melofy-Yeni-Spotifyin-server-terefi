import { BaseEntity } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { SongEntity } from "./song.entity";
import { AlbumEntity } from "./album.entity";
import { UserEntity } from "./user.entity";
import { ImageEntity } from "./Image.entity";
export declare class ArtistEntity extends BaseEntity {
    id: number;
    name: string;
    imageUrl: string;
    bio: string;
    country: string;
    website: string;
    followerCount: number;
    monthlyListeners: number;
    isVerified: boolean;
    songs: SongEntity[];
    albums: AlbumEntity[];
    featuredAlbums: AlbumEntity[];
    artistImage?: ImageEntity;
    followers: UserEntity[];
    category: CategoryEntity;
    parent: ArtistEntity;
    children: ArtistEntity[];
    createdAt: Date;
    updatedAt: Date;
}
