import { Inject, Injectable, Logger } from '@nestjs/common';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { DataSignUpDto } from './dto/signUp.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRpt: Repository<User>,
    private _bcryptSrv: BcryptService,
  ) {}

  private logger = new Logger();

  async createUser(data: DataSignUpDto) {
    const { password } = data;
    //bcrypt psw
    const pwdToHash: string = await this._bcryptSrv.bcryptToHash(password);
    data = { ...data, password: pwdToHash };
    this.logger.log('Creading User...');
    // Save DB
    const newUser: User = this.userRpt.create(data);
    this.userRpt.save(newUser);
    this.logger.log(newUser);
    return newUser;
  }

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
