import { SongEntity } from "src/database/song.entity";
import { DataSource } from "typeorm";
import { CreateSongDto } from "./validations/create-song.dto";
import { UpdateSongDto } from "./validations/update-song.dto";
import { ClsService } from "nestjs-cls";
export declare class SongService {
    private cls;
    private dataSource;
    private artistRepo;
    private userRepo;
    private songRepo;
    private currentPlaylist;
    private currentIndex;
    constructor(cls: ClsService, dataSource: DataSource);
    list(): Promise<SongEntity[]>;
    findById(id: number): Promise<{
        result: SongEntity;
    }>;
    create(params: CreateSongDto): Promise<{
        message: string;
        song: SongEntity;
    }>;
    update(params: UpdateSongDto, id: number): Promise<{
        message: string;
        song: SongEntity | null;
    }>;
    delete(id: number): Promise<{
        message: string;
        result: SongEntity;
    }>;
    private loadPlaylist;
    startMusic(songId: number): Promise<{
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
}
