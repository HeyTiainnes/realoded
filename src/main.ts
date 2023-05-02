import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { Request, Response } from 'express';
import { DurationInterceptor } from './interceptor/duration/duration.interceptor';
import * as dotenv from 'dotenv';



dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Autoriser toutes les origines
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Autoriser toutes les méthodes
    // allowedHeaders: 'Content-Type, Accept, Authorization', // Autoriser certains en-têtes spécifiques
  });
  app.use(morgan('dev'));
  app.use(
    (req: Request, res: Response, next) => {
      console.log('Middleware from app.use');
      next();
    }
  )



  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new DurationInterceptor());
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
