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
exports.RadioStationEntity = exports.RadioType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const song_entity_1 = require("./song.entity");
const user_entity_1 = require("./user.entity");
const category_entity_1 = require("./category.entity");
var RadioType;
(function (RadioType) {
    RadioType["GENRE"] = "genre";
    RadioType["ARTIST"] = "artist";
    RadioType["MOOD"] = "mood";
    RadioType["DECADE"] = "decade";
    RadioType["CUSTOM"] = "custom";
})(RadioType || (exports.RadioType = RadioType = {}));
let RadioStationEntity = class RadioStationEntity extends typeorm_1.BaseEntity {
    id;
    name;
    description;
    imageUrl;
    type;
    isActive;
    listenerCount;
    totalPlays;
    songs;
    followers;
    creator;
    category;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, imageUrl: { required: true, type: () => String }, type: { required: true, enum: require("./radio-session.entity").RadioType }, isActive: { required: true, type: () => Boolean }, listenerCount: { required: true, type: () => Number }, totalPlays: { required: true, type: () => Number }, songs: { required: true, type: () => [require("./song.entity").SongEntity] }, followers: { required: true, type: () => [require("./user.entity").UserEntity] }, creator: { required: true, type: () => require("./user.entity").UserEntity }, category: { required: true, type: () => require("./category.entity").CategoryEntity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.RadioStationEntity = RadioStationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RadioStationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RadioStationEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], RadioStationEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RadioStationEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: RadioType,
        default: RadioType.CUSTOM,
    }),
    __metadata("design:type", String)
], RadioStationEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RadioStationEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], RadioStationEntity.prototype, "listenerCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], RadioStationEntity.prototype, "totalPlays", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => song_entity_1.SongEntity, (song) => song.radioStations),
    (0, typeorm_1.JoinTable)({
        name: "radio_station_songs",
        joinColumn: { name: "station_id" },
        inverseJoinColumn: { name: "song_id" },
    }),
    __metadata("design:type", Array)
], RadioStationEntity.prototype, "songs", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.followedRadioStations),
    __metadata("design:type", Array)
], RadioStationEntity.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.createdRadioStations, { nullable: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], RadioStationEntity.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, { nullable: true }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], RadioStationEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RadioStationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RadioStationEntity.prototype, "updatedAt", void 0);
exports.RadioStationEntity = RadioStationEntity = __decorate([
    (0, typeorm_1.Entity)("radio_stations")
], RadioStationEntity);
//# sourceMappingURL=radio-session.entity.js.map