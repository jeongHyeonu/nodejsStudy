import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogMongoRepository } from './blog.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema,Blog } from './blog.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hyeonu:qq98933096@cluster0.gzfxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([{name:Blog.name, schema:BlogSchema}]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogMongoRepository],
})

export class AppModule {}
