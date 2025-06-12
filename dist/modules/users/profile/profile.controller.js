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
exports.ProfileController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const create_profile_dto_1 = require("./validations/create-profile.dto");
const swagger_1 = require("@nestjs/swagger");
const Auth_guard_1 = require("../../../guards/Auth.guard");
let ProfileController = class ProfileController {
    ProfileService;
    constructor(ProfileService) {
        this.ProfileService = ProfileService;
    }
    list() {
        return this.ProfileService.list();
    }
    getProfileById(id) {
        return this.ProfileService.getProfileById(id);
    }
    getProfileByUserId(userId) {
        return this.ProfileService.getProfileByUserId(userId);
    }
    profile(body, userId) {
        return this.ProfileService.createProfile(body, userId);
    }
    update(body, id) {
        return this.ProfileService.updateProfile(id, body);
    }
    delete(id) {
        return this.ProfileService.deleteProfile(id);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../../database/profile.entity").ProfileEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../../database/profile.entity").ProfileEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfileById", null);
__decorate([
    (0, common_1.Get)(':id/userId'),
    openapi.ApiResponse({ status: 200, type: require("../../../database/profile.entity").ProfileEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfileByUserId", null);
__decorate([
    (0, common_1.Post)('user/:userId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: require("../../../database/profile.entity").ProfileEntity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profile_dto_1.createProfileDto, Number]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "profile", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../../database/profile.entity").ProfileEntity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profile_dto_1.UpdateProfileDto, Number]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "delete", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map