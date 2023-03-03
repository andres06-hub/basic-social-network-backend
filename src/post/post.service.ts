import { Injectable, Logger } from '@nestjs/common';
import { DataPostDto, DataUpdateDto } from './dto/dataPost.dto';
import { Post } from 'src/models/post.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private _postRpt: Repository<Post>,
    @InjectRepository(User) private _userRpt: Repository<User>,
  ) {}

  private logger = new Logger();

  async createPost(data: DataPostDto): Promise<Post> {
    console.log(data);
    const newPost: Post = this._postRpt.create(data);
    const post: Post = await this._postRpt.save(newPost);
    console.log('Created Post!');
    return post;
  }

  async getPosts(): Promise<Post[] | null> {
    let result;
    try {
      result = await this._postRpt.find();
    } catch (err) {
      this.logger.error('Error', err);
      return null;
    }
    return result;
  }

  async findUserOneById(id: number): Promise<User | null | false> {
    try {
      this.logger.log('looking for user...');
      const findUser: User | null = await this._userRpt.findOne({
        where: {
          id: id,
        },
      });
      return findUser;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  //TODO: Validate updatedAt-updated
  async upatePost(data: DataUpdateDto): Promise<UpdateResult> {
    console.log(data);
    return await this._postRpt
      .createQueryBuilder()
      .update(Post)
      .set({
        title: data.title,
        message: data.message,
        updatedAt: data.updatedAt,
      })
      .where('id = :id', { id: data.id })
      .execute();
  }
  //TODO: TRAER SOLO LOS POSTS DE UN USUARIO
  async getUserPost(id: number): Promise<Post[]> {
    const posts = await this._postRpt.find({
      where: {
        userId: id,
      },
    });
    console.log(posts);
    return posts;
  }
}
