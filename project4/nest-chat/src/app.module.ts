import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatGateway,RoomGateway } from './app.gateway';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,ChatGateway,RoomGateway],
})
export class AppModule {}
