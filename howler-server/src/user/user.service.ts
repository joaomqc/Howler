import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { NewUser, User as UserModel } from '../model/user.model';

@Injectable()
export class UserService {

    private static readonly SaltRounds = 12;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    public async findById(userId: string): Promise<UserModel> {
        return await this.userRepository.findOne({
            where: {
                userId: userId
            }
        });
    }

    public async register(user: NewUser): Promise<boolean> {
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
