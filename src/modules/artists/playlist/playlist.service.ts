import { InjectDataSource } from "@nestjs/typeorm";
import { PlaylistEntity } from "src/database/playlist.entity";
import { SongEntity } from "src/database/song.entity";
import { UserEntity } from "src/database/user.entity";
import { DataSource, In, Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreatePlaylistDto } from "./validations/create-playlist.dto";
import { FilterPlaylistDto } from "./validations/filter-playlist.dto";
import { UpdatePlaylistDto } from "./validations/update-playlist.dto";
import { ClsService } from "nestjs-cls";

@Injectable()
export class PlaylistService {
  private songRepo: Repository<SongEntity>;
  private userRepo: Repository<UserEntity>;
  private playlistRepo: Repository<PlaylistEntity>;

  constructor(
    private cls: ClsService,
    @InjectDataSource() private dataSource: DataSource
  ) {
    this.songRepo = this.dataSource.getRepository(SongEntity);
    this.userRepo = this.dataSource.getRepository(UserEntity);
    this.playlistRepo = this.dataSource.getRepository(PlaylistEntity);
  }

  async list() {
    return this.playlistRepo.find({
      relations: ["songs", "owner"],
    });
  }

  async findById(id: number) {
    const result = await this.playlistRepo.findOne({
      where: { id },
      relations: ["songs", "owner"],
    });

    if (!result) {
      throw new NotFoundException("Playlist not found");
    }

    return result;
  }

async create(params: CreatePlaylistDto) {
  let user = this.cls.get<UserEntity>('user');
  if(!user) throw new UnauthorizedException()

  const songs = await this.songRepo.find({
    where: { id: In(params.songIds) },
  });

  if (songs.length !== params.songIds.length) {
    throw new BadRequestException('Some song IDs are invalid');
  }

  const newPlaylist = this.playlistRepo.create({
    name: params.name,
    description: params.description,
    coverImageUrl: params.coverImage,  
    songs,
    likedByUsers: [],
    followedByUsers: [],
  });

  await this.playlistRepo.save(newPlaylist);

  return {
    message: 'Playlist created successfully',
    playlist: newPlaylist,
  };
}

  async filter(params: FilterPlaylistDto) {
  const qb = this.playlistRepo.createQueryBuilder('playlist')
    .leftJoinAndSelect('playlist.owner', 'owner')
    .leftJoinAndSelect('playlist.songs', 'song')
    .leftJoinAndSelect('playlist.likedByUsers', 'likedUser')
    .leftJoinAndSelect('song.artist', 'artist');

 
  if (params.likedByUserId) {
    qb.andWhere('likedUser.id = :likedByUserId', { likedByUserId: params.likedByUserId });
  }

  if (params.songId) {
    qb.andWhere('song.id = :songId', { songId: params.songId });
  }

  if (params.artistId) {
    qb.andWhere('artist.id = :artistId', { artistId: params.artistId });
  }

  const results = await qb.getMany();
  return results;
}



async update(params: UpdatePlaylistDto, id: number) {
  const playlist = await this.playlistRepo.findOne({ where: { id } });
  if (!playlist) {
    throw new NotFoundException("Playlist not found");
  }

  await this.playlistRepo.update(id, params);


  return this.playlistRepo.findOne({
    where: { id },
    relations: ['songs', 'owner', 'likedByUsers', 'followedByUsers'],
  });
}


  async delete(id:number) {
   let result = await this.playlistRepo.delete(id)
   if(!result) throw new NotFoundException("playlist id is not found")
    await this.playlistRepo.delete(id)
    return {
      message: "playlist delete succesfully",
      result
    }
  }
}
