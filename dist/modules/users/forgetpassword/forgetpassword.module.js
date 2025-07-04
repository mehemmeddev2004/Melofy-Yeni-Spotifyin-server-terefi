"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../database/user.entity");
const forgetpassword_service_1 = require("./forgetpassword.service");
const forgetpassword_controller_1 = require("./forgetpassword.controller");
let ForgetPasswordModule = class ForgetPasswordModule {
};
exports.ForgetPasswordModule = ForgetPasswordModule;
exports.ForgetPasswordModule = ForgetPasswordModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity])],
        providers: [forgetpassword_service_1.ForgetPasswordService],
        controllers: [forgetpassword_controller_1.ForgetPasswordController]
    })
], ForgetPasswordModule);
//# sourceMappingURL=forgetpassword.module.js.map