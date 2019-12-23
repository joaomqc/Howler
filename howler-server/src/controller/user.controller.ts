import { Controller, Body, HttpException, HttpStatus, Post } from '@nestjs/common';
import LoginInputModel from 'src/inputModel/login.input';
import RegisterInputModel from 'src/inputModel/register.input';
import User from 'src/model/user.model';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userRepository: UserService) {}

    @Post('login')
    async login(@Body() request: LoginInputModel): Promise<string> {
        if(await this.userRepository.login(request.username, request.password)){
            return 'Login successful';
        }else{
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('register')
    async register(@Body() request: RegisterInputModel): Promise<void> {
        const user: User = {
            username: request.username,
            email: request.email,
            password: request.password
        };

        if(await this.userRepository.register(user)){
            return;
        }else{
            throw new HttpException('Username or email already registered', HttpStatus.BAD_REQUEST);
        }
    }
}
