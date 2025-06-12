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
exports.ForgetPasswordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const user_entity_1 = require("../../../database/user.entity");
const userActivation_entity_1 = require("../../../database/userActivation.entity");
let ForgetPasswordService = class ForgetPasswordService {
    jwt;
    mailService;
    dataSource;
    userRepo;
    activationRepo;
    constructor(jwt, mailService, dataSource) {
        this.jwt = jwt;
        this.mailService = mailService;
        this.dataSource = dataSource;
        this.userRepo = this.dataSource.getRepository(user_entity_1.UserEntity);
        this.activationRepo = this.dataSource.getRepository(userActivation_entity_1.userActivationEntity);
    }
    async createForgetPasswordRequest(params) {
        let user = await this.userRepo.findOne({
            where: {
                username: params.username,
                email: params.email
            }
        });
        if (!user)
            throw new common_1.NotFoundException("user is not found");
        let activation = await this.activationRepo.findOne({
            where: {
                userId: user.id,
                expiredAt: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (!activation) {
            activation = this.activationRepo.create({
                userId: user.id,
                token: (0, uuid_1.v4)(),
                expiredAt: (0, date_fns_1.addMinutes)(new Date(), 30),
            });
            await activation.save();
        }
        if (activation.attempts > 3) {
            throw new common_1.HttpException('Too many requests', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        const resetLink = `${params.callbackURL}?token=${activation.token}`;
        try {
            await this.mailService.sendMail({
                to: user.email,
                subject: `Forget Password Request`,
                template: 'forget-password',
                context: {
                    username: user.username,
                    resetLink,
                },
            });
            activation.attempts += 1;
            await activation.save();
            return {
                message: 'Mail has been successfully sent',
            };
        }
        catch (err) {
            console.error('Mailer error:', err);
            throw new common_1.InternalServerErrorException(`Mail sending failed: ${err.message}`);
        }
    }
    async confirmForgetPasswordRequest(params) {
        let activation = await this.activationRepo.findOne({
            where: {
                token: params.token,
                expiredAt: (0, typeorm_2.MoreThan)(new Date()),
            }
        });
        if (!activation)
            throw new common_1.BadRequestException('Token is not valid');
        if (activation.attempts > 3)
            throw new common_1.BadRequestException('please try again later');
        if (params.newPassword !== params.repeatPassword) {
            throw new common_1.BadRequestException('Repeat password is not match with new password');
        }
        let user = await this.userRepo.findOne({
            where: { id: activation.userId }
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.password = params.newPassword;
        await this.userRepo.save(user);
        await this.activationRepo.delete({ userId: user.id });
        let token = this.jwt.sign({ userId: user.id });
        return {
            message: 'Password is successfully updated',
            token,
        };
    }
};
exports.ForgetPasswordService = ForgetPasswordService;
exports.ForgetPasswordService = ForgetPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mailer_1.MailerService,
        typeorm_2.DataSource])
], ForgetPasswordService);
//# sourceMappingURL=forgetpassword.service.js.map