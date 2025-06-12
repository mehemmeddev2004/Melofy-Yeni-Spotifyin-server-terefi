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
exports.CreateArtistsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateArtistsDto {
    name;
    imgUrl;
    country;
    website;
    followerCount = 0;
    monthlyListeners = 0;
    isVerified = true;
    bio;
    parentId;
    imageId;
    categoryId;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, imgUrl: { required: false, type: () => String }, country: { required: true, type: () => String }, website: { required: true, type: () => String }, followerCount: { required: false, type: () => Number, default: 0 }, monthlyListeners: { required: false, type: () => Number, default: 0 }, isVerified: { required: false, type: () => Boolean, default: true }, bio: { required: false, type: () => String }, parentId: { required: false, type: () => Number }, imageId: { required: false, type: () => String }, categoryId: { required: false, type: () => Number } };
    }
}
exports.CreateArtistsDto = CreateArtistsDto;
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, swagger_1.ApiProperty)({ example: "John Doe" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArtistsDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, swagger_1.ApiProperty)({ example: "artist-profile.jpg", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArtistsDto.prototype, "imgUrl", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArtistsDto.prototype, "country", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateArtistsDto.prototype, "website", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiPropertyOptional)({ example: 0, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateArtistsDto.prototype, "followerCount", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiPropertyOptional)({ example: 0, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateArtistsDto.prototype, "monthlyListeners", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateArtistsDto.prototype, "isVerified", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, swagger_1.ApiProperty)({ example: "An amazing singer and songwriter", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArtistsDto.prototype, "bio", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiProperty)({ example: 1, required: false, description: "Optional parent artist ID" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateArtistsDto.prototype, "parentId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    (0, swagger_1.ApiProperty)({ required: false, description: "Upload ID for the image" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArtistsDto.prototype, "imageId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateArtistsDto.prototype, "categoryId", void 0);
//# sourceMappingURL=create-artists.dto.js.map