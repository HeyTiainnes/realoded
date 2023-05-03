
import { Module } from '@nestjs/common';
import { TodoController } from './tasks.controller';
import { TodoService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/task.entity';
import { UserModule } from '../user/user.module'; // Ajouter cette ligne

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksEntity]),
    UserModule // Ajouter cette ligne
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TaskModule { }
