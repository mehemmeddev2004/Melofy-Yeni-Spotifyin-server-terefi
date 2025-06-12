import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./validations/create-album.dto";
import { UpdateAlbumDto } from "./validations/update-album.dto";
import { FilterAlbumDto } from "./validations/filter-album.dto";
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    list(): Promise<{
        children: {
            songs: import("../../../database/song.entity").SongEntity[];
            category: import("../../../database/category.entity").CategoryEntity;
        };
        id: number;
        title: string;
        description: string;
        coverImageUrl: string;
        releaseDate: Date;
        type: import("../../../database/album.entity").AlbumType;
        totalTracks: number;
        duration: number;
        playCount: number;
        recordLabel: string;
        producer: string;
        primaryArtist: import("../../../database/artists.entity").ArtistEntity;
        featuredArtists: import("../../../database/artists.entity").ArtistEntity[];
        likedByUsers: import("../../../database/user.entity").UserEntity[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    filter(filter: FilterAlbumDto): Promise<import("../../../database/album.entity").AlbumEntity[]>;
    findById(id: number): Promise<import("../../../database/album.entity").AlbumEntity>;
    create(params: CreateAlbumDto): Promise<import("../../../database/album.entity").AlbumEntity[]>;
    update(id: number, params: UpdateAlbumDto): Promise<import("../../../database/album.entity").AlbumEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
