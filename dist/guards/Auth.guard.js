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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nestjs_cls_1 = require("nestjs-cls");
const user_service_1 = require("../modules/users/user.service");
let AuthGuard = class AuthGuard {
    jwt;
    cls;
    userService;
    constructor(jwt, cls, userService) {
        this.jwt = jwt;
        this.cls = cls;
        this.userService = userService;
    }
    async canActivate(context) {
        let req = context.switchToHttp().getRequest();
        let token = (req.cookies?.authorization) || req.headers?.authorization;
        token = token?.split(' ')?.[1] || token;
        try {
            let payload = this.jwt.verify(token);
            if (!payload.userId)
                throw new common_1.UnauthorizedException();
            let user = await this.userService.getUser(payload.userId);
            if (!user)
                throw new common_1.UnauthorizedException();
            this.cls.set('user', user);
            console.log('[AuthGuard] Set user in CLS:', user);
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        nestjs_cls_1.ClsService,
        user_service_1.UserService])
], AuthGuard);
//# sourceMappingURL=Auth.guard.js.map