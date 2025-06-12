import { SongService } from "./song.service";
import { CreateSongDto } from "./validations/create-song.dto";
import { UpdateSongDto } from "./validations/update-song.dto";
export declare class SongController {
    private readonly songService;
    constructor(songService: SongService);
    list(): Promise<import("../../../database/song.entity").SongEntity[]>;
    findById(id: number): Promise<{
        result: import("../../../database/song.entity").SongEntity;
    }>;
    create(body: CreateSongDto): Promise<{
        message: string;
        song: import("../../../database/song.entity").SongEntity;
    }>;
    update(body: UpdateSongDto, id: number): Promise<{
        message: string;
        song: import("../../../database/song.entity").SongEntity | null;
    }>;
    delete(id: number): Promise<{
        message: string;
        result: import("../../../database/song.entity").SongEntity;
    }>;
    startMusic(id: number): Promise<{
        id: number;
        title: string;
        audioUrl: string;
        duration: number;
        artists: {
            id: number;
            name: string;
        }[];
        album: {
            id: number;
            title: string;
        } | null;
    }>;
    nextMusic(): Promise<{
        id: number;
        title: string;
        audioUrl: string;
        duration: number;
        artists: {
            id: number;
            name: string;
        }[];
        album: {
            id: number;
            title: string;
        } | null;
    }>;
    prevMusic(): Promise<{
        id: number;
        title: string;
        audioUrl: string;
        duration: number;
        artists: {
            id: number;
            name: string;
        }[];
        album: {
            id: number;
            title: string;
        } | null;
    }>;
    stopMusic(): {
        message: string;
    };
}
