import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('game')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getAllPosts() {
    return this.appService.getAllUsers();
  }

  @Post()
  createPost(@Body() userDto) {
    console.log('유저 생성');
    this.appService.createUser(userDto);
    return '유저 생성 완료';
  }

  @Get('/:id')
  async getPost(@Param('id') id: string) {
    console.log('유저 정보 가져오기');
    const post = await this.appService.getUser(id);
    console.log(post);
    return post;
  }

  @Get('/userinfo/:name/')
  async findUser(@Param('name') name:string){
    return this.appService.findUserByName(name);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    console.log('유저 삭제');
    this.appService.delete(id);
    return '유저 삭제 완료';
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() userDto) {
    console.log('유저 정보 업데이트', id, userDto);
    return this.appService.updateUser(id, userDto);
  }


}