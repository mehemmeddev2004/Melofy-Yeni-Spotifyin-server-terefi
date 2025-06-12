import { AdminRole } from 'src/shared/enum/admin.enum';
export declare class RegisterAdminDto {
    admin: string;
    adminname: string;
    email?: string;
    password: string;
    role?: AdminRole;
}
