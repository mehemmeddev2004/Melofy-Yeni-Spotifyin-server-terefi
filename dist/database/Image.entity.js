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
exports.ImageEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const profile_entity_1 = require("./profile.entity");
const artists_entity_1 = require("./artists.entity");
let ImageEntity = class ImageEntity extends typeorm_1.BaseEntity {
    id;
    url;
    profile;
    artist;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, url: { required: true, type: () => String }, profile: { required: true, type: () => require("./profile.entity").ProfileEntity }, artist: { required: true, type: () => require("./artists.entity").ArtistEntity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.ImageEntity = ImageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ImageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImageEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.ProfileEntity, (profile) => profile.profileImage),
    __metadata("design:type", profile_entity_1.ProfileEntity)
], ImageEntity.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => artists_entity_1.ArtistEntity, (artist) => artist.artistImage),
    __metadata("design:type", artists_entity_1.ArtistEntity)
], ImageEntity.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ImageEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ImageEntity.prototype, "updatedAt", void 0);
exports.ImageEntity = ImageEntity = __decorate([
    (0, typeorm_1.Entity)('Images')
], ImageEntity);
//# sourceMappingURL=Image.entity.js.map