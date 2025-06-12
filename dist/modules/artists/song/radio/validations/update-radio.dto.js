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
exports.UpdateRadioDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const radio_session_entity_1 = require("../../../../../database/radio-session.entity");
class UpdateRadioDto {
    name;
    description;
    imageUrl;
    type;
    listenerCount;
    totalPlays;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, imageUrl: { required: false, type: () => String }, type: { required: false, enum: require("../../../../../database/radio-session.entity").RadioType }, listenerCount: { required: false, type: () => Number }, totalPlays: { required: false, type: () => Number } };
    }
}
exports.UpdateRadioDto = UpdateRadioDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 'Chill Vibes', description: 'Radyonun adı' }),
    __metadata("design:type", String)
], UpdateRadioDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 'Dinlendirici müzikler', description: 'Açıklama' }),
    __metadata("design:type", String)
], UpdateRadioDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/image.jpg', description: 'Görsel URL' }),
    __metadata("design:type", String)
], UpdateRadioDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(radio_session_entity_1.RadioType, { message: 'Geçersiz radio türü' }),
    (0, swagger_1.ApiPropertyOptional)({ enum: radio_session_entity_1.RadioType, description: 'Radio türü (isteğe bağlı)' }),
    __metadata("design:type", String)
], UpdateRadioDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 150, description: 'Dinleyici sayısı' }),
    __metadata("design:type", Number)
], UpdateRadioDto.prototype, "listenerCount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 1000, description: 'Toplam oynatma sayısı' }),
    __metadata("design:type", Number)
], UpdateRadioDto.prototype, "totalPlays", void 0);
//# sourceMappingURL=update-radio.dto.js.map