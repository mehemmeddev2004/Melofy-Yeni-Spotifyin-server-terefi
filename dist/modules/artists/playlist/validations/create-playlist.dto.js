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
exports.CreatePlaylistDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePlaylistDto {
    name;
    description;
    coverImage;
    ownerId;
    songIds;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3 }, description: { required: true, type: () => String, minLength: 3 }, coverImage: { required: true, type: () => String, minLength: 3 }, ownerId: { required: true, type: () => Number }, songIds: { required: true, type: () => [Number], minItems: 1 } };
    }
}
exports.CreatePlaylistDto = CreatePlaylistDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)({ example: 'Workout Mix' }),
    __metadata("design:type", String)
], CreatePlaylistDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)({ example: 'Enerji dolu parçalar' }),
    __metadata("design:type", String)
], CreatePlaylistDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)({ example: 'cover.jpg' }),
    __metadata("design:type", String)
], CreatePlaylistDto.prototype, "coverImage", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({ example: 5, description: "Playlist sahibinin user ID'si" }),
    __metadata("design:type", Number)
], CreatePlaylistDto.prototype, "ownerId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: [1, 2, 3],
        description: "Playlist'e eklenecek şarkı ID'leri"
    }),
    __metadata("design:type", Array)
], CreatePlaylistDto.prototype, "songIds", void 0);
//# sourceMappingURL=create-playlist.dto.js.map