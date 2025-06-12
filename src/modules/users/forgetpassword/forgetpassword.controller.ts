import { Body, Controller, Post } from "@nestjs/common";
import { ForgetPasswordService } from "./forgetpassword.service";
import { CreateForgetPasswordDto } from "./validations/create-forget-password.dto";
import { ConfirmForgetPaswordDto } from "./validations/confirm-forget-password.dto";


@Controller('auth/forget-password')
export class ForgetPasswordController{
    constructor(
        private ForgetPasswordService: ForgetPasswordService
    ){}

    @Post('/')
    
    createForgetPasswordRequest(@Body() body: CreateForgetPasswordDto) {
      return this.ForgetPasswordService.createForgetPasswordRequest(body); 
    }
    

    @Post('/confirm')
    confirmPassword(@Body() body: ConfirmForgetPaswordDto){
      return this.ForgetPasswordService.confirmForgetPasswordRequest(body)
    }
    
}