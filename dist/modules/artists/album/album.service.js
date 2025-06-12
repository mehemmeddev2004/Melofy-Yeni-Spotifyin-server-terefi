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
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const album_entity_1 = require("../../../database/album.entity");
const artists_entity_1 = require("../../../database/artists.entity");
const category_entity_1 = require("../../../database/category.entity");
const song_entity_1 = require("../../../database/song.entity");
const typeorm_2 = require("typeorm");
let AlbumService = class AlbumService {
    dataSource;
    albumRepo;
    songRepo;
    artistRepo;
    categoryRepo;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.albumRepo = this.dataSource.getRepository(album_entity_1.AlbumEntity);
        this.artistRepo = this.dataSource.getRepository(artists_entity_1.ArtistEntity);
        this.categoryRepo = this.dataSource.getRepository(category_entity_1.CategoryEntity);
        this.songRepo = this.dataSource.getRepository(song_entity_1.SongEntity);
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
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException("Albüm listelenemedi", err);
        }
    }
    findById(id) {
        let result = this.albumRepo.findOne({
            where: { id },
            relations: ['featuredArtists', 'songs', 'category', 'likedByUsers']
        });
        return result;
    }
    async filter(filter) {
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
    async create(params) {
        try {
            let primaryArtist = null;
            if (params.primaryArtistId) {
                primaryArtist = await this.artistRepo.findOneBy({ id: params.primaryArtistId });
                if (!primaryArtist) {
                    throw new common_1.BadRequestException("Primary artist bulunamadı");
                }
            }
            const featuredArtists = await Promise.all((params.featuredArtistIds || []).map(async (id) => {
                if (id === params.primaryArtistId) {
                    throw new common_1.BadRequestException("Primary artist featured listesine eklenemez");
                }
                const artist = await this.artistRepo.findOneBy({ id });
                if (!artist) {
                    throw new common_1.BadRequestException(`ID'si ${id} olan featured artist bulunamadı`);
                }
                return artist;
            }));
            const category = await this.categoryRepo.findOneBy({ id: params.categoryId });
            if (!category) {
                throw new common_1.BadRequestException("Kategori bulunamadı");
            }
            let songs = [];
            if (params.songIds && params.songIds.length > 0) {
                songs = await this.songRepo.findByIds(params.songIds);
            }
            const albumData = {
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
            if (primaryArtist)
                albumData.primaryArtist = primaryArtist;
            const album = this.albumRepo.create(albumData);
            const result = await this.albumRepo.save(album);
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException("Albüm oluşturulamadı", err);
        }
    }
    async update(params, id) {
        try {
            const album = await this.albumRepo.findOne({ where: { id } });
            if (!album)
                throw new Error('Album not found');
            Object.assign(album, params);
            const updatedAlbum = await this.albumRepo.save(album);
            return updatedAlbum;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException("Cannot update album, try again later", err);
        }
    }
    async delete(id) {
        try {
            return await this.albumRepo.delete({ id });
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException("Cannot delete this album", err);
        }
    }
};
exports.AlbumService = AlbumService;
exports.AlbumService = AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AlbumService);
//# sourceMappingURL=album.service.js.map