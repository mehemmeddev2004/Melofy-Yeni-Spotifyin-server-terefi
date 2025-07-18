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
exports.LoginAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const admin_enum_1 = require("../../../shared/enum/admin.enum");
class LoginAdminDto {
    email;
    password;
    role;
}
exports.LoginAdminDto = LoginAdminDto;
__decorate([
    (0, class_transformer_1.Type)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Type)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(admin_enum_1.AdminRole),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "role", void 0);
//# sourceMappingURL=login-validationdto.js.map