"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const song_entity_1 = require("../../../database/song.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../database/user.entity");
const artists_entity_1 = require("../../../database/artists.entity");
const nestjs_cls_1 = require("nestjs-cls");
let SongService = class SongService {
    cls;
    dataSource;
    artistRepo;
    userRepo;
    songRepo;
    currentPlaylist = [];
    currentIndex = -1;
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.artistRepo = this.dataSource.getRepository(artists_entity_1.ArtistEntity);
        this.songRepo = this.dataSource.getRepository(song_entity_1.SongEntity);
        this.userRepo = this.dataSource.getRepository(user_entity_1.UserEntity);
    }
    async list() {
        return this.songRepo.find({
            relations: ["artists", "uploadedBy", "album", "likedByUsers", "playlists", "radioStations"],
        });
    }
    async findById(id) {
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
        if (!result)
            throw new common_1.NotFoundException("song id is not found");
        return { result };
    }
    async create(params) {
        try {
            let user = this.cls.get('user');
            if (!user)
                throw new common_1.UnauthorizedException();
            const artists = await this.artistRepo.findByIds(params.artistIds || []);
            if (!artists.length)
                throw new common_1.NotFoundException("Artists not found");
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
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException("Failed to create song", err);
        }
    }
    async update(params, id) {
        try {
            const result = await this.songRepo.findOne({ where: { id } });
            if (!result)
                throw new common_1.NotFoundException("song id is not found");
            await this.songRepo.update(id, params);
            const updated = await this.songRepo.findOne({ where: { id } });
            return {
                message: "Song update is succesfully",
                song: updated,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("song update deleted", err);
        }
    }
    async delete(id) {
        const result = await this.songRepo.findOne({ where: { id } });
        if (!result)
            throw new common_1.NotFoundException("song id is not found");
        await this.songRepo.delete(id);
        return {
            message: "song deleted succesfully",
            result,
        };
    }
    async loadPlaylist() {
        if (this.currentPlaylist.length === 0) {
            this.currentPlaylist = await this.songRepo.find({ relations: ['artists', 'album'] });
            this.currentIndex = -1;
        }
    }
    async startMusic(songId) {
        const song = await this.songRepo.findOne({
            where: { id: songId },
            relations: ['artists', 'album'],
        });
        if (!song)
            throw new common_1.NotFoundException("Song is not found");
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
    stopMusic() {
        this.currentIndex = -1;
        this.currentPlaylist = [];
        return { message: "Playback stopped" };
    }
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
};
exports.SongService = SongService;
exports.SongService = SongService = __decorate([
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], SongService);
//# sourceMappingURL=song.service.js.map