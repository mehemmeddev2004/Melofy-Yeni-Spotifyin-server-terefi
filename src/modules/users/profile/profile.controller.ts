import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { createProfileDto, UpdateProfileDto } from "./validations/create-profile.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/Auth.guard";

@Controller('profile')
export class ProfileController{
    constructor(
        private ProfileService: ProfileService
    ){
        
    }
    @Get()
    list(){
        return this.ProfileService.list()
    }

    @Get(':id')
    getProfileById(@Param('id') id:number){
        return this.ProfileService.getProfileById(id)
    }

      @Get(':id/userId')
    getProfileByUserId(@Param('id') userId:number){
        return this.ProfileService.getProfileByUserId(userId)
    }

  

    @Post('user/:userId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    profile(@Body() body: createProfileDto, @Param('userId') userId: number) {
        return this.ProfileService.createProfile(body, userId);
    }

    @Put(':id')
    update(@Body() body: UpdateProfileDto, @Param('id') id:number){
        return this.ProfileService.updateProfile(id,body)
    }

   @Delete(':id')
   delete(@Param('id') id:number){
    return this.ProfileService.deleteProfile(id)
   }


}