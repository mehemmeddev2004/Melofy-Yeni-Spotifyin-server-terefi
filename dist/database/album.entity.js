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
exports.AlbumEntity = exports.AlbumType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const song_entity_1 = require("./song.entity");
const category_entity_1 = require("./category.entity");
const user_entity_1 = require("./user.entity");
const artists_entity_1 = require("./artists.entity");
var AlbumType;
(function (AlbumType) {
    AlbumType["ALBUM"] = "album";
    AlbumType["EP"] = "ep";
    AlbumType["SINGLE"] = "single";
    AlbumType["COMPILATION"] = "compilation";
})(AlbumType || (exports.AlbumType = AlbumType = {}));
let AlbumEntity = class AlbumEntity extends typeorm_1.BaseEntity {
    id;
    title;
    description;
    coverImageUrl;
    releaseDate;
    type;
    totalTracks;
    duration;
    playCount;
    recordLabel;
    producer;
    primaryArtist;
    featuredArtists;
    songs;
    category;
    likedByUsers;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, coverImageUrl: { required: true, type: () => String }, releaseDate: { required: true, type: () => Date }, type: { required: true, enum: require("./album.entity").AlbumType }, totalTracks: { required: true, type: () => Number }, duration: { required: true, type: () => Number }, playCount: { required: true, type: () => Number }, recordLabel: { required: true, type: () => String }, producer: { required: true, type: () => String }, primaryArtist: { required: true, type: () => require("./artists.entity").ArtistEntity }, featuredArtists: { required: true, type: () => [require("./artists.entity").ArtistEntity] }, songs: { required: true, type: () => [require("./song.entity").SongEntity] }, category: { required: true, type: () => require("./category.entity").CategoryEntity }, likedByUsers: { required: true, type: () => [require("./user.entity").UserEntity] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.AlbumEntity = AlbumEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AlbumEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], AlbumEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AlbumEntity.prototype, "coverImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], AlbumEntity.prototype, "releaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: AlbumType,
        default: AlbumType.ALBUM,
    }),
    __metadata("design:type", String)
], AlbumEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "totalTracks", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AlbumEntity.prototype, "playCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AlbumEntity.prototype, "recordLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AlbumEntity.prototype, "producer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => artists_entity_1.ArtistEntity, (artist) => artist.albums, { nullable: true }),
    __metadata("design:type", artists_entity_1.ArtistEntity)
], AlbumEntity.prototype, "primaryArtist", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => artists_entity_1.ArtistEntity, (artist) => artist.featuredAlbums, { nullable: true }),
    (0, typeorm_1.JoinTable)({
        name: "album_featured_artists",
        joinColumn: { name: "album_id" },
        inverseJoinColumn: { name: "artist_id" },
    }),
    __metadata("design:type", Array)
], AlbumEntity.prototype, "featuredArtists", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => song_entity_1.SongEntity, (song) => song.album),
    __metadata("design:type", Array)
], AlbumEntity.prototype, "songs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.albums),
    __metadata("design:type", category_entity_1.CategoryEntity)
], AlbumEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.likedAlbums),
    __metadata("design:type", Array)
], AlbumEntity.prototype, "likedByUsers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AlbumEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AlbumEntity.prototype, "updatedAt", void 0);
exports.AlbumEntity = AlbumEntity = __decorate([
    (0, typeorm_1.Entity)("albums")
], AlbumEntity);
//# sourceMappingURL=album.entity.js.map