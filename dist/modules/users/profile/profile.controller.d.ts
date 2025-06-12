import { ProfileService } from "./profile.service";
import { createProfileDto, UpdateProfileDto } from "./validations/create-profile.dto";
export declare class ProfileController {
    private ProfileService;
    constructor(ProfileService: ProfileService);
    list(): Promise<import("../../../database/profile.entity").ProfileEntity[]>;
    getProfileById(id: number): Promise<import("../../../database/profile.entity").ProfileEntity>;
    getProfileByUserId(userId: number): Promise<import("../../../database/profile.entity").ProfileEntity>;
    profile(body: createProfileDto, userId: number): Promise<import("../../../database/profile.entity").ProfileEntity>;
    update(body: UpdateProfileDto, id: number): Promise<import("../../../database/profile.entity").ProfileEntity>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
