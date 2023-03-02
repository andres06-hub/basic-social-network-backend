import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { databaseProviders } from './providers/database.provider';
import { AuthService } from './auth.service';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWTKEYS } from './constants/data';
import { DatabaseModule } from 'src/providers/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: JWTKEYS.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [...databaseProviders, AuthService, BcryptService, JwtStrategy],
  exports: [],
})
export class AuthModule {}
