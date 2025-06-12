import { BaseEntity } from 'typeorm';
export declare class LoginAttempts extends BaseEntity {
    id: number;
    ip: string;
    userId: number;
    createdAt: Date;
}
