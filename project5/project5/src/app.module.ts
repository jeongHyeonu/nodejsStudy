import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInfoMongoRepository } from './app.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoSchema,UserInfo } from './app.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb url',
    ),
    MongooseModule.forFeature([{name:UserInfo.name, schema:UserInfoSchema}]),
  ],
  controllers: [AppController],
  providers: [AppService, UserInfoMongoRepository],
})

export class AppModule {}
