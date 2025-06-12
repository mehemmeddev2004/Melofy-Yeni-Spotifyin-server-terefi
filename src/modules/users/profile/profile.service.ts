
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProfileEntity } from 'src/database/profile.entity';
import { createProfileDto, UpdateProfileDto } from './validations/create-profile.dto';
import { UserEntity } from 'src/database/user.entity';
import { ClsService } from 'nestjs-cls';


@Injectable()
export class ProfileService {
  private userRepo: Repository<UserEntity>
    private cls: ClsService; 
  private profileRepo: Repository<ProfileEntity>;

  constructor(@InjectDataSource() private dataSource: DataSource) {
    
    this.userRepo = this.dataSource.getRepository(UserEntity)
    this.profileRepo = this.dataSource.getRepository(ProfileEntity);
  }
  async list(){
    let result  = this.profileRepo.find()
    return result
  }

  async createProfile(params: createProfileDto, userId: number) {
    try {
        const exists = await this.profileRepo.findOne({ where: { userId } });
        if (exists) throw new BadRequestException('Profile already exists for this user');
        const profile = this.profileRepo.create({ ...params, userId });
        await this.profileRepo.save(profile);
        return profile;
    } catch (err) {
        console.log(err)
        throw new BadRequestException("Profile create failed", err)
    }
  }

  async getProfileById(id: number) {
    const profile = await this.profileRepo.findOne({ where: { id }, relations: ['user', 'profileImage'] });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async getProfileByUserId(userId: number) {
    const profile = await this.profileRepo.findOne({ where: { userId }, relations: ['user', 'profileImage'] });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateProfile(id: number, params: UpdateProfileDto) {
  try {
      const profile = await this.profileRepo.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Profile not found');
    Object.assign(profile, params);
    await this.profileRepo.save(profile);
    return profile;
  } catch (err) {
      console.log(err)
    throw new BadRequestException("Profile update failed",err)
  }
  }

  async deleteProfile(id: number) {
try {
      const profile = await this.profileRepo.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Profile not found');
    await this.profileRepo.delete(id);
    return { message: 'Profile deleted successfully' };
} catch (err) {
        console.log(err)
    throw new BadRequestException("Profile delete failed",err)
}
  }
}


