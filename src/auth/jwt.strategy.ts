import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JWTKEYS } from './constants/data';
import { AuthService } from './auth.service';
import { User } from 'src/models/user.entity';
import { IJwtPayload } from './interfaces/Idata';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authSrv: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTKEYS.secret,
    });
  }

  private logger = new Logger();

  async validate(payload: IJwtPayload) {
    this.logger.log('VALIDATION JWT ', payload);
    const { id, userName } = payload;
    const user: User | null | false = await this._authSrv.findOneById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
