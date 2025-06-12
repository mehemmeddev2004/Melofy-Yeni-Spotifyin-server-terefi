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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const upload_entity_1 = require("./upload.entity");
const song_entity_1 = require("./song.entity");
const album_entity_1 = require("./album.entity");
const playlist_entity_1 = require("./playlist.entity");
const radio_session_entity_1 = require("./radio-session.entity");
const artists_entity_1 = require("./artists.entity");
const profile_entity_1 = require("./profile.entity");
const Comment_entity_1 = require("./Comment.entity");
const subscriation_enum_1 = require("../shared/enum/subscriation.enum");
const subscription_plan_entity_1 = require("./subscription-plan.entity");
let UserEntity = class UserEntity {
    subscription;
    id;
    username;
    email;
    password;
    firstName;
    lastName;
    dateOfBirth;
    country;
    upload;
    imageUrl;
    playlists;
    likedPlaylists;
    followedPlaylists;
    subscriptionPlan;
    uploadedSongs;
    likedSongs;
    likedAlbums;
    followedArtists;
    createdRadioStations;
    comment;
    profile;
    followedRadioStations;
    isActive;
    lastLoginAt;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { subscription: { required: true, enum: require("../shared/enum/subscriation.enum").Subscription }, id: { required: true, type: () => Number }, username: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, dateOfBirth: { required: true, type: () => Date }, country: { required: true, type: () => String }, upload: { required: true, type: () => require("./upload.entity").UploadEntity }, imageUrl: { required: true, type: () => String }, playlists: { required: true, type: () => [require("./playlist.entity").PlaylistEntity] }, likedPlaylists: { required: true, type: () => [require("./playlist.entity").PlaylistEntity] }, followedPlaylists: { required: true, type: () => [require("./playlist.entity").PlaylistEntity] }, subscriptionPlan: { required: true, type: () => require("./subscription-plan.entity").SubscriptionPlanEntity }, uploadedSongs: { required: true, type: () => [require("./song.entity").SongEntity] }, likedSongs: { required: true, type: () => [require("./song.entity").SongEntity] }, likedAlbums: { required: true, type: () => [require("./album.entity").AlbumEntity] }, followedArtists: { required: true, type: () => [require("./artists.entity").ArtistEntity] }, createdRadioStations: { required: true, type: () => [require("./radio-session.entity").RadioStationEntity] }, comment: { required: true, type: () => require("./Comment.entity").CommentEntity }, profile: { required: true, type: () => require("./profile.entity").ProfileEntity }, followedRadioStations: { required: true, type: () => [require("./radio-session.entity").RadioStationEntity] }, isActive: { required: true, type: () => Boolean }, lastLoginAt: { required: true, type: () => Date }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: subscriation_enum_1.Subscription,
        default: subscriation_enum_1.Subscription.Basic,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "subscription", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => upload_entity_1.UploadEntity),
    (0, typeorm_1.JoinColumn)({ name: "imageId", referencedColumnName: "id" }),
    __metadata("design:type", upload_entity_1.UploadEntity)
], UserEntity.prototype, "upload", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => playlist_entity_1.PlaylistEntity, (playlist) => playlist.owner),
    __metadata("design:type", Array)
], UserEntity.prototype, "playlists", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => playlist_entity_1.PlaylistEntity, (playlist) => playlist.likedByUsers),
    (0, typeorm_1.JoinTable)({
        name: "user_liked_playlists",
        joinColumn: { name: "user_id" },
        inverseJoinColumn: { name: "playlist_id" },
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "likedPlaylists", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => playlist_entity_1.PlaylistEntity, (playlist) => playlist.followedByUsers),
    (0, typeorm_1.JoinTable)({
        name: "user_followed_playlists",
        joinColumn: { name: "user_id" },
        inverseJoinColumn: { name: "playlist_id" },
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "followedPlaylists", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscription_plan_entity_1.SubscriptionPlanEntity),
    __metadata("design:type", subscription_plan_entity_1.SubscriptionPlanEntity)
], UserEntity.prototype, "subscriptionPlan", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => song_entity_1.SongEntity, (song) => song.uploadedBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "uploadedSongs", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => song_entity_1.SongEntity, (song) => song.likedByUsers),
    (0, typeorm_1.JoinTable)({
        name: "user_liked_songs",
        joinColumn: { name: "user_id" },
        inverseJoinColumn: { name: "song_id" },
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "likedSongs", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => album_entity_1.AlbumEntity, (album) => album.likedByUsers),
    (0, typeorm_1.JoinTable)({
        name: "user_liked_albums",
        joinColumn: { name: "user_id" },
        inverseJoinColumn: { name: "album_id" },
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "likedAlbums", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => artists_entity_1.ArtistEntity, (artist) => artist.followers),
    (0, typeorm_1.JoinTable)({
        name: "user_followed_artists",
        joinColumn: { name: "user_id" },
        inverseJoinColumn: { name: "artist_id" },
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "followedArtists", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => radio_session_entity_1.RadioStationEntity, (station) => station.creator),
    __metadata("design:type", Array)
], UserEntity.prototype, "createdRadioStations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_entity_1.CommentEntity, (comment) => comment.user),
    __metadata("design:type", Comment_entity_1.CommentEntity)
], UserEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.ProfileEntity, (profile) => profile.user, { cascade: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", profile_entity_1.ProfileEntity)
], UserEntity.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => radio_session_entity_1.RadioStationEntity, (station) => station.followers),
    (0, typeorm_1.JoinTable)({
        name: "user_followed_radio_stations",
        joinColumn: { name: "user_id" },
        inverseJoinColumn: { name: "station_id" },
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "followedRadioStations", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)("users")
], UserEntity);
//# sourceMappingURL=user.entity.js.map