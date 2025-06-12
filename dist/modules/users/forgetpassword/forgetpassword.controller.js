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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const forgetpassword_service_1 = require("./forgetpassword.service");
const create_forget_password_dto_1 = require("./validations/create-forget-password.dto");
const confirm_forget_password_dto_1 = require("./validations/confirm-forget-password.dto");
let ForgetPasswordController = class ForgetPasswordController {
    ForgetPasswordService;
    constructor(ForgetPasswordService) {
        this.ForgetPasswordService = ForgetPasswordService;
    }
    createForgetPasswordRequest(body) {
        return this.ForgetPasswordService.createForgetPasswordRequest(body);
    }
    confirmPassword(body) {
        return this.ForgetPasswordService.confirmForgetPasswordRequest(body);
    }
};
exports.ForgetPasswordController = ForgetPasswordController;
__decorate([
    (0, common_1.Post)('/'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forget_password_dto_1.CreateForgetPasswordDto]),
    __metadata("design:returntype", void 0)
], ForgetPasswordController.prototype, "createForgetPasswordRequest", null);
__decorate([
    (0, common_1.Post)('/confirm'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_forget_password_dto_1.ConfirmForgetPaswordDto]),
    __metadata("design:returntype", void 0)
], ForgetPasswordController.prototype, "confirmPassword", null);
exports.ForgetPasswordController = ForgetPasswordController = __decorate([
    (0, common_1.Controller)('auth/forget-password'),
    __metadata("design:paramtypes", [forgetpassword_service_1.ForgetPasswordService])
], ForgetPasswordController);
//# sourceMappingURL=forgetpassword.controller.js.map