import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

import { DataSource, MoreThan, Repository } from "typeorm";
import { v4 } from 'uuid';
import { addMinutes } from 'date-fns';
import { JwtService } from "@nestjs/jwt";

import { MailerService } from "@nestjs-modules/mailer";

import { CreateForgetPasswordDto } from "./validations/create-forget-password.dto";
import { ConfirmForgetPaswordDto } from "./validations/confirm-forget-password.dto";
import { UserEntity } from "src/database/user.entity";
import { userActivationEntity } from "src/database/userActivation.entity";

@Injectable()
export class ForgetPasswordService{
    private userRepo: Repository<UserEntity>;
    private activationRepo: Repository<userActivationEntity>;
    
    constructor(  
    private jwt: JwtService,
    private mailService: MailerService,
    @InjectDataSource() private dataSource: DataSource,
  ) {
    this.userRepo = this.dataSource.getRepository(UserEntity);
    this.activationRepo = this.dataSource.getRepository(userActivationEntity);
  }
  async createForgetPasswordRequest(params:CreateForgetPasswordDto ){
    let user = await this.userRepo.findOne({
      where:{
      username: params.username,
      email: params.email
    }
    })
    if(!user) throw new NotFoundException("user is not found")

      let activation = await this.activationRepo.findOne({
        where: {
          userId: user.id,
          expiredAt: MoreThan(new Date()),
        },
      });

      
    if (!activation) {
      activation = this.activationRepo.create({
        userId: user.id,
        token: v4(),
        expiredAt: addMinutes(new Date(), 30),
      });

      await activation.save();
    }

    if (activation.attempts > 3) {
      throw new HttpException(
        'Too many requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const resetLink = `${params.callbackURL}?token=${activation.token}`;
    try {
      await this.mailService.sendMail({
        to: user.email,
        subject: `Forget Password Request`,
        template: 'forget-password',
        context: {
          username: user.username,
          resetLink,
        },
      });

      activation.attempts += 1;
      await activation.save();

      return {
        message: 'Mail has been successfully sent',
      };
    } catch (err) {
      console.error('Mailer error:', err);
      throw new InternalServerErrorException(
        `Mail sending failed: ${err.message}`,
      );
    }
  }

  async confirmForgetPasswordRequest(params: ConfirmForgetPaswordDto){
 let activation =  await this.activationRepo.findOne({
      where: {
        token: params.token,
        expiredAt: MoreThan(new Date()),
      }
    })
    
    if (!activation) throw new BadRequestException('Token is not valid');

    if(activation.attempts > 3)
      throw new  BadRequestException('please try again later')
    if(params.newPassword !== params.repeatPassword){
      throw new BadRequestException(
        'Repeat password is not match with new password',
      )
    }
    let user = await this.userRepo.findOne({
      where:{id: activation.userId}
    })
    if (!user) throw new NotFoundException('User not found');

    user.password = params.newPassword;
    await this.userRepo.save(user);

    await this.activationRepo.delete({ userId: user.id });

    let token = this.jwt.sign({ userId: user.id });

    return {
      message: 'Password is successfully updated',
      token,
    };
  }
}