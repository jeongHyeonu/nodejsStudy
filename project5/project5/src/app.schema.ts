import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppDocument = UserInfo & Document;

@Schema()
export class UserInfo {
  @Prop()
  level: number;

  @Prop()
  exp: number;

  @Prop()
  job: string;

  @Prop()
  name: string;

  @Prop()
  createdDt: Date;
  
  @Prop()
  updatedDt: Date;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);