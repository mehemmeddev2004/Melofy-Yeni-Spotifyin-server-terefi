import { ForgetPasswordService } from "./forgetpassword.service";
import { CreateForgetPasswordDto } from "./validations/create-forget-password.dto";
import { ConfirmForgetPaswordDto } from "./validations/confirm-forget-password.dto";
export declare class ForgetPasswordController {
    private ForgetPasswordService;
    constructor(ForgetPasswordService: ForgetPasswordService);
    createForgetPasswordRequest(body: CreateForgetPasswordDto): Promise<{
        message: string;
    }>;
    confirmPassword(body: ConfirmForgetPaswordDto): Promise<{
        message: string;
        token: string;
    }>;
}
