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
exports.UpdateSongDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateSongDto {
    name;
    description;
    playCount;
    artistIds;
    uploadedById;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, playCount: { required: false, type: () => Number }, artistIds: { required: true, type: () => [Number] }, uploadedById: { required: true, type: () => Number } };
    }
}
exports.UpdateSongDto = UpdateSongDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateSongDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateSongDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ default: 0 }),
    __metadata("design:type", Number)
], UpdateSongDto.prototype, "playCount", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, swagger_1.ApiProperty)({ description: "Sanatçı ID listesi" }),
    __metadata("design:type", Array)
], UpdateSongDto.prototype, "artistIds", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({ description: "Şarkıyı yükleyen kullanıcının ID'si" }),
    __metadata("design:type", Number)
], UpdateSongDto.prototype, "uploadedById", void 0);
//# sourceMappingURL=update-song.dto.js.map