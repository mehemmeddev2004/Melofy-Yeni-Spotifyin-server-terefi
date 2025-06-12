import { AdminRole } from 'src/shared/enum/admin.enum';
export declare class LoginAdminDto {
    email: string;
    password: string;
    role?: AdminRole;
}
