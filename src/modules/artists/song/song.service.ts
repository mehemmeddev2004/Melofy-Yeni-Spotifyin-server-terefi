import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { SongEntity } from "src/database/song.entity";
import { DataSource, Repository } from "typeorm";
import { CreateSongDto } from "./validations/create-song.dto";
import { UserEntity } from "src/database/user.entity";
import { ArtistEntity } from "src/database/artists.entity";
import { UpdateSongDto } from "./validations/update-song.dto";
import { ClsService } from "nestjs-cls";

export class SongService {
  private artistRepo: Repository<ArtistEntity>;
  private userRepo: Repository<UserEntity>;
  private songRepo: Repository<SongEntity>;

  // State: şu anki oynatma listesi ve index
  private currentPlaylist: SongEntity[] = [];
  private currentIndex: number = -1;

  constructor(
    private cls: ClsService,
    @InjectDataSource() private dataSource: DataSource
  ) {
    this.artistRepo = this.dataSource.getRepository(ArtistEntity);
    this.songRepo = this.dataSource.getRepository(SongEntity);
    this.userRepo = this.dataSource.getRepository(UserEntity);
  }

  // Diğer metotların aynen kalsın (list, findById, create, update, delete)...

  async list() {
    return this.songRepo.find({
      relations: ["artists", "uploadedBy", "album", "likedByUsers", "playlists", "radioStations"],
    });
  }

  async findById(id: number) {
    const result = await this.songRepo.findOne({
      where: { id },
      relations: [
        "likedByUsers",
        "playlists",
        "artists",
        "artists.category",
        "artists.image",
        "uploadedBy",
      ],
    });
    if (!result) throw new NotFoundException("song id is not found");
    return { result };
  }

  async create(params: CreateSongDto) {
    try {
       let user = this.cls.get<UserEntity>('user');
       if(!user) throw new UnauthorizedException()

      const artists = await this.artistRepo.findByIds(params.artistIds || []);
      if (!artists.length) throw new NotFoundException("Artists not found");

      const newSong = this.songRepo.create({
        title: params.title,
        description: params.description,
        playCount: params.playCount ?? 0,
        artists,
        likedByUsers: [],
        playlists: [],
        coverImageUrl: params.coverImageUrl,
        duration: params.duration ?? 0,
        audioUrl: params.audioUrl,
        previewUrl: params.previewUrl,
        trackNumber: params.trackNumber,
        discNumber: params.discNumber,
        lyrics: params.lyrics,
        isExplicit: params.isExplicit ?? true,
        isPublic: params.isPublic ?? true,
      });

      await this.songRepo.save(newSong);

      return {
        message: "Song created successfully",
        song: newSong,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException("Failed to create song", err);
    }
  }

  async update(params: UpdateSongDto, id: number) {
    try {
      const result = await this.songRepo.findOne({ where: { id } });
      if (!result) throw new NotFoundException("song id is not found");

      await this.songRepo.update(id, params);

      const updated = await this.songRepo.findOne({ where: { id } });

      return {
        message: "Song update is succesfully",
        song: updated,
      };
    } catch (err) {
      throw new BadRequestException("song update deleted", err);
    }
  }

  async delete(id: number) {
    const result = await this.songRepo.findOne({ where: { id } });
    if (!result) throw new NotFoundException("song id is not found");
    await this.songRepo.delete(id);
    return {
      message: "song deleted succesfully",
      result,
    };
  }

  // Load full playlist with relations if empty
  private async loadPlaylist(): Promise<void> {
    if (this.currentPlaylist.length === 0) {
      this.currentPlaylist = await this.songRepo.find({ relations: ['artists', 'album'] });
      this.currentIndex = -1;
    }
  }

  async startMusic(songId: number) {
    const song = await this.songRepo.findOne({
      where: { id: songId },
      relations: ['artists', 'album'],
    });
    if (!song) throw new NotFoundException("Song is not found");

    await this.loadPlaylist();
    this.currentIndex = this.currentPlaylist.findIndex((s) => s.id === songId);

    if (this.currentIndex === -1) {

      this.currentPlaylist.push(song);
      this.currentIndex = this.currentPlaylist.length - 1;
    }

    song.playCount++;
    await this.songRepo.save(song);

    return {
      id: song.id,
      title: song.title,
      audioUrl: song.audioUrl,
      duration: song.duration,
      artists: song.artists.map((a) => ({ id: a.id, name: a.name })),
      album: song.album ? { id: song.album.id, title: song.album.title } : null,
    };
  }

  // Çalmayı durdur
  stopMusic() {
    this.currentIndex = -1;
    this.currentPlaylist = [];
    return { message: "Playback stopped" };
  }

  // Sonraki şarkıya geç
  async nextMusic() {
    await this.loadPlaylist();
    this.currentIndex = (this.currentIndex + 1) % this.currentPlaylist.length;
    const nextSong = this.currentPlaylist[this.currentIndex];
    nextSong.playCount++;
    await this.songRepo.save(nextSong);

    return {
      id: nextSong.id,
      title: nextSong.title,
      audioUrl: nextSong.audioUrl,
      duration: nextSong.duration,
      artists: nextSong.artists.map((a) => ({ id: a.id, name: a.name })),
      album: nextSong.album ? { id: nextSong.album.id, title: nextSong.album.title } : null,
    };
  }

  // Önceki şarkıya geç
  async prevMusic() {
    await this.loadPlaylist();
    this.currentIndex = (this.currentIndex - 1 + this.currentPlaylist.length) % this.currentPlaylist.length;
    const prevSong = this.currentPlaylist[this.currentIndex];
    prevSong.playCount++;
    await this.songRepo.save(prevSong);

    return {
      id: prevSong.id,
      title: prevSong.title,
      audioUrl: prevSong.audioUrl,
      duration: prevSong.duration,
      artists: prevSong.artists.map((a) => ({ id: a.id, name: a.name })),
      album: prevSong.album ? { id: prevSong.album.id, title: prevSong.album.title } : null,
    };
  }
}
