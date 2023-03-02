import { DataSource } from 'typeorm';
import * as path from 'path';
import * as appRootPath from 'app-root-path';
import { config } from 'dotenv';
// import { User } from 'src/models/user.entity';
import { Logger } from '@nestjs/common';
import { User } from 'src/models/user.entity';

config({ path: 'db.env' });

const logger = new Logger();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: process.env.SQLITE_DB,
        entities: [
          // `${path.join(
          //   appRootPath.path,
          //   'src',
          //   'models',
          // )}/**/*.entity.{ts,js}`,
          User,
        ],
        synchronize: true,
      });
      const x = await dataSource.initialize();
      logger.log('Connceted DB');
      return x;
    },
  },
];
