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
exports.PlaylistService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const playlist_entity_1 = require("../../../database/playlist.entity");
const song_entity_1 = require("../../../database/song.entity");
const user_entity_1 = require("../../../database/user.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const nestjs_cls_1 = require("nestjs-cls");
let PlaylistService = class PlaylistService {
    cls;
    dataSource;
    songRepo;
    userRepo;
    playlistRepo;
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.songRepo = this.dataSource.getRepository(song_entity_1.SongEntity);
        this.userRepo = this.dataSource.getRepository(user_entity_1.UserEntity);
        this.playlistRepo = this.dataSource.getRepository(playlist_entity_1.PlaylistEntity);
    }
    async list() {
        return this.playlistRepo.find({
            relations: ["songs", "owner"],
        });
    }
    async findById(id) {
        const result = await this.playlistRepo.findOne({
            where: { id },
            relations: ["songs", "owner"],
        });
        if (!result) {
            throw new common_1.NotFoundException("Playlist not found");
        }
        return result;
    }
    async create(params) {
        let user = this.cls.get('user');
        if (!user)
            throw new common_1.UnauthorizedException();
        const songs = await this.songRepo.find({
            where: { id: (0, typeorm_2.In)(params.songIds) },
        });
        if (songs.length !== params.songIds.length) {
            throw new common_1.BadRequestException('Some song IDs are invalid');
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
    async filter(params) {
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
    async update(params, id) {
        const playlist = await this.playlistRepo.findOne({ where: { id } });
        if (!playlist) {
            throw new common_1.NotFoundException("Playlist not found");
        }
        await this.playlistRepo.update(id, params);
        return this.playlistRepo.findOne({
            where: { id },
            relations: ['songs', 'owner', 'likedByUsers', 'followedByUsers'],
        });
    }
    async delete(id) {
        let result = await this.playlistRepo.delete(id);
        if (!result)
            throw new common_1.NotFoundException("playlist id is not found");
        await this.playlistRepo.delete(id);
        return {
            message: "playlist delete succesfully",
            result
        };
    }
};
exports.PlaylistService = PlaylistService;
exports.PlaylistService = PlaylistService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], PlaylistService);
//# sourceMappingURL=playlist.service.js.map