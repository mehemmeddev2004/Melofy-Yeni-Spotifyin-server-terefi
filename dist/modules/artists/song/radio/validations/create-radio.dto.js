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
exports.CreateRadioDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const radio_session_entity_1 = require("../../../../../database/radio-session.entity");
class CreateRadioDto {
    name;
    description;
    imageUrl;
    type;
    listenerCount;
    totalPlays;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, imageUrl: { required: true, type: () => String }, type: { required: false, enum: require("../../../../../database/radio-session.entity").RadioType }, listenerCount: { required: true, type: () => Number }, totalPlays: { required: true, type: () => Number } };
    }
}
exports.CreateRadioDto = CreateRadioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Chill Vibes', description: 'Radyonun adı' }),
    __metadata("design:type", String)
], CreateRadioDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Dinlendirici müzikler', description: 'Açıklama' }),
    __metadata("design:type", String)
], CreateRadioDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/image.jpg', description: 'Görsel URL' }),
    __metadata("design:type", String)
], CreateRadioDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(radio_session_entity_1.RadioType, { message: 'Geçersiz radio türü' }),
    (0, swagger_1.ApiPropertyOptional)({ enum: radio_session_entity_1.RadioType, description: 'Radio türü (isteğe bağlı)' }),
    __metadata("design:type", String)
], CreateRadioDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRadioDto.prototype, "listenerCount", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRadioDto.prototype, "totalPlays", void 0);
//# sourceMappingURL=create-radio.dto.js.map