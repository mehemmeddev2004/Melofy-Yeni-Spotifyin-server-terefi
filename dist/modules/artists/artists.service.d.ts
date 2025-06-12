import { DataSource } from "typeorm";
import { ArtistEntity } from "src/database/artists.entity";
import { CreateArtistsDto } from "./validations/create-artists.dto";
import { UpdateArtistDto } from "./validations/update.artists.dto";
import { ClsService } from "nestjs-cls";
export declare class ArtistsService {
    private cls;
    private dataSource;
    private categoryRepo;
    private artistRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    list(): Promise<ArtistEntity[]>;
    findbyId(id: number): Promise<ArtistEntity>;
    create(params: CreateArtistsDto, id: number): Promise<{
        message: string;
        artists: ArtistEntity;
    }>;
    update(id: number, params: UpdateArtistDto): Promise<{
        message: string;
        artist: ArtistEntity | null;
    }>;
    delete(id: number): Promise<{
        message: string;
        artists: ArtistEntity;
    }>;
}
