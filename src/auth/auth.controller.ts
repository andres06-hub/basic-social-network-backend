import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DataLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authSrv: AuthService) {}

  logger = new Logger();

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async login(@Body() data: DataLoginDto) {
    console.log(data);
    const { email, password } = data;
    const result: string | null | boolean = await this._authSrv.login(
      email,
      password,
    );
    if (!result) throw new NotFoundException('Not Found!');
    if (result === 'incorrect') throw new ForbiddenException();
    return { token: result };
  }
}
