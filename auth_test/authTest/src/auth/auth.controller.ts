import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthenticatedGuard,LocalAuthGuard, LoginGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    async register(@Body() userDto:CreateUserDto){
        return await this.authService.register(userDto);
    }

    @Post('login')
    async login(@Request() req, @Response() res){
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        )
        if(userInfo){
            res.cookie('login',JSON.stringify(userInfo),{
                httpOnly:false,
                maxAge:1000*60*60*24*7, // 7days
            });
        }
        return res.send({message:'login success'});
    }

    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res){
        if(!req.cookies['login'] && req.user){
            req.cookie('login',JSON.stringify(req.user),{
                httpOnly:true,
                maxAge:1000*10 , // 10초
            })
        }
        return res.send({message:'login2 success'});
    }

    // 로그인 할 때만 실행
    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard(){
        return '로그인되었을 때만 이 글이 보입니다.';
    }


    @UseGuards(LocalAuthGuard)
    @Post('login3')
    async login3(@Request() req){
        req.user;
    }

    // 로그인 할 때만 실행
    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req){
        return req.user
    }
}
