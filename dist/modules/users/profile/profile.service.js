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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("../../../database/profile.entity");
const user_entity_1 = require("../../../database/user.entity");
let ProfileService = class ProfileService {
    dataSource;
    userRepo;
    cls;
    profileRepo;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.userRepo = this.dataSource.getRepository(user_entity_1.UserEntity);
        this.profileRepo = this.dataSource.getRepository(profile_entity_1.ProfileEntity);
    }
    async list() {
        let result = this.profileRepo.find();
        return result;
    }
    async createProfile(params, userId) {
        try {
            const exists = await this.profileRepo.findOne({ where: { userId } });
            if (exists)
                throw new common_1.BadRequestException('Profile already exists for this user');
            const profile = this.profileRepo.create({ ...params, userId });
            await this.profileRepo.save(profile);
            return profile;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException("Profile create failed", err);
        }
    }
    async getProfileById(id) {
        const profile = await this.profileRepo.findOne({ where: { id }, relations: ['user', 'profileImage'] });
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        return profile;
    }
    async getProfileByUserId(userId) {
        const profile = await this.profileRepo.findOne({ where: { userId }, relations: ['user', 'profileImage'] });
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        return profile;
    }
    async updateProfile(id, params) {
        try {
            const profile = await this.profileRepo.findOne({ where: { id } });
            if (!profile)
                throw new common_1.NotFoundException('Profile not found');
            Object.assign(profile, params);
            await this.profileRepo.save(profile);
            return profile;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException("Profile update failed", err);
        }
    }
    async deleteProfile(id) {
        try {
            const profile = await this.profileRepo.findOne({ where: { id } });
            if (!profile)
                throw new common_1.NotFoundException('Profile not found');
            await this.profileRepo.delete(id);
            return { message: 'Profile deleted successfully' };
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException("Profile delete failed", err);
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ProfileService);
//# sourceMappingURL=profile.service.js.map