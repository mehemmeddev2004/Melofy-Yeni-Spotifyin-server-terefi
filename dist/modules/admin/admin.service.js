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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const bcrypt_1 = require("bcrypt");
const admin_entity_1 = require("../../database/admin.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const firebase_service_1 = require("../../shared/libs/firebase/firebase.service");
const user_entity_1 = require("../../database/user.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const subscription_plan_entity_1 = require("../../database/subscription-plan.entity");
let AdminService = class AdminService {
    cls;
    mailService;
    jwtService;
    firebaseService;
    dataSource;
    adminRepo;
    userRepo;
    subscriptionPlanRepo;
    constructor(cls, mailService, jwtService, firebaseService, dataSource) {
        this.cls = cls;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.firebaseService = firebaseService;
        this.dataSource = dataSource;
        this.adminRepo = this.dataSource.getRepository(admin_entity_1.AdminEntity);
        this.userRepo = this.dataSource.getRepository(user_entity_1.UserEntity);
        this.subscriptionPlanRepo = this.dataSource.getRepository(subscription_plan_entity_1.SubscriptionPlanEntity);
    }
    list() {
        return this.adminRepo.find();
    }
    async login(params) {
        if (!params.email) {
            throw new common_1.BadRequestException("Email is required");
        }
        const identifier = params.email.toLowerCase();
        const where = [
            { adminname: identifier },
            { email: identifier },
        ];
        const admin = await this.adminRepo.findOne({ where });
        if (!admin) {
            throw new common_1.UnauthorizedException("User or password wrong");
        }
        const checkPassword = await (0, bcrypt_1.compare)(params.password, admin.password);
        if (!checkPassword) {
            throw new common_1.UnauthorizedException("User or password wrong");
        }
        const payload = { userId: admin.id, role: admin.role };
        const token = this.jwtService.sign(payload);
        return { admin, token };
    }
    async updateUserSubscription(userId, params) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['subscriptionPlan'],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (params.subscription)
            user.subscription = params.subscription;
        return this.userRepo.save(user);
    }
    async register(params) {
        if (!params.adminname || !params.email || !params.password) {
            throw new common_1.BadRequestException("Please fill all fields");
        }
        const [existingUsername, existingEmail] = await Promise.all([
            this.adminRepo.findOne({ where: { adminname: params.adminname } }),
            this.adminRepo.findOne({ where: { email: params.email } }),
        ]);
        if (existingUsername) {
            throw new common_1.ConflictException("Username already exists");
        }
        if (existingEmail) {
            throw new common_1.ConflictException("Email already exists");
        }
        const hashedPassword = await (0, bcrypt_1.hash)(params.password, 10);
        const newAdmin = this.adminRepo.create({
            ...params,
            password: hashedPassword,
        });
        await this.adminRepo.save(newAdmin);
        return newAdmin;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        mailer_1.MailerService,
        jwt_1.JwtService,
        firebase_service_1.FirebaseService,
        typeorm_2.DataSource])
], AdminService);
//# sourceMappingURL=admin.service.js.map