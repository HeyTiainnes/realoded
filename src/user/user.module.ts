// import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersEntity } from './entites/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { ConfigModule } from '@nestjs/config';
dotenv.config();

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt'

    }),
    JwtModule.register({
      secret: 'SHOTOKAN',
      signOptions: {
        expiresIn: '180s'
      }
    })

  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [TypeOrmModule] // Ajouter cette ligne
})
export class UserModule { }
