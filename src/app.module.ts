import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProvidersModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
