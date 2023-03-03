import {
  Controller,
  Post,
  Logger,
  Body,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSignUpDto } from './dto/signUp.dto';
import { UserService } from './user.service';
import { User } from 'src/models/user.entity';
import { DataPostDto } from '../post/dto/dataPost.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _userSrv: UserService) {}
  logger = new Logger();

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() data: DataSignUpDto) {
    const found: User | boolean | null = await this._userSrv.findOneByMail(
      data.email,
    );
    if (found) {
      this.logger.warn('The user exists!');
      return { message: 'The user Exists!' };
    }
    if (found === false)
      throw new InternalServerErrorException(
        'ERROR: When searching for the user',
      );
    const result: User | boolean = await this._userSrv.createUser(data);
    if (!result) return;
    this.logger.log('User Created!');
    return {
      message: 'User Created!',
    };
  }
}
