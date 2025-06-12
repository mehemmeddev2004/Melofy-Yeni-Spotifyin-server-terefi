import { DataSource } from 'typeorm';
import { ProfileEntity } from 'src/database/profile.entity';
import { createProfileDto, UpdateProfileDto } from './validations/create-profile.dto';
export declare class ProfileService {
    private dataSource;
    private userRepo;
    private cls;
    private profileRepo;
    constructor(dataSource: DataSource);
    list(): Promise<ProfileEntity[]>;
    createProfile(params: createProfileDto, userId: number): Promise<ProfileEntity>;
    getProfileById(id: number): Promise<ProfileEntity>;
    getProfileByUserId(userId: number): Promise<ProfileEntity>;
    updateProfile(id: number, params: UpdateProfileDto): Promise<ProfileEntity>;
    deleteProfile(id: number): Promise<{
        message: string;
    }>;
}
