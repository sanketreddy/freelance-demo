import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoinsModule } from './coins/coins.module';

@Module({
  imports: [UsersModule, CoinsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
