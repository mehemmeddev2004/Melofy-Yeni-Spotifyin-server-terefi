import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { AlbumEntity } from "src/database/album.entity";
import { ArtistEntity } from "src/database/artists.entity";
import { CategoryEntity } from "src/database/category.entity";
import { SongEntity } from "src/database/song.entity";
import { DataSource, Repository } from "typeorm";
import { CreateAlbumDto } from "./validations/create-album.dto";
import { FilterAlbumDto } from "./validations/filter-album.dto";
import { UpdateAlbumDto } from "./validations/update-album.dto";

@Injectable()
export class AlbumService {
  private albumRepo: Repository<AlbumEntity>
  private songRepo: Repository<SongEntity>
  private artistRepo: Repository<ArtistEntity>
  private categoryRepo: Repository<CategoryEntity>
  constructor(
    @InjectDataSource() private dataSource: DataSource
  ) {
    this.albumRepo = this.dataSource.getRepository(AlbumEntity)
    this.artistRepo = this.dataSource.getRepository(ArtistEntity)
    this.categoryRepo = this.dataSource.getRepository(CategoryEntity)
    this.songRepo = this.dataSource.getRepository(SongEntity)
  }

  async list() {
    try {
      const albums = await this.albumRepo.find({
        relations: ['featuredArtists', 'songs', 'category', 'likedByUsers'],
      });

      return albums.map((album) => {
        const { songs, category, ...rest } = album;
        return {
          ...rest,
          children: {
            songs,
            category,
          },
        };
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException("Albüm listelenemedi", err);
    }
  }


  findById(id: number) {
    let result = this.albumRepo.findOne({
      where: { id },
      relations: ['featuredArtists', 'songs', 'category', 'likedByUsers']
    });
    return result;
  }

  async filter(filter: FilterAlbumDto) {
    const query = this.albumRepo.createQueryBuilder('album');


    query.leftJoinAndSelect('album.featuredArtists', 'featuredArtists');
    query.leftJoinAndSelect('album.primaryArtist', 'primaryArtist');
    query.leftJoinAndSelect('album.category', 'category');

    if (filter.title) {
      query.andWhere('album.title LIKE :title', { title: `%${filter.title}%` });
    }

    if (filter.description) {
      query.andWhere('album.description LIKE :description', { description: `%${filter.description}%` });
    }

    if (filter.coverImageUrl) {
      query.andWhere('album.coverImageUrl = :coverImageUrl', { coverImageUrl: filter.coverImageUrl });
    }

    if (filter.releaseDateAfter) {
      query.andWhere('album.releaseDate >= :releaseDateAfter', { releaseDateAfter: filter.releaseDateAfter });
    }

    if (filter.releaseDateBefore) {
      query.andWhere('album.releaseDate <= :releaseDateBefore', { releaseDateBefore: filter.releaseDateBefore });
    }

    if (filter.type) {
      query.andWhere('album.type = :type', { type: filter.type });
    }

    if (filter.totalTracksMin) {
      query.andWhere('album.totalTracks >= :totalTracksMin', { totalTracksMin: filter.totalTracksMin });
    }

    if (filter.totalTracksMax) {
      query.andWhere('album.totalTracks <= :totalTracksMax', { totalTracksMax: filter.totalTracksMax });
    }

    if (filter.durationMin) {
      query.andWhere('album.duration >= :durationMin', { durationMin: filter.durationMin });
    }

    if (filter.durationMax) {
      query.andWhere('album.duration <= :durationMax', { durationMax: filter.durationMax });
    }

    if (filter.playCountMin) {
      query.andWhere('album.playCount >= :playCountMin', { playCountMin: filter.playCountMin });
    }

    if (filter.playCountMax) {
      query.andWhere('album.playCount <= :playCountMax', { playCountMax: filter.playCountMax });
    }

    if (filter.recordLabel) {
      query.andWhere('album.recordLabel LIKE :recordLabel', { recordLabel: `%${filter.recordLabel}%` });
    }

    if (filter.producer) {
      query.andWhere('album.producer LIKE :producer', { producer: `%${filter.producer}%` });
    }

    if (filter.primaryArtistId) {
      query.andWhere('album.primaryArtistId = :primaryArtistId', { primaryArtistId: filter.primaryArtistId });
    }

    if (filter.featuredArtistIds && filter.featuredArtistIds.length > 0) {
      query.andWhere('featuredArtists.id IN (:...featuredArtistIds)', { featuredArtistIds: filter.featuredArtistIds });
    }

    if (filter.categoryId) {
      query.andWhere('album.categoryId = :categoryId', { categoryId: filter.categoryId });
    }

    if (typeof filter.isPublic === 'boolean') {
      query.andWhere('album.isPublic = :isPublic', { isPublic: filter.isPublic });
    }

    const albums = await query.getMany();
    return albums;
  }


  async create(params: CreateAlbumDto) {
    try {
      let primaryArtist: ArtistEntity | null = null;

      if (params.primaryArtistId) {
        primaryArtist = await this.artistRepo.findOneBy({ id: params.primaryArtistId });
        if (!primaryArtist) {
          throw new BadRequestException("Primary artist bulunamadı");
        }
      }

      const featuredArtists = await Promise.all(
        (params.featuredArtistIds || []).map(async (id) => {
          if (id === params.primaryArtistId) {
            throw new BadRequestException("Primary artist featured listesine eklenemez");
          }

          const artist = await this.artistRepo.findOneBy({ id });
          if (!artist) {
            throw new BadRequestException(`ID'si ${id} olan featured artist bulunamadı`);
          }
          return artist;
        })
      );

      const category = await this.categoryRepo.findOneBy({ id: params.categoryId });
      if (!category) {
        throw new BadRequestException("Kategori bulunamadı");
      }


      let songs: SongEntity[] = [];
      if (params.songIds && params.songIds.length > 0) {
        songs = await this.songRepo.findByIds(params.songIds);
      }
      const albumData: any = {
        title: params.title,
        description: params.description,
        coverImageUrl: params.coverImageUrl,
        releaseDate: new Date(params.releaseDate),
        type: params.type,
        totalTracks: params.totalTracks || 0,
        duration: params.duration || 0,
        playCount: params.playCount || 0,
        recordLabel: params.recordLabel,
        producer: params.producer,
        featuredArtists,
        category,
        songs,
      };
      if (primaryArtist) albumData.primaryArtist = primaryArtist;

      const album = this.albumRepo.create(albumData);


      const result = await this.albumRepo.save(album);
      return result;

    } catch (err) {
      console.log(err);
      throw new BadRequestException("Albüm oluşturulamadı", err);
    }
  }


  async update(params: UpdateAlbumDto, id: number) {
    try {
      const album = await this.albumRepo.findOne({ where: { id } });
      if (!album) throw new Error('Album not found');

      Object.assign(album, params);

      const updatedAlbum = await this.albumRepo.save(album);

      return updatedAlbum;
    } catch (err) {
      console.log(err);
      throw new BadRequestException("Cannot update album, try again later", err);
    }
  }


  async delete(id: number) {
    try {
      return await this.albumRepo.delete({ id });
    } catch (err) {
      console.log(err);
      throw new BadRequestException("Cannot delete this album", err);
    }
  }
}
