import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { DataPostDto } from './dto/dataPost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly _postSrv: PostService) {}

  @Post('createPost')
  @HttpCode(HttpStatus.OK)
  async createPost(@Body() data: DataPostDto) {
    // await this._postSrv.createPost(data);
    return 'Created';
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPosts() {
    // Show Posts
    return 'Posts';
  }
}
