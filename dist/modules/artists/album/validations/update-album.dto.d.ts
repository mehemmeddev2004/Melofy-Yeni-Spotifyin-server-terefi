import { AlbumType } from "src/database/album.entity";
export declare class UpdateAlbumDto {
    title: string;
    description?: string;
    coverImageUrl?: string;
    releaseDate: string;
    type: AlbumType;
    totalTracks?: number;
    duration?: number;
    playCount?: number;
    recordLabel?: string;
    producer?: string;
    primaryArtistId: number;
    featuredArtistIds?: number[];
    categoryId: number;
}
