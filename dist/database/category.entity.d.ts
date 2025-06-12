import { BaseEntity } from "typeorm";
import { AlbumEntity } from "./album.entity";
import { ArtistEntity } from "./artists.entity";
export declare class CategoryEntity extends BaseEntity {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    parentId: number | null;
    parent: CategoryEntity;
    children: CategoryEntity[];
    artists: ArtistEntity[];
    albums: AlbumEntity[];
    createdAt: Date;
    updatedAt: Date;
}
