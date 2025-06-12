import { ClsService } from "nestjs-cls";
import { AdminEntity } from "src/database/admin.entity";
import { DataSource } from "typeorm";
import { LoginAdminDto } from "./validations/login-validationdto";
import { RegisterAdminDto } from "./validations/register-validation";
import { JwtService } from "@nestjs/jwt";
import { FirebaseService } from "src/shared/libs/firebase/firebase.service";
import { UserEntity } from "src/database/user.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { UpdateSubscriptionDto } from "./validations/update-subscration.dto";
export declare class AdminService {
    private cls;
    private mailService;
    private jwtService;
    private firebaseService;
    private dataSource;
    private adminRepo;
    private userRepo;
    private subscriptionPlanRepo;
    constructor(cls: ClsService, mailService: MailerService, jwtService: JwtService, firebaseService: FirebaseService, dataSource: DataSource);
    list(): Promise<AdminEntity[]>;
    login(params: LoginAdminDto): Promise<{
        admin: AdminEntity;
        token: string;
    }>;
    updateUserSubscription(userId: number, params: UpdateSubscriptionDto): Promise<UserEntity>;
    register(params: RegisterAdminDto): Promise<AdminEntity>;
}
