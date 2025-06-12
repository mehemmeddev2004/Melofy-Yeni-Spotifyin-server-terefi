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
exports.CreateSongDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateSongDto {
    title;
    description;
    playCount;
    artistIds;
    uploadedById;
    audioUrl;
    coverImageUrl;
    duration;
    lyrics;
    isExplicit;
    isPublic;
    trackNumber;
    discNumber;
    previewUrl;
    albumId;
    radioStationIds;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: false, type: () => String }, playCount: { required: false, type: () => Number }, artistIds: { required: true, type: () => [Number] }, uploadedById: { required: true, type: () => Number }, audioUrl: { required: true, type: () => String }, coverImageUrl: { required: true, type: () => String }, duration: { required: true, type: () => Number }, lyrics: { required: false, type: () => String }, isExplicit: { required: true, type: () => Boolean }, isPublic: { required: true, type: () => Boolean }, trackNumber: { required: false, type: () => Number }, discNumber: { required: false, type: () => Number }, previewUrl: { required: false, type: () => String }, albumId: { required: false, type: () => Number }, radioStationIds: { required: false, type: () => [Number] } };
    }
}
exports.CreateSongDto = CreateSongDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Shape of You" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "A great song by Ed Sheeran", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSongDto.prototype, "playCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2] }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], CreateSongDto.prototype, "artistIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSongDto.prototype, "uploadedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://example.com/audio.mp3" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://example.com/image.jpg" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "coverImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 210 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSongDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Lyrics of the song", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "lyrics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSongDto.prototype, "isExplicit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSongDto.prototype, "isPublic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSongDto.prototype, "trackNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSongDto.prototype, "discNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://example.com/preview.mp3", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSongDto.prototype, "previewUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSongDto.prototype, "albumId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], CreateSongDto.prototype, "radioStationIds", void 0);
//# sourceMappingURL=create-song.dto.js.map