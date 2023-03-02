import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as ConfigMdl } from '@nestjs/config';

@Module({
  imports: [ConfigMdl.forRoot({ envFilePath: ['app.env'] })],
  providers: [ConfigService],
  exports: [ConfigModule, ConfigService],
})
export class ConfigModule {}
