import { Controller,Get } from "@nestjs/common";

@Controller() // 컨트롤러 데코레이터
export class HelloController {
    @Get()
    hello(){
        return "안녕하세요! nestjs 로 만든 첫 애플리케이션입니다.";
    }
}