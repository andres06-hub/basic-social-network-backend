import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRpt: Repository<User>,
    private _bcryptSrv: BcryptService,
    private _jwtSrv: JwtService,
  ) {}
  private logger = new Logger();

  // eslint-disable-next-line prettier/prettier
  async login(email: string, password: string): Promise<string | boolean | null> {
    const findUser: User | null | false = await this.findOneByMail(email);
    if (findUser === null) return null; // NOt found
    if (findUser === false) return false; //Error
    this.logger.log('User Exists!');
    //Validate pass
    const pwd: boolean = await this._bcryptSrv.unencrypt(
      findUser.password,
      password,
    );
    if (!pwd) return 'incorrect';
    console.log(pwd);
    //Create JWT
    const payload = {
      id: findUser.id,
      userName: findUser.userName,
    };
    const token = this._jwtSrv.sign(payload);
    //Return JWT
    return token;
  }

  //DB
  async findOneByMail(email: string): Promise<User | null | false> {
    try {
      this.logger.log('looking for user...');
      const findUser: User | null = await this.userRpt.findOne({
        where: {
          email: email,
        },
      });
      return findUser;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
