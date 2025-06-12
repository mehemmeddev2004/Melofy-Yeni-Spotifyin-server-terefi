import { BaseEntity } from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { ArtistEntity } from "./artists.entity";
export declare class ImageEntity extends BaseEntity {
    id: number;
    url: string;
    profile: ProfileEntity;
    artist: ArtistEntity;
    createdAt: Date;
    updatedAt: Date;
}
