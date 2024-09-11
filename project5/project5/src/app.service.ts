import { Injectable } from '@nestjs/common';
import {UserDto} from './app.model'
import { UserInfoMongoRepository, UserInfoRepository } from './app.repository';

@Injectable()
export class AppService {
    constructor(private userInfoRepository : UserInfoMongoRepository) {}

    async getAllUsers() {
        console.log(this.userInfoRepository)
        return await this.userInfoRepository.getAllUser();
    }

    createUser(postDto: UserDto) {
        this.userInfoRepository.createUser(postDto);
    }

    async getUser(id): Promise<UserDto> {
        return await this.userInfoRepository.getUser(id);
    }

    delete(id) {
        this.userInfoRepository.deleteUser(id);
    }

    updateUser(id, userDto: UserDto) {
        this.userInfoRepository.updateUser(id, userDto);
    }

    findUserByName(name:string){
        return this.userInfoRepository.findUserByName(name);
    }
}