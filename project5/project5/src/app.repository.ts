import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { UserDto as UserDto } from './app.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo, AppDocument } from './app.schema';

export interface UserInfoRepository {
  getAllUser(): Promise<UserDto[]>;
  createUser(postDto: UserDto);
  getUser(id: String): Promise<UserDto>;
  deleteUser(id: String);
  updateUser(id: String, userDto: UserDto);
}

// @Injectable()
// export class UserRepository implements UserInfoRepository {
//   FILE_NAME = './src/blog.data.json';

//   async getAllPost(): Promise<PostDto[]> {

//   }

//   async createPost(postDto: PostDto) {

//   }

//   async getPost(id: string): Promise<PostDto> {

//   }

//   async deletePost(id: string) {

//   }

//   async updatePost(id: string, postDto: PostDto) {

//   }
// }

@Injectable()
export class UserInfoMongoRepository implements UserInfoRepository {
  constructor(@InjectModel(UserInfo.name) private appModel: Model<AppDocument>) {}

  async getAllUser(): Promise<UserInfo[]> {
    return await this.appModel.find().exec();
  }

  async createUser(postDto: UserDto) {
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    this.appModel.create(createPost);
  }

  async getUser(id: string): Promise<UserDto> {
    return await this.appModel.findById(id);
  }

  async deleteUser(id: string) {
    await this.appModel.findByIdAndDelete(id);
  }

  async updateUser(id: string, userDto: UserDto) {
    const userName = { id, ...userDto, updatedDt: new Date() };
    await this.appModel.findByIdAndUpdate(id, userName);
  }

  async findUserByName(userName: string) {
    return await this.appModel.findOne({name:userName});
  }
}