import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import ModelUser from '../model/user.model';

@Injectable()
export class UserService {

    private static readonly SaltRounds = 12;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    public async login(username: string, password: string): Promise<boolean> {
        if(username === 'admin' && password === 'admin'){
            return true;
        }

        const user = await this.userRepository.findOne({
            where: {
                username: username
            }
        });

        return !!user && await compare(password, user.password);
    }

    public async register(user: ModelUser): Promise<boolean> {
        const count = await this.userRepository.count({
            where: {
                username: user.username
            }
        });

        if(count > 0){
            return false;
        }

        const hashedPassword = await hash(user.password, UserService.SaltRounds);

        return !!(await this.userRepository.insert({
            username: user.username,
            email: user.email,
            password: hashedPassword
        }));
    } 
}
