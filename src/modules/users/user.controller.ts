import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/Auth.guard";
import { UserUpdateDto } from "./validations/update-user.dto";

@Controller('user')
export class UserController{
constructor(
    private userService: UserService
){}
@Get()
list(){
    return this.userService.list()
}

@Get(':id')
getUser(@Param('id') id:number){
 return this.userService.getUser(id)
}

@Put(':id')
update(@Param('id') id:number, @Body() body: UserUpdateDto){
  return this.userService.update(id,body)
}

@Post(':userId/:likeMusic')
likeSong(
  @Param('userId') userId: number,
  @Param('songId') songId: number,
) {
  return this.userService.likeSong(userId, songId);
}


@Post('userId:dislikeMusic')
dislikeSong(
 @Param('userId') userId: number,
@Param('songId') songId: number,
){
  return this.userService.dislikeSong(userId,songId)
}

@Delete(':id')
delete(@Param('id') id: string) {
  return this.userService.delete(+id); 
}

}