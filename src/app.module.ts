import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './notifications/notifications.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(config),
    ScheduleModule.forRoot(),
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
