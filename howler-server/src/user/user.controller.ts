import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getCurrentUser(@Request() request){
        return await this.userService.findById(request.user.userId);
    }
}
