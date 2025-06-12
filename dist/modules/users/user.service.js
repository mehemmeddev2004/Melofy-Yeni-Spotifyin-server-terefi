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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../database/user.entity");
const bcrypt = require("bcrypt");
const song_entity_1 = require("../../database/song.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    dataSource;
    songRepo;
    userRepo;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.songRepo = this.dataSource.getRepository(song_entity_1.SongEntity);
        this.userRepo = this.dataSource.getRepository(user_entity_1.UserEntity);
    }
    list() {
        return this.userRepo.find({
            relations: [
                'playlists',
                'likedPlaylists',
                'followedPlaylists',
                'uploadedSongs',
                'likedSongs',
                'likedAlbums',
                'followedArtists',
                'createdRadioStations',
                'comment',
                'followedRadioStations'
            ],
        });
    }
    getUser(id) {
        return this.userRepo.findOne({ where: { id } });
    }
    async update(id, params) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        if (params.password) {
            const salt = await bcrypt.genSalt();
            params.password = await bcrypt.hash(params.password, salt);
        }
        if (params.email && params.email !== user.email) {
            const existingUser = await this.userRepo.findOne({ where: { email: params.email } });
            if (existingUser && existingUser.id !== id) {
                throw new common_1.BadRequestException("please try another email");
            }
        }
        Object.assign(user, params);
        return await this.userRepo.save(user);
    }
    async delete(id) {
        if (!id)
            throw new common_1.BadRequestException("ID must be provided");
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        await this.userRepo.delete(id);
        return {
            message: "User deleted successfully"
        };
    }
    async likeSong(userId, songId) {
        let user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['likedSongs']
        });
        if (!user)
            throw new common_1.NotFoundException("user is not found");
        const song = await this.songRepo.findOne({ where: { id: songId }, relations: ['uploadedBy'] });
        if (!song)
            throw new common_1.NotFoundException("Şarkı bulunamadı");
        const alreadyLiked = user.likedSongs.some((s) => s.id === songId);
        if (alreadyLiked) {
            throw new common_1.BadRequestException("Şarkıyı zaten beğendiniz.");
        }
        user.likedSongs.push(song);
        await this.userRepo.save(user);
        return { message: "Şarkı beğenildi." };
    }
    listPremisions() {
    }
    async dislikeSong(userId, songId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['likedSongs'],
        });
        if (!user)
            throw new common_1.NotFoundException("Kullanıcı bulunamadı");
        const song = await this.songRepo.findOne({ where: { id: songId } });
        if (!song)
            throw new common_1.NotFoundException("Şarkı bulunamadı");
        const index = user.likedSongs.findIndex(s => s.id === songId);
        if (index === -1) {
            throw new common_1.BadRequestException("Şarkıyı zaten beğenmiyorsunuz.");
        }
        user.likedSongs.splice(index, 1);
        await this.userRepo.save(user);
        return { message: "Şarkı beğenisi kaldırıldı." };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UserService);
//# sourceMappingURL=user.service.js.map