import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "src/database/user.entity";
import { compare, hash } from 'bcrypt';
import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import { AuthLoginDto } from "./validation/auth-login-validation";
import { AuthRegisterDto } from "./validation/auth-register-validation";
import { LoginAdminDto } from "src/modules/admin/validations/login-validationdto";

import config from "src/config";
import { ClsService } from "nestjs-cls";
import { JwtService } from "@nestjs/jwt";
import { LoginAttempts } from "src/database/Loginattemps.entity";

@Injectable()
export class AuthService{
private userRepo: Repository<UserEntity>
private loginAttemptsRepo: Repository<LoginAttempts>;
constructor(
    private cls: ClsService,
    private jwtService: JwtService,
    @InjectDataSource() private dataSource: DataSource
){
    this.userRepo = this.dataSource.getRepository(UserEntity)
    this.loginAttemptsRepo = this.dataSource.getRepository(LoginAttempts);
}
async login(params: AuthLoginDto) {
    if (!params.email) {
      throw new UnauthorizedException('Email is required');
    }
  
    const identifier = params.email.toLowerCase();
  
    const user = await this.userRepo.findOne({
      where: [
        { username: identifier },
        { email: identifier }
      ]
    });
  
    if (!user) {
      throw new UnauthorizedException('User or password is wrong');
    }
  
  
    const isPasswordValid = await compare(params.password, user.password);
    if (!isPasswordValid) {
      await this.addLoginAttempt(user);
      throw new UnauthorizedException('User or password is wrong');
    }
  
    const payload = { userId: user.id, };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
  

async register(params: AuthRegisterDto){
    if (!params.username || !params.email || !params.password) {
        throw new UnauthorizedException("Please fill all fields");
      }

      const existingUsername = await this.userRepo.findOne({
        where: { username: params.username },
      });
      if (existingUsername) {
        throw new ConflictException("Username already exists");
      }
    
     
      const existingEmail = await this.userRepo.findOne({
        where: { email: params.email },
      });
      if (existingEmail) {
        throw new ConflictException("Email already exists");
      }
    
 
      const hashedPassword = await hash(params.password, 10);
      const user = this.userRepo.create({
        ...params,
        password: hashedPassword
      });
      await this.userRepo.save(user);
    
      return user;
}

 async checkLoginAttempts(user: UserEntity) {
     let ip = this.cls.get('ip');

     let attempts = await this.loginAttemptsRepo.count({
       where: {
         userId: user.id,
         ip,
       },
     });

     if (attempts >= config.loginAttempts) {
       throw new HttpException(
         'Please try again later',
         HttpStatus.TOO_MANY_REQUESTS,
       );
     }
   }

  async addLoginAttempt(user: UserEntity) {
    let ip = this.cls.get('ip');

    let attempt = this.loginAttemptsRepo.create({
      ip,
      userId: user.id,
      createdAt: new Date(),
    });

    await attempt.save();
    return true;
  }

  async clearLoginAttempts(user: UserEntity) {
    let ip = this.cls.get('ip');
    await this.loginAttemptsRepo.delete({ ip, userId: user.id });
  }

}