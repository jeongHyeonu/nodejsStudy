import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
    ) {}

    createUser(user):Promise<User> {
        return this.userRepository.save(user);
    }

    async getUser(email:string){
        const res = await this.userRepository.findOne({
            where:{email},
        })
        return res;
    }

    async updateUser(email,_user){
        const user:User = await this.getUser(email);
        user.username=_user.username;
        user.password=_user.password;
        this.userRepository.save(user);
    }

    deleteUser(email:any){
        return this.userRepository.delete({email});
    }

    async findByEmailOrSave(email, username, providerId): Promise<User> {
        const foundUser = await this.getUser(email);
        if (foundUser) {
          return foundUser;
        }
    
        const newUser = await this.userRepository.save({
          email,
          username,
          providerId,
        });
        return newUser;
      }
}
