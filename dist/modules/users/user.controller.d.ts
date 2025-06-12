import { UserService } from "./user.service";
import { UserUpdateDto } from "./validations/update-user.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    list(): Promise<import("../../database/user.entity").UserEntity[]>;
    getUser(id: number): Promise<import("../../database/user.entity").UserEntity | null>;
    update(id: number, body: UserUpdateDto): Promise<import("../../database/user.entity").UserEntity>;
    likeSong(userId: number, songId: number): Promise<{
        message: string;
    }>;
    dislikeSong(userId: number, songId: number): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
