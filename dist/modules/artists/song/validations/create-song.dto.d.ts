export declare class CreateSongDto {
    title: string;
    description?: string;
    playCount?: number;
    artistIds: number[];
    uploadedById: number;
    audioUrl: string;
    coverImageUrl: string;
    duration: number;
    lyrics?: string;
    isExplicit: boolean;
    isPublic: boolean;
    trackNumber?: number;
    discNumber?: number;
    previewUrl?: string;
    albumId?: number;
    radioStationIds?: number[];
}
