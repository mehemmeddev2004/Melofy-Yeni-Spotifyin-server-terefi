import { PlaylistService } from "./playlist.service";
import { FilterPlaylistDto } from "./validations/filter-playlist.dto";
import { CreatePlaylistDto } from "./validations/create-playlist.dto";
import { UpdatePlaylistDto } from "./validations/update-playlist.dto";
export declare class PlaylistController {
    private playlistService;
    constructor(playlistService: PlaylistService);
    list(): Promise<import("../../../database/playlist.entity").PlaylistEntity[]>;
    findById(id: number): Promise<import("../../../database/playlist.entity").PlaylistEntity>;
    filter(query: FilterPlaylistDto): Promise<import("../../../database/playlist.entity").PlaylistEntity[]>;
    create(body: CreatePlaylistDto): Promise<{
        message: string;
        playlist: import("../../../database/playlist.entity").PlaylistEntity;
    }>;
    update(id: number, params: UpdatePlaylistDto): Promise<import("../../../database/playlist.entity").PlaylistEntity | null>;
    delete(id: number): Promise<{
        message: string;
        result: import("typeorm").DeleteResult;
    }>;
}
