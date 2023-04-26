import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { Request, Response } from 'express';
import { DurationInterceptor } from './interceptor/duration/duration.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: ['http://localhost:4200']
  }
  app.enableCors(corsOptions)
  app.use(morgan('dev'));
  app.use(
    (req: Request, res: Response, next) => {
      console.log('Middleware from app.use');
      next();
    }
  )



  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new DurationInterceptor());
  await app.listen(3000);
}
bootstrap();
