import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable() // 프로바이더로 사용 (다른 곳에 의존성 주입 가능하게 사용)
export class AuthService {

    // UserService 를 주입받음
    constructor(private userService:UserService){}

    async register(userDto:CreateUserDto){
        // 이미 가입된 유저 있는지 체크
        const user = await this.userService.getUser(userDto.email);
        if(user){
            // 가입된 유저 있으면 에러 발생
            throw new HttpException('해당 유저가 이미 있습니다.',HttpStatus.BAD_REQUEST)
        }

        // 패스워드암호화
        const encryptedPwd = bcrypt.hashSync(userDto.password,10);

        // db 저장
        try{
            const user = await this.userService.createUser({
                ...userDto,
                password: encryptedPwd,
            })
            user.password=undefined;
            return user;
        }catch(e){
            throw new HttpException('서버에러',500);
        }
    }

    async validateUser(email:string, password:string){
        const user = await this.userService.getUser(email);

        if(!user){
            return null;
        }

        const {password:hashedPwd, ...userInfo} = user;

        if(bcrypt.compareSync(password,hashedPwd)){
            return userInfo;
        }
        return null;
    }
}

