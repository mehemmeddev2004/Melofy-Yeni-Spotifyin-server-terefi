import { AuthLoginDto } from "./validation/auth-login-validation";
import { AuthRegisterDto } from "./validation/auth-register-validation";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: AuthLoginDto): Promise<{
        user: import("../../../database/user.entity").UserEntity;
        token: string;
    }>;
    register(body: AuthRegisterDto): Promise<import("../../../database/user.entity").UserEntity>;
}
