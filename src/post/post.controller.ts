import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { DataPostDto, DataUpdateDto } from './dto/dataPost.dto';
import { Post as post } from 'src/models/post.entity';
import { Response } from 'src/common/dto/response';
import { User } from 'src/models/user.entity';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private readonly _postSrv: PostService) {}

  private logger = new Logger();

  @Post('createPost')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  async createPost(@Body() data: DataPostDto) {
    let result: post;
    try {
      result = await this._postSrv.createPost(data);
    } catch (err) {
      this.logger.error('ERROR: ', err);
      throw new InternalServerErrorException('ERROR: DB');
    }
    return new Response(200, 'Posts Created!', result);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  async showPosts() {
    this.logger.log('getting posts...');
    const result: post[] | null = await this._postSrv.getPosts();
    this.logger.log(post);
    if (result.length === 0) throw new NotFoundException('Posts Not Found!');
    if (!result) throw new InternalServerErrorException('ERROR: DataBase');
    return new Response(200, 'Posts', result);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  async update(@Body() data: DataUpdateDto) {
    let response: UpdateResult;
    try {
      response = await this._postSrv.upatePost(data);
    } catch (error) {
      throw new InternalServerErrorException(new Response(500, 'ERROR: DB'));
    }
    this.logger.log(response);
    return new Response(200, 'UPDATED!');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  async getUserPosts(@Param() id: number) {
    console.log(id);
    const result = await this._postSrv.getUserPost(id);
    return result;
  }

  //FILTRAR
}
