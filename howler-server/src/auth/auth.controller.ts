import { Controller, HttpException, HttpStatus, Body, Post, HttpCode } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import LoginInputModel from 'src/contracts/inputModel/login.input';
import { TokenViewModel } from 'src/contracts/viewModel/token.view';
import RegisterInputModel from 'src/contracts/inputModel/register.input';
import { NewUser } from 'src/model/user.model';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @Post('login')
    @HttpCode(200)
    async login(@Body() request: LoginInputModel): Promise<TokenViewModel> {
        const token = await this.authService.validateUser(request.username, request.password);

        if(!!token){
            return token;
        }else{
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('register')
    async register(@Body() request: RegisterInputModel): Promise<void> {
        const user: NewUser = {
            username: request.username,
            email: request.email,
            password: request.password
        };

        if(await this.userService.register(user)){
            return;
        }else{
            throw new HttpException('Username or email already registered', HttpStatus.BAD_REQUEST);
        }
    }
}
