import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { databaseProviders } from 'src/providers/database/database.provider';
import { DatabaseModule } from 'src/providers/database/database.module';
import { Post } from 'src/models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
