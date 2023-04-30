import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/tasks.module';
import { FirstMiddleware } from './middleware/first/first.middleware';
import { logger } from './middleware/Logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListModule } from './check-list/check-list.module';
//import { CheckListModule } from '../dist/';
import { UsersModuleModule } from './user/users-module/users-module.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user/user.controller';
import { UsersModuleModule } from './user/users-module/users-module.module';
import { UserModuleModule } from './user-module/user-module.module';
import { Module } from './user/.module';
import { UsersModuleModule } from './user/users-module/users-module.module';

import * as dotenv from 'dotenv';
@Module({
  imports: [TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: 'postgres',
      password: '!Post@29310!',
      database: 'restart',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    CheckListModule,
    UsersModuleModule,
    UserModuleModule,
    Module,
    UserModule,],
  controllers: [UserController]
  //   Module,],
  // providers: [Service],
  // controllers: [Controller]
  // CliModule],
  // controllers: [AppController, CliController],
  // providers: [AppService, CliService],
  // exports: [AppService]
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirstMiddleware, logger).forRoutes('hello',
      { path: 'todo', method: RequestMethod.GET },
      { path: 'todo*', method: RequestMethod.DELETE },

    )
      .apply(logger).forRoutes('')
      .apply(HelmetMiddleware).forRoutes('')
      ;
  }

}
//