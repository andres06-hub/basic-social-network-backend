import { Inject, Injectable } from '@nestjs/common';
import { DataPostDto } from './dto/dataPost.dto';
import { Post } from 'src/models/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private authorRepository: Repository<Post>,
  ) {}

  async createPost(data: DataPostDto) {
    const { title, message } = data;
    return;
  }
}
