import { Body, Controller, Post } from "@nestjs/common";

import { AuthLoginDto } from "./validation/auth-login-validation";
import { AuthRegisterDto } from "./validation/auth-register-validation";
import { AuthService } from "./auth.service";

@Controller('user')
export class AuthController{
constructor(
    private authService: AuthService
){
    
}
@Post('login')
async login(@Body() body: AuthLoginDto){
    let result = await this.authService.login(body)
    return result
}
@Post('register')
async register(@Body() body: AuthRegisterDto){
    let result = await this.authService.register(body)
    return result
}

}