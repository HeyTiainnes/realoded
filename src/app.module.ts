import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './tasks/tasks.module';
import { FirstMiddleware } from './middleware/first/first.middleware';
import { logger } from './middleware/Logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

@Module({
  imports: [TodosModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
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