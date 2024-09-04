import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

// NestJS 시작 함수
async function bootStrap(){
    const app = await NestFactory.create(HelloModule);
    await app.listen(3000, ()=> console.log('서버시작'))
}

bootStrap();