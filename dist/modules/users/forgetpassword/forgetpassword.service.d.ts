import { DataSource } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { CreateForgetPasswordDto } from "./validations/create-forget-password.dto";
import { ConfirmForgetPaswordDto } from "./validations/confirm-forget-password.dto";
export declare class ForgetPasswordService {
    private jwt;
    private mailService;
    private dataSource;
    private userRepo;
    private activationRepo;
    constructor(jwt: JwtService, mailService: MailerService, dataSource: DataSource);
    createForgetPasswordRequest(params: CreateForgetPasswordDto): Promise<{
        message: string;
    }>;
    confirmForgetPasswordRequest(params: ConfirmForgetPaswordDto): Promise<{
        message: string;
        token: string;
    }>;
}
