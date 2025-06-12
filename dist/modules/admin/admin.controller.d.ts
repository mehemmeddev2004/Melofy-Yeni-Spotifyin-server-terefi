import { LoginAdminDto } from "./validations/login-validationdto";
import { RegisterAdminDto } from "./validations/register-validation";
import { AdminEntity } from "src/database/admin.entity";
import { AdminService } from "./admin.service";
import { UpdateSubscriptionDto } from "./validations/update-subscration.dto";
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    list(): Promise<AdminEntity[]>;
    login(Body: LoginAdminDto): Promise<{
        admin: AdminEntity;
        token: string;
    }>;
    register(body: RegisterAdminDto): Promise<AdminEntity>;
    updateUserSubscription(id: number, body: UpdateSubscriptionDto): Promise<import("../../database/user.entity").UserEntity>;
}
