import { AlbumType } from "src/database/album.entity";
export declare class FilterAlbumDto {
    title?: string;
    description?: string;
    coverImageUrl?: string;
    releaseDateAfter?: string;
    releaseDateBefore?: string;
    type?: AlbumType;
    totalTracksMin?: number;
    totalTracksMax?: number;
    durationMin?: number;
    durationMax?: number;
    playCountMin?: number;
    playCountMax?: number;
    recordLabel?: string;
    producer?: string;
    primaryArtistId?: number;
    featuredArtistIds?: number[];
    categoryId?: number;
    isPublic?: boolean;
}
