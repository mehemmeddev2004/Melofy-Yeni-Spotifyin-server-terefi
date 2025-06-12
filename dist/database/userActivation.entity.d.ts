import { BaseEntity } from 'typeorm';
export declare class userActivationEntity extends BaseEntity {
    id: number;
    userId: number;
    token: string;
    attempts: number;
    expiredAt: Date;
}
