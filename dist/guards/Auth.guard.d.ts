import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { UserService } from 'src/modules/users/user.service';
export declare class AuthGuard implements CanActivate {
    private jwt;
    private cls;
    private userService;
    constructor(jwt: JwtService, cls: ClsService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
