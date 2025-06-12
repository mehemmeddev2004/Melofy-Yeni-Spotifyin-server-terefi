import { AlbumEntity } from "src/database/album.entity";
import { ArtistEntity } from "src/database/artists.entity";
import { CategoryEntity } from "src/database/category.entity";
import { SongEntity } from "src/database/song.entity";
import { DataSource } from "typeorm";
import { CreateAlbumDto } from "./validations/create-album.dto";
import { FilterAlbumDto } from "./validations/filter-album.dto";
import { UpdateAlbumDto } from "./validations/update-album.dto";
export declare class AlbumService {
    private dataSource;
    private albumRepo;
    private songRepo;
    private artistRepo;
    private categoryRepo;
    constructor(dataSource: DataSource);
    list(): Promise<{
        children: {
            songs: SongEntity[];
            category: CategoryEntity;
        };
        id: number;
        title: string;
        description: string;
        coverImageUrl: string;
        releaseDate: Date;
        type: import("src/database/album.entity").AlbumType;
        totalTracks: number;
        duration: number;
        playCount: number;
        recordLabel: string;
        producer: string;
        primaryArtist: ArtistEntity;
        featuredArtists: ArtistEntity[];
        likedByUsers: import("../../../database/user.entity").UserEntity[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: number): Promise<AlbumEntity | null>;
    filter(filter: FilterAlbumDto): Promise<AlbumEntity[]>;
    create(params: CreateAlbumDto): Promise<AlbumEntity[]>;
    update(params: UpdateAlbumDto, id: number): Promise<AlbumEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
