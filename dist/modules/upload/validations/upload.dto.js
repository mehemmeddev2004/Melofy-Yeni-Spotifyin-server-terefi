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
exports.UploadSongDto = exports.UploadImageDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class UploadImageDto {
    image;
    static _OPENAPI_METADATA_FACTORY() {
        return { image: { required: true, type: () => Object } };
    }
}
exports.UploadImageDto = UploadImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        description: 'Yüklenecek görsel dosya',
    }),
    __metadata("design:type", Object)
], UploadImageDto.prototype, "image", void 0);
class UploadSongDto {
    song;
    static _OPENAPI_METADATA_FACTORY() {
        return { song: { required: true, type: () => Object } };
    }
}
exports.UploadSongDto = UploadSongDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        description: 'Yüklenecek müzik dosyası (mp3, wav vs)',
    }),
    __metadata("design:type", Object)
], UploadSongDto.prototype, "song", void 0);
//# sourceMappingURL=upload.dto.js.map