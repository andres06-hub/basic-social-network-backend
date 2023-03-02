import { DataSource } from 'typeorm';
import { User } from 'src/models/user.entity';

export const databaseProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
