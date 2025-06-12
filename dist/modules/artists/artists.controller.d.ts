import { ArtistsService } from "./artists.service";
import { CreateArtistsDto } from "./validations/create-artists.dto";
import { UpdateArtistDto } from "./validations/update.artists.dto";
export declare class ArtistsController {
    private artistsService;
    constructor(artistsService: ArtistsService);
    list(): Promise<import("../../database/artists.entity").ArtistEntity[]>;
    findbyId(id: number): Promise<import("../../database/artists.entity").ArtistEntity>;
    create(body: CreateArtistsDto, categoryId: number): Promise<{
        message: string;
        artists: import("../../database/artists.entity").ArtistEntity;
    }>;
    update(id: number, body: UpdateArtistDto): Promise<{
        message: string;
        artist: import("../../database/artists.entity").ArtistEntity | null;
    }>;
    delete(id: number): Promise<{
        message: string;
        artists: import("../../database/artists.entity").ArtistEntity;
    }>;
}
