import { DataSource } from 'typeorm';
import * as path from 'path';
// import * as appRootPath from 'app-root-path';
import { config } from 'dotenv';
// import { User } from 'src/models/user.entity';
import { Logger } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { Post } from 'src/models/post.entity';

config({ path: 'db.env' });

const logger = new Logger();

export const databaseProviders = [
  // {
  //   provide: 'DATA_SOURCE',
  //   useFactory: async () => {
  //     const dataSource = new DataSource({
  //       type: 'sqlite',
  //       database: process.env.SQLITE_DB,
  //       entities: [
  //         // `${path.join(
  //         //   appRootPath.path,
  //         //   'src',
  //         //   'models',
  //         // )}/**/*.entity.{ts,js}`,
  //         Post,
  //         User,
  //       ],
  //       synchronize: true,
  //     });
  //     const x = await dataSource.initialize();
  //     logger.log('Connceted DB');
  //     return x;
  //   },
  // },
  {
    type: 'sqlite',
    database: process.env.SQLITE_DB,
    entities: [Post, User],
    synchronize: true,
  },
];

export const dataSource = {
  type: 'sqlite',
  database: process.env.SQLITE_DB,
  entities: [Post, User],
  synchronize: true,
};
