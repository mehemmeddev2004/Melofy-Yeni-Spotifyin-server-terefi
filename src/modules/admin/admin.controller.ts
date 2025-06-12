import { Body, Controller, Get, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";


import { LoginAdminDto } from "./validations/login-validationdto";
import { RegisterAdminDto } from "./validations/register-validation";
import { Response } from 'express';
import { AdminEntity } from "src/database/admin.entity";
import { AuthGuard } from "src/guards/Auth.guard";
import { AdminService } from "./admin.service";
import { UpdateSubscriptionDto } from "./validations/update-subscration.dto";


@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService,

    ) { }

    @Get()
    list() {
        return this.adminService.list()
    }
    @Post('login')
    login(@Body() Body: LoginAdminDto) {
        return this.adminService.login(Body)
    }
    @Post('register')

    register(@Body() body: RegisterAdminDto) {
        return this.adminService.register(body);
    }
    @Patch('user/:id/subscription')
    async updateUserSubscription(
      @Param('id') id: number,
      @Body() body: UpdateSubscriptionDto
    ) {
      return this.adminService.updateUserSubscription(Number(id), body);
    }
}