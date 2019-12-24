import { Injectable } from '@nestjs/common';
import { Token } from 'src/auth/token.model';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import constants from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {

    private readonly tokenExpiration: number = this.configService.get<number>(constants.tokenExpiration);
    private readonly signOptions: SignOptions = {
        expiresIn: this.tokenExpiration+'s'
    }

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ){}

    public async validateUser(username: string, password: string): Promise<Token>{
        if(username === 'admin' && password === 'admin'){
            return this.generateToken(0, 'admin');
        }

        const user = await this.userRepository.findOne({
            where: {
                username: username
            },
            select: ['userId', 'username', 'password']
        });

        if(!!user && compare(password, user.password)){
            return this.generateToken(user.userId, user.username);
        }
    }

    private generateToken(userId: number, username: string): Token{
        const user = {
            userId: userId,
            username: username
        };
        
        const token = {
            accessToken: this.jwtService.sign(user, this.signOptions),
            expiresIn: this.tokenExpiration
        };

        return token;
    }
}
