"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Auth_guard_1 = require("../../guards/Auth.guard");
const role_decorator_1 = require("./role.decorator");
const Auth = (...roles) => (0, common_1.applyDecorators)((0, common_1.UseGuards)(Auth_guard_1.AuthGuard), (0, role_decorator_1.Role)(...roles), (0, swagger_1.ApiBearerAuth)());
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map