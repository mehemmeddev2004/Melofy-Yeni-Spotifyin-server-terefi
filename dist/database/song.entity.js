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
exports.SongEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const album_entity_1 = require("./album.entity");
const user_entity_1 = require("./user.entity");
const playlist_entity_1 = require("./playlist.entity");
const artists_entity_1 = require("./artists.entity");
const radio_session_entity_1 = require("./radio-session.entity");
const Comment_entity_1 = require("./Comment.entity");
let SongEntity = class SongEntity extends typeorm_1.BaseEntity {
    id;
    title;
    description;
    coverImageUrl;
    duration;
    playCount;
    trackNumber;
    discNumber;
    lyrics;
    isExplicit;
    isPublic;
    audioUrl;
    previewUrl;
    artists;
    album;
    comment;
    likedByUsers;
    playlists;
    radioStations;
    uploadedBy;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, coverImageUrl: { required: true, type: () => String }, duration: { required: true, type: () => Number }, playCount: { required: true, type: () => Number }, trackNumber: { required: true, type: () => Number }, discNumber: { required: true, type: () => Number }, lyrics: { required: true, type: () => String }, isExplicit: { required: true, type: () => Boolean }, isPublic: { required: true, type: () => Boolean }, audioUrl: { required: true, type: () => String }, previewUrl: { required: true, type: () => String }, artists: { required: true, type: () => [require("./artists.entity").ArtistEntity] }, album: { required: true, type: () => require("./album.entity").AlbumEntity }, comment: { required: true, type: () => require("./Comment.entity").CommentEntity }, likedByUsers: { required: true, type: () => [require("./user.entity").UserEntity] }, playlists: { required: true, type: () => [require("./playlist.entity").PlaylistEntity] }, radioStations: { required: true, type: () => [require("./radio-session.entity").RadioStationEntity] }, uploadedBy: { required: true, type: () => require("./user.entity").UserEntity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.SongEntity = SongEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SongEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], SongEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], SongEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SongEntity.prototype, "coverImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], SongEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], SongEntity.prototype, "playCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SongEntity.prototype, "trackNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SongEntity.prototype, "discNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], SongEntity.prototype, "lyrics", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], SongEntity.prototype, "isExplicit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], SongEntity.prototype, "isPublic", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], SongEntity.prototype, "audioUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SongEntity.prototype, "previewUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => artists_entity_1.ArtistEntity, (artist) => artist.songs),
    (0, typeorm_1.JoinTable)({
        name: "song_artists",
        joinColumn: { name: "song_id" },
        inverseJoinColumn: { name: "artist_id" },
    }),
    __metadata("design:type", Array)
], SongEntity.prototype, "artists", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => album_entity_1.AlbumEntity, (album) => album.songs, { nullable: true }),
    __metadata("design:type", album_entity_1.AlbumEntity)
], SongEntity.prototype, "album", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_entity_1.CommentEntity, (comment) => comment.song),
    __metadata("design:type", Comment_entity_1.CommentEntity)
], SongEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.likedSongs),
    __metadata("design:type", Array)
], SongEntity.prototype, "likedByUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => playlist_entity_1.PlaylistEntity, (playlist) => playlist.songs),
    __metadata("design:type", Array)
], SongEntity.prototype, "playlists", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => radio_session_entity_1.RadioStationEntity, (station) => station.songs),
    __metadata("design:type", Array)
], SongEntity.prototype, "radioStations", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.uploadedSongs),
    __metadata("design:type", user_entity_1.UserEntity)
], SongEntity.prototype, "uploadedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SongEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SongEntity.prototype, "updatedAt", void 0);
exports.SongEntity = SongEntity = __decorate([
    (0, typeorm_1.Entity)("songs")
], SongEntity);
//# sourceMappingURL=song.entity.js.map