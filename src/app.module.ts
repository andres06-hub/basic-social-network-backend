import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { key } from './config/key.config';
import { PostModule } from './post/post.module';
import { DatabaseModule } from './providers/database/database.module';

@Module({
  imports: [
    ProvidersModule,
    AuthModule,
    UserModule,
    ConfigModule,
    DatabaseModule,
    PostModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {
  static port: number | string;
  static prefix: string;

  constructor(private readonly _configSrv: ConfigService) {
    AppModule.port = this._configSrv.get(key.PORT);
    AppModule.prefix = this._configSrv.get(key.PREFIX);
  }
}
