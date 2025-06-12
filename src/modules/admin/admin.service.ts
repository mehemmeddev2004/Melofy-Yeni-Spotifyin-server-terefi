import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { compare, hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { AdminEntity } from "src/database/admin.entity";
import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import {
  LoginAdminDto,

} from "./validations/login-validationdto";
import { RegisterAdminDto } from "./validations/register-validation";
import { JwtService } from "@nestjs/jwt";
import { FirebaseService } from "src/shared/libs/firebase/firebase.service";
import { AdminProvider, AdminRole } from "src/shared/enum/admin.enum";
import { UserEntity } from "src/database/user.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { SubscriptionPlanEntity } from "src/database/subscription-plan.entity";
import { UpdateSubscriptionDto } from "./validations/update-subscration.dto";

@Injectable()
export class AdminService {
  private adminRepo: Repository<AdminEntity>;
  private userRepo: Repository<UserEntity>;
  private subscriptionPlanRepo: Repository<SubscriptionPlanEntity>;

  constructor(
    private cls: ClsService,
    private mailService: MailerService,
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
    @InjectDataSource() private dataSource: DataSource
  ) {
    this.adminRepo = this.dataSource.getRepository(AdminEntity);
    this.userRepo = this.dataSource.getRepository(UserEntity);
    this.subscriptionPlanRepo = this.dataSource.getRepository(SubscriptionPlanEntity);
  }

  list(){
    return this.adminRepo.find()
  }
  async login(params: LoginAdminDto) {
    if (!params.email) {
      
      throw new BadRequestException("Email is required");
    }

    const identifier = params.email.toLowerCase();
    const where: FindOptionsWhere<AdminEntity>[] = [
      { adminname: identifier },
      { email: identifier },
    ];

    const admin = await this.adminRepo.findOne({ where });
    if (!admin) {
      throw new UnauthorizedException("User or password wrong");
    }

    
    const checkPassword = await compare(params.password, admin.password);
    if (!checkPassword) {
      throw new UnauthorizedException("User or password wrong");
    }

    const payload = { userId: admin.id, role: admin.role };
    const token = this.jwtService.sign(payload);

    return { admin, token };
  }

  async updateUserSubscription(userId: number, params: UpdateSubscriptionDto) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['subscriptionPlan'],
    });
    if (!user) throw new NotFoundException('User not found');
  
    if (params.subscription) user.subscription = params.subscription;
  
   
  
    return this.userRepo.save(user);
  }

  async register(params: RegisterAdminDto) {
    if (!params.adminname || !params.email || !params.password) {
      throw new BadRequestException("Please fill all fields");
    }
  
   
  
    const [existingUsername, existingEmail] = await Promise.all([
      this.adminRepo.findOne({ where: { adminname: params.adminname } }),
      this.adminRepo.findOne({ where: { email: params.email } }),
    ]);
  
    if (existingUsername) {
      throw new ConflictException("Username already exists");
    }
  
    if (existingEmail) {
      throw new ConflictException("Email already exists");
    }
  
    const hashedPassword = await hash(params.password, 10);
    const newAdmin = this.adminRepo.create({
      ...params,
      password: hashedPassword,
    });
  
    await this.adminRepo.save(newAdmin);
  
  
    return newAdmin;
  }
  

}
