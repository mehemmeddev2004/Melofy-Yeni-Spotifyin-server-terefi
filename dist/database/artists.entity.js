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
exports.ArtistEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const song_entity_1 = require("./song.entity");
const album_entity_1 = require("./album.entity");
const user_entity_1 = require("./user.entity");
const Image_entity_1 = require("./Image.entity");
let ArtistEntity = class ArtistEntity extends typeorm_1.BaseEntity {
    id;
    name;
    imageUrl;
    bio;
    country;
    website;
    followerCount;
    monthlyListeners;
    isVerified;
    songs;
    albums;
    featuredAlbums;
    artistImage;
    followers;
    category;
    parent;
    children;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, imageUrl: { required: true, type: () => String }, bio: { required: true, type: () => String }, country: { required: true, type: () => String }, website: { required: true, type: () => String }, followerCount: { required: true, type: () => Number }, monthlyListeners: { required: true, type: () => Number }, isVerified: { required: true, type: () => Boolean }, songs: { required: true, type: () => [require("./song.entity").SongEntity] }, albums: { required: true, type: () => [require("./album.entity").AlbumEntity] }, featuredAlbums: { required: true, type: () => [require("./album.entity").AlbumEntity] }, artistImage: { required: false, type: () => require("./Image.entity").ImageEntity }, followers: { required: true, type: () => [require("./user.entity").UserEntity] }, category: { required: true, type: () => require("./category.entity").CategoryEntity }, parent: { required: true, type: () => require("./artists.entity").ArtistEntity }, children: { required: true, type: () => [require("./artists.entity").ArtistEntity] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.ArtistEntity = ArtistEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ArtistEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ArtistEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ArtistEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ArtistEntity.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ArtistEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ArtistEntity.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ArtistEntity.prototype, "followerCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ArtistEntity.prototype, "monthlyListeners", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ArtistEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => song_entity_1.SongEntity, (song) => song.artists),
    __metadata("design:type", Array)
], ArtistEntity.prototype, "songs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => album_entity_1.AlbumEntity, (album) => album.primaryArtist),
    __metadata("design:type", Array)
], ArtistEntity.prototype, "albums", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => album_entity_1.AlbumEntity, (album) => album.featuredArtists, { nullable: true }),
    __metadata("design:type", Array)
], ArtistEntity.prototype, "featuredAlbums", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Image_entity_1.ImageEntity, (image) => image.artist, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Image_entity_1.ImageEntity)
], ArtistEntity.prototype, "artistImage", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.followedArtists),
    __metadata("design:type", Array)
], ArtistEntity.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.artists, { nullable: true, onDelete: "SET NULL" }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], ArtistEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ArtistEntity, artist => artist.children),
    __metadata("design:type", ArtistEntity)
], ArtistEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ArtistEntity, artist => artist.parent),
    __metadata("design:type", Array)
], ArtistEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ArtistEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ArtistEntity.prototype, "updatedAt", void 0);
exports.ArtistEntity = ArtistEntity = __decorate([
    (0, typeorm_1.Entity)("artists")
], ArtistEntity);
//# sourceMappingURL=artists.entity.js.map