// import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersEntity } from './entites/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule] // Ajouter cette ligne
})
export class UserModule { }
