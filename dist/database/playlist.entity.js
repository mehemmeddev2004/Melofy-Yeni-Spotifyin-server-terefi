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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const song_entity_1 = require("./song.entity");
let PlaylistEntity = class PlaylistEntity extends typeorm_1.BaseEntity {
    id;
    name;
    description;
    coverImageUrl;
    isPublic;
    isCollaborative;
    playCount;
    followerCount;
    totalDuration;
    owner;
    songs;
    likedByUsers;
    followedByUsers;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, coverImageUrl: { required: true, type: () => String }, isPublic: { required: true, type: () => Boolean }, isCollaborative: { required: true, type: () => Boolean }, playCount: { required: true, type: () => Number }, followerCount: { required: true, type: () => Number }, totalDuration: { required: true, type: () => Number }, owner: { required: true, type: () => require("./user.entity").UserEntity }, songs: { required: true, type: () => [require("./song.entity").SongEntity] }, likedByUsers: { required: true, type: () => [require("./user.entity").UserEntity] }, followedByUsers: { required: true, type: () => [require("./user.entity").UserEntity] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.PlaylistEntity = PlaylistEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlaylistEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PlaylistEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], PlaylistEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlaylistEntity.prototype, "coverImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PlaylistEntity.prototype, "isPublic", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PlaylistEntity.prototype, "isCollaborative", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PlaylistEntity.prototype, "playCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PlaylistEntity.prototype, "followerCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PlaylistEntity.prototype, "totalDuration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.playlists),
    __metadata("design:type", user_entity_1.UserEntity)
], PlaylistEntity.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => song_entity_1.SongEntity, (song) => song.playlists),
    (0, typeorm_1.JoinTable)({
        name: "playlist_songs",
        joinColumn: { name: "playlist_id" },
        inverseJoinColumn: {
            name: "song_id",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], PlaylistEntity.prototype, "songs", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.likedPlaylists),
    __metadata("design:type", Array)
], PlaylistEntity.prototype, "likedByUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.followedPlaylists),
    __metadata("design:type", Array)
], PlaylistEntity.prototype, "followedByUsers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PlaylistEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PlaylistEntity.prototype, "updatedAt", void 0);
exports.PlaylistEntity = PlaylistEntity = __decorate([
    (0, typeorm_1.Entity)("playlists")
], PlaylistEntity);
//# sourceMappingURL=playlist.entity.js.map