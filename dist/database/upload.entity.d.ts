import { BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UploadEntity extends BaseEntity {
    id: string;
    imageUrl: string;
    songUrl: string;
    user: UserEntity;
    type: 'image' | 'audio';
    createdAt: Date;
    updatedAt: Date;
}
