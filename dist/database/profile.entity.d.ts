import { BaseEntity } from "typeorm";
import { UserEntity } from "./user.entity";
import { ImageEntity } from "./Image.entity";
export declare class ProfileEntity extends BaseEntity {
    id: number;
    displayName: string;
    bio: string;
    userId: number;
    user: UserEntity;
    follower: number;
    following: number;
    profileImage?: ImageEntity;
}
