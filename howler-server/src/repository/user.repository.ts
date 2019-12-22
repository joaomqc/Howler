import { Injectable } from '@nestjs/common';
import User from '../entity/user.entity';
import ModelUser from '../model/user';

@Injectable()
export default class UserRepository {

    private static readonly Users: User[] = [];

    public async login(username: string, password: string): Promise<boolean> {
        return await new Promise((resolve) => {
            const user = UserRepository.Users.find(registeredUser => registeredUser.username === username);
            if(!!user && user.password === password){
                resolve(true);
            }else{
                resolve(false);
            }
        });
    }

    public async register(user: ModelUser): Promise<boolean> {
        return await new Promise((resolve) => {
            if(UserRepository.Users.find(registeredUser => registeredUser.username === user.username || registeredUser.email === user.email)){
                resolve(false);
            }else{
                UserRepository.Users.push(user);
                resolve(true);
            }
        });
    } 
}
