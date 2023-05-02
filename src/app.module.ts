import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/tasks.module';
import { FirstMiddleware } from './middleware/first/first.middleware';
import { logger } from './middleware/Logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListModule } from './check-list/check-list.module';

import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { UserController } from './user/user.controller';
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

    UserModule,],
  //controllers: [UserController]

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
