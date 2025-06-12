import { UserEntity } from "src/database/user.entity";
import { UserUpdateDto } from "./validations/update-user.dto";
import { DataSource } from "typeorm";
export declare class UserService {
    private dataSource;
    private songRepo;
    private userRepo;
    constructor(dataSource: DataSource);
    list(): Promise<UserEntity[]>;
    getUser(id: number): Promise<UserEntity | null>;
    update(id: number, params: UserUpdateDto): Promise<UserEntity>;
    delete(id: number): Promise<{
        message: string;
    }>;
    likeSong(userId: number, songId: number): Promise<{
        message: string;
    }>;
    listPremisions(): void;
    dislikeSong(userId: number, songId: number): Promise<{
        message: string;
    }>;
}
