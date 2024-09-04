import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()) // 유효성검사
  app.use(cookieParser()); // 쿠키파서 설정
  app.use(
    session({
      secret:'very-important-secret', // 세션 암호화에 사용되는 키
      resave: false, // 세션 항상 저장할지 여부
      // 세션 저장되기 전에 초기화하지 않은 상태로 세션 미리 만들지 지정
      saveUninitialized:false,
      cookie:{maxAge:3600000} // 쿠키 유효시간 = 1시간 (3600000)
    })
  )

  // passport 초기화 및 세션 저장소 초기화
  
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
