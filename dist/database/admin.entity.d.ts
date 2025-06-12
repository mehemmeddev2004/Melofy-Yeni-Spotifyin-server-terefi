import { AdminProvider, AdminRole } from 'src/shared/enum/admin.enum';
export declare class AdminEntity {
    id: number;
    admin: string;
    adminname: string;
    email: string;
    password: string;
    role: AdminRole;
    provider: AdminProvider;
    providerId: string;
    premium: boolean;
    createdAt: Date;
    updatedAt: Date;
    beforeUpsert(): Promise<void>;
}
