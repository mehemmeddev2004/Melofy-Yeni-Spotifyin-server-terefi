import { PlaylistEntity } from "src/database/playlist.entity";
import { DataSource } from "typeorm";
import { CreatePlaylistDto } from "./validations/create-playlist.dto";
import { FilterPlaylistDto } from "./validations/filter-playlist.dto";
import { UpdatePlaylistDto } from "./validations/update-playlist.dto";
import { ClsService } from "nestjs-cls";
export declare class PlaylistService {
    private cls;
    private dataSource;
    private songRepo;
    private userRepo;
    private playlistRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    list(): Promise<PlaylistEntity[]>;
    findById(id: number): Promise<PlaylistEntity>;
    create(params: CreatePlaylistDto): Promise<{
        message: string;
        playlist: PlaylistEntity;
    }>;
    filter(params: FilterPlaylistDto): Promise<PlaylistEntity[]>;
    update(params: UpdatePlaylistDto, id: number): Promise<PlaylistEntity | null>;
    delete(id: number): Promise<{
        message: string;
        result: import("typeorm").DeleteResult;
    }>;
}
