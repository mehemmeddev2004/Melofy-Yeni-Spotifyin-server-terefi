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
exports.CreateAlbumDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const album_entity_1 = require("../../../../database/album.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateAlbumDto {
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
    primaryArtistId;
    featuredArtistIds;
    categoryId;
    songIds;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: false, type: () => String }, coverImageUrl: { required: false, type: () => String }, releaseDate: { required: true, type: () => String }, type: { required: true, enum: require("../../../../database/album.entity").AlbumType }, totalTracks: { required: false, type: () => Number }, duration: { required: false, type: () => Number }, playCount: { required: false, type: () => Number }, recordLabel: { required: false, type: () => String }, producer: { required: false, type: () => String }, primaryArtistId: { required: false, type: () => Number }, featuredArtistIds: { required: false, type: () => [Number] }, categoryId: { required: true, type: () => Number }, songIds: { required: false, type: () => [Number] } };
    }
}
exports.CreateAlbumDto = CreateAlbumDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "coverImageUrl", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({ example: "2024-06-01" }),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "releaseDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(album_entity_1.AlbumType),
    (0, swagger_1.ApiProperty)({ enum: album_entity_1.AlbumType }),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateAlbumDto.prototype, "totalTracks", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateAlbumDto.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateAlbumDto.prototype, "playCount", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "recordLabel", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "producer", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateAlbumDto.prototype, "primaryArtistId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, swagger_1.ApiPropertyOptional)({ type: [Number] }),
    __metadata("design:type", Array)
], CreateAlbumDto.prototype, "featuredArtistIds", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateAlbumDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, swagger_1.ApiPropertyOptional)({ type: [Number] }),
    __metadata("design:type", Array)
], CreateAlbumDto.prototype, "songIds", void 0);
//# sourceMappingURL=create-album.dto.js.map