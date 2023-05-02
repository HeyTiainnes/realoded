// import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersEntity } from './entites/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt'

    }),
    JwtModule.register({
      secret: "shotokan",
      signOptions: {
        expiresIn: 3600
      }
    })

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule] // Ajouter cette ligne
})
export class UserModule { }
