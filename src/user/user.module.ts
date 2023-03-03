import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
import { databaseProviders } from 'src/providers/database/database.provider';
import { DatabaseModule } from 'src/providers/database/database.module';
import { User } from 'src/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, BcryptService],
})
export class UserModule {}
