import { UserEntity } from "src/database/user.entity";
import { DataSource } from "typeorm";
import { AuthLoginDto } from "./validation/auth-login-validation";
import { AuthRegisterDto } from "./validation/auth-register-validation";
import { ClsService } from "nestjs-cls";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private cls;
    private jwtService;
    private dataSource;
    private userRepo;
    private loginAttemptsRepo;
    constructor(cls: ClsService, jwtService: JwtService, dataSource: DataSource);
    login(params: AuthLoginDto): Promise<{
        user: UserEntity;
        token: string;
    }>;
    register(params: AuthRegisterDto): Promise<UserEntity>;
    checkLoginAttempts(user: UserEntity): Promise<void>;
    addLoginAttempt(user: UserEntity): Promise<boolean>;
    clearLoginAttempts(user: UserEntity): Promise<void>;
}
