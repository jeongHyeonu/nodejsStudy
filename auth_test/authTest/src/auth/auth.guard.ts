import { CanActivate,ExecutionContext,Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable() // 프로바이더
export class LoginGuard implements CanActivate {
    constructor(private authService:AuthService){}

    async canActivate(context: any): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        if(req.cookies['login']) return true;

        if (!req.body.email || !req.body.password) return false;

        const user = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );

        if(!user) return false;

        req.user = user;
        return true;
    }
}

@Injectable() // 프로바이더
export class LocalAuthGuard extends AuthGuard('local'){
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const res = await super.canActivate(context) as boolean;
        // 로컬 스트래티지
        const req = context.switchToHttp().getRequest();
        await super.logIn(req); // 세션 저장
        return res;
    }
}

@Injectable() // 프로바이더
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated(); // 세션에서 정보 읽어서 인증확인
    }

}