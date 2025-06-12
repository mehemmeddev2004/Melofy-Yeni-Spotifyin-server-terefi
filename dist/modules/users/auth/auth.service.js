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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../database/user.entity");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("typeorm");
const config_1 = require("../../../config");
const nestjs_cls_1 = require("nestjs-cls");
const jwt_1 = require("@nestjs/jwt");
const Loginattemps_entity_1 = require("../../../database/Loginattemps.entity");
let AuthService = class AuthService {
    cls;
    jwtService;
    dataSource;
    userRepo;
    loginAttemptsRepo;
    constructor(cls, jwtService, dataSource) {
        this.cls = cls;
        this.jwtService = jwtService;
        this.dataSource = dataSource;
        this.userRepo = this.dataSource.getRepository(user_entity_1.UserEntity);
        this.loginAttemptsRepo = this.dataSource.getRepository(Loginattemps_entity_1.LoginAttempts);
    }
    async login(params) {
        if (!params.email) {
            throw new common_1.UnauthorizedException('Email is required');
        }
        const identifier = params.email.toLowerCase();
        const user = await this.userRepo.findOne({
            where: [
                { username: identifier },
                { email: identifier }
            ]
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User or password is wrong');
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(params.password, user.password);
        if (!isPasswordValid) {
            await this.addLoginAttempt(user);
            throw new common_1.UnauthorizedException('User or password is wrong');
        }
        const payload = { userId: user.id, };
        const token = this.jwtService.sign(payload);
        return { user, token };
    }
    async register(params) {
        if (!params.username || !params.email || !params.password) {
            throw new common_1.UnauthorizedException("Please fill all fields");
        }
        const existingUsername = await this.userRepo.findOne({
            where: { username: params.username },
        });
        if (existingUsername) {
            throw new common_1.ConflictException("Username already exists");
        }
        const existingEmail = await this.userRepo.findOne({
            where: { email: params.email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException("Email already exists");
        }
        const hashedPassword = await (0, bcrypt_1.hash)(params.password, 10);
        const user = this.userRepo.create({
            ...params,
            password: hashedPassword
        });
        await this.userRepo.save(user);
        return user;
    }
    async checkLoginAttempts(user) {
        let ip = this.cls.get('ip');
        let attempts = await this.loginAttemptsRepo.count({
            where: {
                userId: user.id,
                ip,
            },
        });
        if (attempts >= config_1.default.loginAttempts) {
            throw new common_1.HttpException('Please try again later', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
    }
    async addLoginAttempt(user) {
        let ip = this.cls.get('ip');
        let attempt = this.loginAttemptsRepo.create({
            ip,
            userId: user.id,
            createdAt: new Date(),
        });
        await attempt.save();
        return true;
    }
    async clearLoginAttempts(user) {
        let ip = this.cls.get('ip');
        await this.loginAttemptsRepo.delete({ ip, userId: user.id });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        jwt_1.JwtService,
        typeorm_2.DataSource])
], AuthService);
//# sourceMappingURL=auth.service.js.map