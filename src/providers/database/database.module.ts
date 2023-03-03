import { Module, Post } from '@nestjs/common';
import { dataSource, databaseProviders } from './database.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { config } from 'dotenv';

config({ path: 'db.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.SQLITE_DB,
      entities: [Post, User],
      synchronize: true,
    }),
  ],
  // providers: [...databaseProviders],
  // exports: [...databaseProviders],
})
export class DatabaseModule {}
